/**
* Detectr.js
* @author Rogerio Taques (rogerio.taques@gmail.com)
* @see http://github.com/rogeriotaques/detectrjs
* @version 1.6
*
* This project is based on the Rafael Lima's work
* which is called css_browser_selector and seems
* to be discontinued. (http://rafael.adm.br/css_browser_selector/).
*/

/*
 * Release notes
 * v1.6 - Add a listener to reanalyse page on resize event
 * v1.4 ~ v1.5 - Bug fixes for detecting Android Stock Browser and some improvements
 * v1.3 - Start detecting Android Stock Browser
 * v1.2 - Start detecting when device runs iOS
 * v1.1 - Added support for Microsoft Edge
 * v1.0 - First release. Totally rewritten and new detectings added.
 */

/*
The MIT License (MIT)

Copyright (c) 2015 Rogério Taques

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

(function ($) {

  "use strict";

  var version = '1.6';

  /**
   * Whenever .trim() isn't supported, makes it be.
   */
  if(typeof String.prototype.trim !== 'function') {

    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };

  }

  var
    doc = $.document,
    element = doc.documentElement,
    detectr,
    originalClassNames,
    resizing;

  detectr = function (userAgent) {

    var
      ua = userAgent.toLowerCase(),
      winWidth = $.outerWidth || element.clientWidth,
      winHeight = $.outerHeight || element.clientHeight,
      gecko = 'gecko',
      webkit = 'webkit',
      safari = 'safari',
      opera = 'opera',
      mobile = 'mobile',
      is, detect;

      /**
       * Checks if given string is present on the userAgent.
       * @param  string  str
       * @return {Boolean}
       */
      is = function (str) {
        return ua.indexOf(str) > -1;
      };

      /**
       * The core feature ...
       */
      detect = function () {
        var
          rendered = [],
          version = '',
          implementation = doc.implementation,
          webkitVersion = (/applewebkit\/(\d{1,})/.test(ua) ? RegExp.$1 : false);

        // *** Detecting browsers ***
        switch ( true ) {

          // internet explorer
          case (is('msie') && !is('opera') && !is('webtv') || is('trident') || is('edge')):

            if (is('edge')) {
              version = (/edge\/(\w+)/.test(ua) ? ' edge ie' + RegExp.$1 : ' ie11');
            } else if (is('msie 8.0') || is('trident/7.0')) {
              version = ' ie11';
            } else {
              version = (/msie\s(\d+)/.test(ua) ? ' ie' + RegExp.$1 : '');
            }

            rendered.push('ie' + version);
            break;

          // iron
          case (is('iron/') || is('iron')):
            version = (/iron\/(\d+)/.test(ua) ? ' iron' + RegExp.$1 : '');
            rendered.push(webkit + ' iron' + version);
            break;

          // android
          case (is('android') && is('u;') && (!is('chrome') || is('chrome') && webkitVersion && webkitVersion <= 534)):

            // according to some researches (http://stackoverflow.com/questions/14403766/how-to-detect-the-stock-android-browser)
            // android stock (native) browsers never went above applewebkit/534.x, then, we can suppose user is using a
            // native browser in android when the UA contains "android", "mobile" and "U;" strings

            rendered.push('android-browser');
            break;

          // google chrome
          case (is('chrome/') || is('chrome')):
            version = (/chrome\/(\d+)/.test(ua) ? ' chrome' + RegExp.$1 : '');
            rendered.push(webkit + ' chrome' + version);
            break;

          // firefox
          case (is('firefox/') || is('firefox')):
            version = (/firefox\/(\d+)/.test(ua) ? ' firefox' + RegExp.$1 : '');
            rendered.push(gecko + ' firefox' + version);
            break;

          // opera
          case (is('opera/') || is('opera')):
            version = (/version(\s|\/)(\d+)/.test(ua) || /opera(\s|\/)(\d+)/.test(ua) ? ' ' + opera + RegExp.$2 : '');
            rendered.push(opera + version);
            break;

          // konqueror
          case (is('konqueror')):
            rendered.push(mobile + ' konqueror');
            break;

          // blackberry
          case (is('blackberry') || is('bb')):
            rendered.push(mobile + ' blackberry');

            if (is('bb')) {
              version = (/bb(\d{1,2})(\;{0,1})/.test(ua) ? 'bb' + RegExp.$1 : '');
              rendered.push(version);
            }

            break;

          // safari
          case (is('safari/') || is('safari')):
            version = (/version\/(\d+)/.test(ua) || /safari\/(\d+)/.test(ua) ? ' ' + safari + RegExp.$1 : '');
            rendered.push(webkit + ' ' + safari + version);
            break;

          // applewebkit
          case (is('applewebkit/') || is('applewebkit')):
            version = (/applewebkit\/(\d+)/.test(ua) ? ' ' + webkit + RegExp.$1 : '');
            rendered.push(webkit + ' ' + version);
            break;

          // gecko || mozilla
          case (is('gecko') || is('mozilla/')):
            rendered.push(gecko);
            break;
        }

        // *** Detecting O.S ***
        switch ( true ) {

          // ios
          case (is('iphone') || is('ios')):
            version = (/iphone\sos\s(\d{1,2})/.test(ua) ? ' ios' + RegExp.$1 : '');

            // For some reason when it's iOS8, userAgent comes like OS 10_10
            // what returns a wrong version, then we need to match it against
            // another value
            if (version === ' ios10') {
              var vv = (/(\d{1,2})/.test(version) ? RegExp.$1 : 0);
              var vd = (/\sversion\/(\d{1,2})/.test(ua) ? RegExp.$1 : '');

              if (parseInt(vv) > parseInt(vd)) {
                version = ' ios' + vd;
              }
            }

            rendered.push('ios' + version);
            break;

          // macintosh
          case (is('mac') || is('macintosh') || is('darwin')):
            version = (/mac\sos\sx\s(\d{1,2}\_\d{1,2})/.test(ua) ? ' osx' + RegExp.$1 : '');
            rendered.push('mac' + version);
            break;

          // windows
          case (is('windows') || is('win')):
            version = (/windows\s(nt\s{0,1})(\d{1,2}\.\d)/.test(ua) ? '' + RegExp.$2 : '');

            // defining windows version
            switch ( version ) {
              case '5.0':
                version = ' win2k';
                break;
              case '5.01':
                version = ' win2k sp1';
                break;
              case '5.1':
              case '5.2':
                version = ' xp';
                break;
              case '6.0':
                version = ' vista';
                break;
              case '6.1':
                version = ' win7';
                break;
              case '6.2':
                version = ' win8';
                break;
              case '6.3':
                version = ' win8_1';
                break;
              case '6.4':
                version = ' win10';
                break;
              default:
                version = ' nt nt' + version;
            }

            rendered.push('windows' + version);
            break;

          // webtv
          case (is('webtv')):
            rendered.push('webtv');
            break;

          // freebsd
          case (is('freebsd')):
            rendered.push('freebsd');
            break;

          // android
          case (is('android') || (is('linux') && is('mobile'))):
            rendered.push('android');
            break;

          // linux
          case (is('linux') || is('x11')):
            rendered.push('linux');
            break;
        }

        // *** Detecting platform ***
        switch ( true ) {
          // 64 bits
          case (is('wow64') || is('x64')):
            rendered.push('x64');
            break;

          // arm
          case (is('arm')):
            rendered.push('arm');
            break;

          // 32 bits
          default:
            rendered.push('x32');
        }

        // *** Detecting devices ***
        switch (true) {

          case (is('j2me')):
            rendered.push(mobile + ' j2me');
            break;

          case ( /(iphone|ipad|ipod)/.test(ua) ):
            rendered.push(mobile + ' ' + RegExp.$1);
            break;

          case (is('mobile')):
            rendered.push(mobile);
            break;
        }

        // *** Detecting touchable devices ***
        if (/touch/.test(ua)) {
          rendered.push('touch');
        }

        // *** Assume that it supports javascript by default ***
        rendered.push('js');

        // *** Detect if SVG images are supported ***
        rendered.push(
          implementation !== undefined &&
          typeof implementation.hasFeature === 'function' &&
          implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") ?
            'svg' :
            'no-svg'
        );

        // *** Detect retina display ***
        rendered.push($.devicePixelRatio !== undefined && $.devicePixelRatio > 1 ? 'retina' : 'no-retina');

        // *** Detecting orientation ***
        rendered.push(winWidth < winHeight ? 'portrait' : 'landscape');


        return rendered;
      };

    // convert 'detect' from function to array
    // and avoid unnecessary processing
    detect = detect();

    // inject the information in the HTML tag
    element.className  = element.className.split(' ').concat(detect).join(' ').trim();

    // return what was detected
    return {
      'detected': detect.join(' ').trim(),
      'version': version
    };
  };

  // make detectr return available on global scope of console.
  originalClassNames = element.className;
  window.detectr = detectr($.navigator.userAgent);

  /**
   * The listener engine for resize event ...
   */
  resizing = function (event) {
    element.className = originalClassNames;
    window.detectr = detectr($.navigator.userAgent);
  };

  // add an event listener for window resize
  // which will asure that references will be
  // updated in case of browser resizing
  if (window.attachEvent) {
    window.attachEvent('onresize', resizing);
  } else if (window.addEventListener) {
    window.addEventListener('resize', resizing, true);
  }

}(window));
