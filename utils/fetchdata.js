const fetch = require('isomorphic-fetch')
const print = require('./print.js')

async function fetchData(url) {

    const data = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        "Content-Type": 'text/plain',
    })
    .then(response => {
            if (response.ok) {
                return Promise.resolve(response.json().then(
                    json => {
                        return Promise.resolve(json)
                    }
                ))
            } else {
                print.warn("node fetch 拉取数据失败", response.status)
            }
        })
        .catch(error => {
            print.warn("捕获代码异常：", error)
        })
    return data
}


module.exports = fetchData




