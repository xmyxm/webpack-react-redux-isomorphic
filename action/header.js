const fetch = require('isomorphic-fetch')
const print = require('../utils/print.js')

async function header(ctx) {

    const url = 'http://qqweb.top/API/BlogApi/AdminUser'//
    const data = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        "Content-Type": 'text/plain',//"application/json",
    })
        .then(response => {
            if (response.ok) {
                return Promise.resolve(response.json().then(
                    json => {
                        return Promise.resolve(json)
                    }
                ))
            } else {
                print.warn("redux action fetch 拉取数据失败", response.status)
            }
        })
        .catch(error => {
            print.warn("捕获代码异常：", error)
            Promise.reject(error)
        })
    ctx.body = data
}

module.exports = header














