
const render = require('../dist/server/index.js')
const header = require('../action/header.js')
const list = require('../action/list.js')

module.exports = [
	{
		url : '/header',
		method : header,
		type : 'post'
	}
	,{
		url : '/list',
		method : list,
		type : 'post'
	}
	,{
		url : '/home',
		method : render.default,
		type : 'get'
	}
	,{
		url : '/list',
		method : render.default,
		type : 'get'
	}
	,{
		url : '/detail',
		method : render.default,
		type : 'get'
	}
	,{
		url : '/search',
		method : render.default,
		type : 'get'
	}
	,{
		url : '/email',
		method : render.default,
		type : 'get'
	}
	,{
		url : '/me',
		method : render.default,
		type : 'get'
	}
]








