# Detectr.js (beta) v1.6

Empower web sites and apps design through clever CSS selectors.

This plugin is a very small javascript library which gives you the ability to
write clever and specific CSS rules to refine your website design for each
different browser, platform, device and operating system.

It doesn't has any library dependencies such as: jQuery, Mootools, (...). So,
you can use it alone, or combined with those packages.

## Get started

### 1. Get the source code

Start cloning this repository to your local machine, or just download the
source-code into any folder of your PC. As an open-source, the source-code is
available in its natural format and minified.

### 2. Copy necessary files

Copy the ```detectr.min.js``` (minified) file to any directory of your website
or app. For example:

```
/ (root)
|-- img/
|-- css/
|-- js/
|    |-- detectr.min.js
|-- index.html
```

### 3. Import the library

Import the library in your HTML files.  

Since it is intended to help you create better designs by empower your control
on CSS rules according to used browsers, I strongly recommend you to import
Detectr.js within the HEAD tags.

E.g:

```
<html >
  <head >
    ...
    <script type="text/javascript" src="js/detectr.min.js" ></script>
  </head>
  <body >
    ...
  </body>
</html>

```

### 4. Done.

As simple as that. As soon as you complete the 3 steps above and refresh your
site in any browser, you will be able to see that many specific classes names
were added in the HTML tag of your page.

E.g:

```
<html class="webkit chrome chrome40 x32 mac osx osx10_10 js svg" >
  ...
</html>
```

## Available CSS classes

Detectr.js may add the following classes in the HTML tag:

### Browsers

| Class | Remark |
|-------|--------|
|.edge  | Microsoft Edge |
|.ie    | Internet Explorer |
|.ie{version} | E.g. ie10.  |
|.webkit | Browsers based on the webkit |
|.iron   | Iron Web Browser|
|.chrome | Google Chrome |
|.chrome{version} | E.g. chrome23 |
|.firefox | Firefox Browser |
|.firefox{version} | E.g. firefox32 |
|.opera | Opera Browser |
|.opera{version} | E.g. opera16 |
|.konqueror | Konqueror Browser |
|.safari | Safari Browser |
|.safari{version} | E.g. safari12 |
|.gecko | Browsers based on gecko |
|.android-browser | Android native browsers |

### Operating Systems

| Class | Remark |
|-------|--------|
|.mac   | Apple Macintosh |
|.osx{version} | E.g. osx10_10 |
|.ios{version} | E.g. ios8 |
|.windows | Microsoft Windows |
|.win2k | Microsoft Windows 2000 |
|.win2k.sp1 | Microsoft Windows 2000 SP1 |
|.xp | Microsoft Windows XP |
|.vista | Microsoft Windows Vista  |
|.win7 | Microsoft Windows 7  |
|.win8 | Microsoft Windows 8 |
|.win8_1 | Microsoft Windows 8.1 |
|.win10 | Microsoft Windows 10 |
|.nt | Microsoft Windows NT |
|.nt{version} | E.g. nt6.1|
|.webtv | Web TV |
|.freebsd | Freebsd |
|.linux | Linux |
|.android | Android |
|.bb{version} | E.g. bb10 (for Blackberry 10) |

### Platform

| Class | Remark |
|-------|--------|
|.x32   | Platform 32 bits |
|.x64   | Platform 64 bits |
|.arm   | Platform ARM |

### Devices

| Class | Remark |
|-------|--------|
|.j2me   | |
|.iphone | Apple iPhone |
|.ipad   | Apple iPad |
|.ipod   | Apple iPod |
|.mobile | Any mobile device |
|.blackberry | Blackberry |

### Other

| Class | Remark |
|-------|--------|
|.touch | Touch screen devices |
|.js    | Javascript supported |
|.svg     | SVG Images supported |
|.no-svg     | SVG Images NOT supported |
|.retina     | Devices with pixelratio > 1 |
|.no-retina     | Devices with pixelration = 1|
|.portrait     | Portrait orientation |
|.landscape     | Landscape orientation |

## Inspiration

This project is based on Rafael Lima's library "css_browser_selector"
(http://rafael.adm.br/css_browser_selector/) which seems to be discontinued
since Nov 2nd, 2010.

## License

This projec is licensed under MIT License.

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
