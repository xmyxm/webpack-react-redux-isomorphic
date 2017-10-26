const Koa = require('koa');
const Router = require('koa-router');
const open = require("open");
const render = require('./dist/index.js')

const app = new Koa();
const router = new Router();
const port = 3000;
const host = '127.0.0.1';


router.get(/^\/.*/,
    render.default
);
app.use(router.routes());
app.listen(port);

console.log('开始监听：');
const url = 'http://' + host + ':' + port + '/home';
console.log('打开默认页面: ' + url);
open(url);

