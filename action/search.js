const fetchData = require('../utils/fetchdata.js')

async function search(ctx) {
    const index = ctx.request.query.PageIndex
    const size = ctx.request.query.PageSize
    const key = ctx.request.query.key
    const url = `http://qqweb.top/API/BlogApi/Query?PageIndex=${index}&key=${key}&PageSize=${size}`
    const data = await fetchData(url)
    ctx.body = data
}

module.exports = search




