import FormData from 'form-data'
import { paramToStr } from 'utilspath/url-data.js'
import fetch from 'isomorphic-fetch'

// 页面初次渲染时获取数据
const fetchCom = (url, type, param, headers) => {
    let options = {}
    if (type == 'post' && param) {
        options.method = 'POST'
        let form = new FormData()
        for (let key in param) {
            if (param.hasOwnProperty(key)) { //filter,只输出man的私有属性
                form.append(key, param[key])
            }
        }
        options.body = form
    } else {
        url = param ? url + '?' + paramToStr(param) : url
        options.method = 'GET'
    }
    if (typeof global == 'object' && global.global === global) {
        options.headers = headers
        url = 'http://127.0.0.1:3000' + url
    }
    return Request(url, options)
}

const Request = (url, options) => {
    return fetch(url, options)
        .then(function (res) {
            if(res.ok){
                return Promise.resolve(res.json().then(
                    json => { return json }
                ))
            }
        }).catch(err => { console.log('fetchCom 请求 error, 代码异常:' + err ) })
}

export default fetchCom





