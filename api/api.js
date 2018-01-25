const header = require('../action/header.js')
const list = require('../action/list.js')
const detail = require('../action/detail.js')
const search = require('../action/search.js')

function api(ctx) {
	switch (ctx.query.actionname) {
		case 'header': return header(ctx); break;
		case 'list': return list(ctx); break;
		case 'detail': return detail(ctx); break;
		case 'search': return search(ctx); break;
	}
}


module.exports = api




