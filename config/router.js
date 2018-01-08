
const render = require('../dist/server/index.js')
const header = require('../action/header.js')
const list = require('../action/list.js')
const detail = require('../action/detail.js')
const search = require('../action/search.js')

module.exports = [
	{
		path : '/action/header',
		method : header,
		type : ['get','post']
	}
	,{
		path : '/action/list',
		method : list,
		type : 'post'
	}
	,{
		path : '/action/detail',
		method : detail,
		type : 'post'
	}
	,{
		path : '/action/search',
		method : search,
		type : 'post'
	}
	,{
		path : '^/home',
		method : render.default,
		type : 'get',
		reg: true
	}
	,{
		path : '^/list',
		method : render.default,
		type : 'get',
		reg: true
	}
	,{
		path : '/detail/:id',
		method : render.default,
		type : 'get',
		reg: false
	}
	,{
		path : '^/search',
		method : render.default,
		type : 'get',
		reg: true
	}
	,{
		path : '^/email',
		method : render.default,
		type : 'get',
		reg: true
	}
	,{
		path : '^/me',
		method : render.default,
		type : 'get',
		reg: true
	}
]








