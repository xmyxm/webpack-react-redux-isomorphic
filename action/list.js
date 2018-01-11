const fetchData = require('../utils/fetchdata.js')

async function list(ctx) {
    const index = ctx.query.PageIndex
    const size = ctx.query.PageSize
    const url = `http://qqweb.top/API/BlogApi/WorkList?PageIndex=${index}&PageSize=${size}`
    const data = await fetchData(url)
    ctx.body = data
}

module.exports = list


