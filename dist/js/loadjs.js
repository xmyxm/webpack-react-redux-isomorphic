    /******/     // This file contains only the entry chunk.
/******/     // The chunk loading function for additional chunks
            // runtime代码里面只包含了入口的chunk
            // 这个函数的主要作用:
            // 1. 异步加载chunk
            // 2. 提供对于chunk加载失败或者处于加载中的处理
            // 其中chunk加载状态的判断是根据installedChunks对象chunkId是数字0还是数组来进行判断的
/******/     __webpack_require__.e = function requireEnsure(chunkId) {
                // 数字0代表chunk加载成功
/******/         if(installedChunks[chunkId] === 0)  
/******/             return Promise.resolve();

/******/         // an Promise means "currently loading".
                // 如果installedChunks[chunkId]为一个数组
/******/         if(installedChunks[chunkId]) {
                    // 返回一个promise对象
/******/             return installedChunks[chunkId][2];
/******/         }
/******/         // start chunk loading
                // 通过生成script标签来异步加载chunk.文件名是根据接受的chunkId来确认的
/******/         var head = document.getElementsByTagName('head')[0];
/******/         var script = document.createElement('script');
/******/         script.type = 'text/javascript';
/******/         script.charset = 'utf-8';
/******/         script.async = true;
                // 超时时间为120s
/******/         script.timeout = 120000;

/******/         if (__webpack_require__.nc) {
/******/             script.setAttribute("nonce", __webpack_require__.nc);
/******/         }
                // 需要加载的文件名
/******/         script.src = __webpack_require__.p + "js/register/" + ({"2":"index"}[chunkId]||chunkId) + ".js";
                // 120s的定时器，超时后触发onScriptComplete回调
/******/         var timeout = setTimeout(onScriptComplete, 120000);
                // chunk加载完毕后的回调
/******/         script.onerror = script.onload = onScriptComplete;
/******/         function onScriptComplete() {
/******/             // avoid mem leaks in IE.
/******/             script.onerror = script.onload = null;
                    // 清空定时器
/******/             clearTimeout(timeout);
                    // 获取这个chunk的加载状态
                    // 若为数字0，表示加载成功
                    // 若为一个数组, 调用数组的第2个元素（第二个元素为promise内传入的reject函数），使得promise捕获抛出的错误。reject(new Error('xxx'))
/******/             var chunk = installedChunks[chunkId];
/******/             if(chunk !== 0) {
/******/                 if(chunk) chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/                 installedChunks[chunkId] = undefined;
/******/             }
/******/         };
                
                // 每次需要进行异步加载chunk时，会将这个chunk的加载状态进行初始化为一个数组,并以key/value的形式保存在installedChunks里
                // 这个数组为[resolve, reject, promise];
/******/         var promise = new Promise(function(resolve, reject) {
/******/             installedChunks[chunkId] = [resolve, reject];
/******/         });
/******/         installedChunks[chunkId][2] = promise;

/******/         head.appendChild(script);
                //返回promise
/******/         return promise;
/******/     };