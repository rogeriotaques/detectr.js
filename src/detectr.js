/*!
 * Detectr.js
 * @author Rogerio Taques (rogerio.taques@gmail.com)
 * @see http://github.com/rogeriotaques/detectrjs
 *
 * This project is based on the Rafael Lima's work
 * which is called css_browser_selector and seems
 * to be discontinued. (http://rafael.adm.br/css_browser_selector/).
 */

const DetectrJs = (function detecterjs($) {
  const version = '1.8.1'

  /**
   * Whenever .trim() isn't supported, makes it be.
   */
  if (typeof String.prototype.trim !== 'function') {
    // eslint-disable-next-line no-extend-native
    String.prototype.trim = function trim() {
      return this.replace(/^\s+|\s+$/g, '')
    }
  }

  const doc = $.document
  const element = doc.documentElement

  const detectr = function detectr(userAgent) {
    const ua = userAgent.toLowerCase()
    const winWidth = $.outerWidth || element.clientWidth
    const winHeight = $.outerHeight || element.clientHeight
    const gecko = 'gecko'
    const webkit = 'webkit'
    const safari = 'safari'
    const opera = 'opera'
    const mobile = 'mobile'

    /**
     * Checks if given string is present on the userAgent.
     * @param  string  str
     * @return {Boolean}
     */
    const is = function is(str) {
      return ua.indexOf(str) > -1
    }

    /**
     * The core feature ...
     */
    let detect = function detect() {
      const rendered = []
      const { implementation } = doc
      const webkitVersion = /applewebkit\/(\d{1,})/.test(ua) ? RegExp.$1 : false

      let sysVersion = ''

      // *** Detecting browsers ***
      switch (true) {
        // internet explorer
        case (is('msie') && !is('opera') && !is('webtv')) || is('trident') || is('edge'):
          if (is('edge')) {
            sysVersion = /edge\/(\w+)/.test(ua) ? ' edge ie' + RegExp.$1 : ' ie11'
          } else if (is('msie 8.0') || is('trident/7.0')) {
            sysVersion = ' ie11'
          } else {
            sysVersion = /msie\s(\d+)/.test(ua) ? ' ie' + RegExp.$1 : ''
          }

          rendered.push('ie' + sysVersion)
          break

        // iron
        case is('iron/') || is('iron'):
          sysVersion = /iron\/(\d+)/.test(ua) ? ' iron' + RegExp.$1 : ''
          rendered.push(webkit + ' iron' + sysVersion)
          break

        // android
        case is('android') && is('u;') && (!is('chrome') || (is('chrome') && webkitVersion && webkitVersion <= 534)):
          // according to some researches android stock (native) browsers never went above applewebkit/534.x,
          // then, we can suppose user is using a native browser in android when the UA contains "android",
          // "mobile" and "U;" strings
          // @see: (http://stackoverflow.com/questions/14403766/how-to-detect-the-stock-android-browser)

          rendered.push('android-browser')
          break

        // google chrome
        case is('chrome/') || is('chrome'):
          sysVersion = /chrome\/(\d+)/.test(ua) ? ' chrome' + RegExp.$1 : ''
          rendered.push(webkit + ' chrome' + sysVersion)
          break

        // firefox
        case is('firefox/') || is('firefox'):
          sysVersion = /firefox\/(\d+)/.test(ua) ? ' firefox' + RegExp.$1 : ''
          rendered.push(gecko + ' firefox' + sysVersion)
          break

        // opera
        case is('opera/') || is('opera'):
          sysVersion = /version(\s|\/)(\d+)/.test(ua) || /opera(\s|\/)(\d+)/.test(ua) ? ' ' + opera + RegExp.$2 : ''
          rendered.push(opera + sysVersion)
          break

        // konqueror
        case is('konqueror'):
          rendered.push(mobile + ' konqueror')
          break

        // blackberry
        case is('blackberry') || is('bb'):
          rendered.push(mobile + ' blackberry')

          if (is('bb')) {
            sysVersion = /bb(\d{1,2})(;{0,1})/.test(ua) ? 'bb' + RegExp.$1 : ''
            rendered.push(sysVersion)
          }

          break

        // safari
        case is('safari/') || is('safari'):
          sysVersion = /version\/(\d+)/.test(ua) || /safari\/(\d+)/.test(ua) ? ' ' + safari + RegExp.$1 : ''
          rendered.push(webkit + ' ' + safari + sysVersion)
          break

        // applewebkit
        case is('applewebkit/') || is('applewebkit'):
          sysVersion = /applewebkit\/(\d+)/.test(ua) ? ' ' + webkit + RegExp.$1 : ''
          rendered.push(webkit + ' ' + sysVersion)
          break

        // gecko || mozilla
        case is('gecko') || is('mozilla/'):
          rendered.push(gecko)
          break

        default:
          break
      }

      // *** Detecting O.S ***
      switch (true) {
        // ios
        case is('iphone') || is('ios'):
          sysVersion = /iphone\sos\s(\d{1,2})/.test(ua) ? ' ios' + RegExp.$1 : ''

          // For some reason when it's iOS8, userAgent comes like OS 10_10
          // what returns a wrong version, then we need to match it against
          // another value
          if (sysVersion === ' ios10') {
            const vv = /(\d{1,2})/.test(sysVersion) ? RegExp.$1 : 0
            const vd = /\sversion\/(\d{1,2})/.test(ua) ? RegExp.$1 : ''

            if (parseInt(vv, 10) > parseInt(vd, 10)) {
              sysVersion = ' ios' + vd
            }
          }

          rendered.push('ios' + sysVersion)
          break

        // macintosh
        case is('mac') || is('macintosh') || is('darwin'):
          sysVersion = /mac\sos\sx\s(\d{1,2}_\d{1,2})/.test(ua) ? ' osx' + RegExp.$1 : ''
          rendered.push('mac' + sysVersion)
          break

        // windows
        case is('windows') || is('win'):
          sysVersion = /windows\s(nt\s{0,1})(\d{1,2}\.\d)/.test(ua) ? '' + RegExp.$2 : ''

          // defining windows version
          switch (sysVersion) {
            case '5.0':
              sysVersion = ' win2k'
              break
            case '5.01':
              sysVersion = ' win2k sp1'
              break
            case '5.1':
            case '5.2':
              sysVersion = ' xp'
              break
            case '6.0':
              sysVersion = ' vista'
              break
            case '6.1':
              sysVersion = ' win7'
              break
            case '6.2':
              sysVersion = ' win8'
              break
            case '6.3':
              sysVersion = ' win8_1'
              break
            case '6.4':
              sysVersion = ' win10'
              break
            default:
              sysVersion = ' nt nt' + sysVersion
          }

          rendered.push('windows' + sysVersion)
          break

        // webtv
        case is('webtv'):
          rendered.push('webtv')
          break

        // freebsd
        case is('freebsd'):
          rendered.push('freebsd')
          break

        // android
        case is('android') || (is('linux') && is('mobile')):
          rendered.push('android')
          break

        // linux
        case is('linux') || is('x11'):
          rendered.push('linux')
          break

        default:
          break
      }

      // *** Detecting platform ***
      switch (true) {
        // 64 bits
        case is('wow64') || is('x64'):
          rendered.push('x64')
          break

        // arm
        case is('arm'):
          rendered.push('arm')
          break

        // 32 bits
        default:
          rendered.push('x32')
      }

      // *** Detecting devices ***
      switch (true) {
        case is('j2me'):
          rendered.push(mobile + ' j2me')
          break

        case /(iphone|ipad|ipod)/.test(ua):
          rendered.push(mobile + ' ' + RegExp.$1)
          break

        case is('mobile'):
          rendered.push(mobile)
          break

        default:
          break
      }

      // *** Detecting touchable devices ***
      if (/touch/.test(ua)) {
        rendered.push('touch')
      }

      // *** Assume that it supports javascript by default ***
      rendered.push('js')

      // *** Detect if SVG images are supported ***
      rendered.push(
        implementation !== undefined &&
          typeof implementation.hasFeature === 'function' &&
          implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1')
          ? 'svg'
          : 'no-svg'
      )

      // *** Detect retina display ***
      rendered.push($.devicePixelRatio !== undefined && $.devicePixelRatio > 1 ? 'retina' : 'no-retina')

      // *** Detecting orientation ***
      rendered.push(winWidth < winHeight ? 'portrait' : 'landscape')

      return rendered
    }

    // retrieve current classes attached
    let currentClassNames = doc.documentElement.className.split(' ')

    // convert 'detect' from function to array
    // and avoid unnecessary processing
    detect = detect()

    // concat all detected classes to the existing ones and make sure they are unique
    // this prevent wiping pre-existing classes attached by different processes.
    currentClassNames = currentClassNames.concat(detect)
    currentClassNames = currentClassNames.filter((v, i) => currentClassNames.indexOf(v) === i)

    // inject the new classes set in the HTML tag.
    element.className = currentClassNames
      .join(' ')
      .trim()

    // return what was detected
    return {
      detected: detect.join(' ').trim(),
      version
    }
  }

  // execute and exposes detectr.js to the browser
  // eslint-disable-next-line
  $.detectr = detectr($.navigator.userAgent)

  /**
   * The listener engine for resize event ...
   */
  const resizing = function resizing() {
    $.detectr = detectr($.navigator.userAgent) // eslint-disable-line
  }

  // add an event listener for window resize
  // which will asure that references will be
  // updated in case of browser resizing
  if ($.attachEvent) {
    $.attachEvent('onresize', resizing)
  } else if ($.addEventListener) {
    $.addEventListener('resize', resizing, true)
  }
})

DetectrJs(window)

export default DetectrJs
