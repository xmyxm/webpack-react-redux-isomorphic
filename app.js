const Koa = require('koa');
const Router = require('koa-router');
const open = require("open");
const render = require('./dist/server/index.js')
const configRouter = require('./config/router.js')

const app = new Koa();
const router = new Router();
const port = 3000;
const host = '127.0.0.1';


app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`请求状态监控 ${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(router.routes())

configRouter.forEach(item => {
	router[item.type](new RegExp(item.url),item.method)
})

app.listen(port)

const url = 'http://' + host + ':' + port + '/home'
console.log('已开启端口: '+ port +' 监听,打开默认页面: ' + url)
open(url);



