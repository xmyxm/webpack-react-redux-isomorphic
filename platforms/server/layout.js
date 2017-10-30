'use strict';

//import common from '../../common.json';

exports.layout = function(content, data) {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charSet='utf-8'/>
    <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
    <meta name='renderer' content='webkit'/>
    <meta name='keywords' content='demo'/>
    <meta name='description' content='demo'/>
    <meta name='viewport' content='width=device-width, initial-scale=1'/>
    <link href="http://qqweb.top/m/css/index.css" rel="stylesheet">
    <script type="text/javascript">
        (function(doc, win) {
            var fontSize,docEl = doc.documentElement,
                resizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function() {
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    fontSize = 10 * (clientWidth / 320);
                    if(fontSize && fontSize <= 16){
                        docEl.style.fontSize = fontSize + 'px';
                    }
                };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);
    </script>
  </head>
  <body>
    <div id="root"><div>${content}</div></div>
  <script>
  window.__REDUX_DATA__ = '${JSON.stringify(data)}';
  </script>
    <script type="text/javascript" src="http://localhost:9000/js/manifest.js"></script>
    <script type="text/javascript" src="http://localhost:9000/js/common.js"></script>
    <script type="text/javascript" src="http://localhost:9000/js/index.js"></script>
  </body>
  </html>
`;
};



/*  <script src="${common.publicPath}dist/js/manifest.js"></script>
  <script src="${common.publicPath}dist/js/vendor.js"></script>
  <script src="${common.publicPath}dist/js/index.js"></script>*/















