const api = require('../action/api/api.js')
const render = require('../dist/server/index.js')

module.exports = [
	{
		path: '^/api',
		method: api,
		type: ['get', 'post'],
		reg: true
	},

	{
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








