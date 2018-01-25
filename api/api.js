const header = require('../action/header.js')
const list = require('../action/list.js')
const detail = require('../action/detail.js')
const search = require('../action/search.js')

async function api(ctx) {
	switch(ctx.query.actionname){
		case 'header' : await header(ctx); break;
		case 'list' : await list(ctx); break;
		case 'detail' : await detail(ctx); break;
		case 'search' : await search(ctx); break;
	}
}


module.exports = api




