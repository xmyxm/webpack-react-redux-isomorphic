const Koa = require('koa');
const Router = require('koa-router');
const open = require("open");
const render = require('./dist/server/index.js')
const configRouter = require('./config/router.js')
const print = require('./utils/print.js')

const app = new Koa();
const router = new Router();
const port = 3000;
const host = '127.0.0.1';


app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    print.info(`请求状态日志: ${ctx.method} ${ctx.url} 服务端请求响应时间: ${ms}ms`)
})

app.use(router.routes())

configRouter.forEach(item => {
	if(Object.prototype.toString.call(item.type) == '[object Array]'){
		let reg = new RegExp(item.url)
		item.type.forEach(val => {
			router[val](reg,item.method)
		})
	}else{
		router[item.type](new RegExp(item.url),item.method)
	}
})

app.listen(port)

const url = 'http://' + host + ':' + port + '/action/header'
print.info('已开启端口: '+ port +' 监听,打开默认页面: ' + url)
open(url);



