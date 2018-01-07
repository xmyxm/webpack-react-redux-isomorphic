
const render = require('../dist/server/index.js')
const header = require('../action/header.js')
const list = require('../action/list.js')
const detail = require('../action/detail.js')
const search = require('../action/search.js')

module.exports = [
	{
		url : '/action/header',
		method : header,
		type : ['get','post']
	}
	,{
		url : '/action/list',
		method : list,
		type : 'post'
	}
	,{
		url : '/action/detail',
		method : detail,
		type : 'post'
	}
	,{
		url : '/action/search',
		method : search,
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








