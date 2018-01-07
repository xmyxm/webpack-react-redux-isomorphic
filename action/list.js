const fetchData = require('../utils/fetchdata.js')

async function header(ctx) {
    const url = 'http://qqweb.top/API/BlogApi/WorkList'
    const data = await fetchData(url)
    ctx.body = data
}


module.exports = header
