const Koa = require('koa');
const Router = require('koa-router');
const open = require("open");
const render = require('./dist/index.js')

const app = new Koa();
const router = new Router();
const port = 3000;
const host = '127.0.0.1';


app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    //console.log(`请求状态监控 ${ctx.method} ${ctx.url} - ${ms}ms`)
});
app.use(router.routes());

router.get(/^\/.*/,
    render.default
);

app.listen(port);

console.log('开始监听：');
const url = 'http://' + host + ':' + port + '/list';
console.log('打开默认页面: ' + url);
open(url);

