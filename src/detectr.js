/**
* Detectr.js
* @author Rogerio Taques (rogerio.taques@gmail.com)
* @see http://github.com/rogeriotaques/detectrjs
* @version 1.0
*
* This project is based on the Rafael Lima's work
* which is called css_browser_selector and seems
* to be discontinued. (http://rafael.adm.br/css_browser_selector/).
*/

/*
 * Release notes
 * v1.0  - First release. Totally rewritten and new detectings added.
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

  // whenever the .trim() isn't supported, makes it be
  if(typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }

  var detectr = function (u) {

    var d = $.document,
        h = d.documentElement,
        ua = u.toLowerCase(),
        ww = $.outerWidth || h.clientWidth,
        wh = $.outerHeight || h.clientHeight,
        g = 'gecko',
        w = 'webkit',
        s = 'safari',
        o = 'opera',
        m = 'mobile',
        is = function (t) {
          return ua.indexOf(t) > -1;
        },
        b = function () {
          var r = [],
              v = '',
              i = d.implementation;

          // detecting browsers
          switch ( true ) {
            // internet explorer
            case (is('msie') && !is('opera') && !is('webtv')):
              v = (/msie\s(\d+)/.test(ua) ? ' ie' + RegExp.$1 : '');
              r.push('ie' + v);
              break;
            // iron
            case (is('iron/') || is('iron')):
              v = (/iron\/(\d+)/.test(ua) ? ' iron' + RegExp.$1 : '');
              r.push(w + ' iron' + v);
              break;
            // google chrome
            case (is('chrome/') || is('chrome')):
              v = (/chrome\/(\d+)/.test(ua) ? ' chrome' + RegExp.$1 : '');
              r.push(w + ' chrome' + v);
              break;
            // firefox
            case (is('firefox/') || is('firefox')):
              v = (/firefox\/(\d+)/.test(ua) ? ' firefox' + RegExp.$1 : '');
              r.push(g + ' firefox' + v);
              break;
            // opera
            case (is('opera') || is('opera/')):
              v = (/version(\s|\/)(\d+)/.test(ua) || /opera(\s|\/)(\d+)/.test(ua) ? ' ' + o + RegExp.$2 : '');
              r.push(o + v);
              break;
            // konqueror
            case (is('konqueror')):
              r.push('konqueror');
              break;
            // blackberry
            case (is('blackberry')):
              r.push(m + 'blackberry');
              break;
            // android
            case (is('android')):
              r.push(m + 'android');
              break;
            // safari
            case (is('safari/')):
              v = (/version\/(\d+)/.test(ua) || /safari\/(\d+)/.test(ua) ? ' ' + s + RegExp.$1 : '');
              r.push(w + ' ' + s + v);
              break;
            // applewebkit
            case (is('applewebkit/') || is('applewebkit')):
              v = (/applewebkit\/(\d+)/.test(ua) ? ' ' + w + RegExp.$1 : '');
              r.push(w + ' ' + v);
              break;
            // gecko || mozilla
            case (is('gecko') || is('mozilla/')):
              r.push(g);
              break;
          }

          // detecting O.S
          switch ( true ) {
            // macintosh
            case (is('mac') || is('macintosh') || is('darwin')):
              v = (/mac\sos\sx\s(\d{1,2}\_\d{1,2})/.test(ua) ? ' osx' + RegExp.$1 : '');
              r.push('mac' + v);
              break;
            // windows
            case (is('windows') || is('win')):
              v = (/windows\s(nt\s{0,1})(\d{1,2}\.\d)/.test(ua) ? '' + RegExp.$2 : '');

              // defining windows version
              switch ( v ) {
                case '5.0':
                  v = ' win2k';
                  break;
                case '5.01':
                  v = ' win2k sp1';
                  break;
                case '5.1':
                case '5.2':
                  v = ' xp';
                  break;
                case '6.0':
                  v = ' vista';
                  break;
                case '6.1':
                  v = ' win7';
                  break;
                case '6.2':
                  v = ' win8';
                  break;
                case '6.3':
                  v = ' win8_1';
                  break;
                case '6.4':
                  v = ' win10';
                  break;
                default:
                  v = ' nt nt' + v;
              }

              r.push('windows' + v);
              break;
            // webtv
            case (is('webtv')):
              r.push('webtv');
              break;
            // freebsd
            case (is('freebsd')):
              r.push('freebsd');
              break;
            // linux
            case (is('linux') || 'x11'):
              r.push('linux');
              break;
          }

          // detecting platform
          switch ( true ) {
            // 64 bits
            case (is('wow64') || is('x64')):
              r.push('x64');
              break;
            // arm
            case (is('arm')):
              r.push('arm');
              break;
            // arm
            default:
              r.push('x32');
          }

          // detecting devices
          switch (true) {
            case (is('j2me')):
              r.push(m + ' j2me');
              break;
            case ( /(iphone|ipad|ipod)/.test(ua) ):
              r.push(m + ' ' + RegExp.$1);
              break;
            case (is('mobile')):
              r.push(m);
              break;
          }

          // detecting touchable devices
          if (/touch/.test(ua)) {
            r.push('touch');
          }

          // assume that it supports javascript
          r.push('js');

          // detect if svg images are supported
          r.push(i !== undefined && typeof i.hasFeature === 'function' && i.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") ? 'svg' : 'no-svg');

          // detecting retina display
          r.push($.devicePixelRatio !== undefined && $.devicePixelRatio > 1 ? 'retina' : 'no-retina');

          // detecting orientation
          r.push(ww < wh ? 'portrait' : 'landscape');

          return r;
        };

    // convert b from function to array to avoid unnecessary processing
    b = b();

    // inject the information in the HTML tag
    h.className = h.className.split(' ').concat(b).join(' ').trim();

    // return what was detected
    return b.join(' ').trim();
  };

  detectr($.navigator.userAgent);

}(window));
