const Koa = require('koa');
const Router = require('koa-router');
const render = require('./dist/index.js')

const app = new Koa();
const router = new Router();

router.get('/email',
    render.default
);
router.get('/home',
    render.default
);
router.get('/me',
    render.default
);
router.get('/',
    render.default
);
//console.log(typeof controller);
app.use(router.routes());
app.listen(3000);

console.log('开始监听：');


