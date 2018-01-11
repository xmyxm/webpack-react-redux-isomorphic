
const render = require('../dist/server/index.js')
const header = require('../action/header.js')
const list = require('../action/list.js')
const detail = require('../action/detail.js')
const search = require('../action/search.js')

module.exports = [
	{
		path: '^/action/header',
		method: header,
		type: ['get', 'post'],
		reg: true
	}
	, {
		path: '^/action/list',
		method: list,
		type: ['get', 'post'],
		reg: true
	}
	, {
		path: '/action/detail/:id',
		method: detail,
		type: ['get', 'post'],
		reg: false
	}
	, {
		path: '^/action/search',
		method: search,
		type: ['get', 'post'],
		reg: true
	}
	, {
		path: '^/home',
		method: render.default,
		type: 'get',
		reg: true
	}
	, {
		path: '^/list',
		method: render.default,
		type: 'get',
		reg: true
	}
	, {
		path: '/detail/:id',
		method: render.default,
		type: 'get',
		reg: false
	}
	, {
		path: '^/search',
		method: render.default,
		type: 'get',
		reg: true
	}
	, {
		path: '^/email',
		method: render.default,
		type: 'get',
		reg: true
	}
	, {
		path: '^/me',
		method: render.default,
		type: 'get',
		reg: true
	}
]








