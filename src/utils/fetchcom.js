import FormData from 'form-data'
import { paramToStr } from 'utilspath/url-data.js'

let fetch
if(BUILD_ENV == "web"){
    fetch = require('whatwg-fetch')
}else if(BUILD_ENV == "node"){
    fetch = require('node-fetch')
}

// 页面初次渲染时获取数据
const fetchCom = (url, type, param, headers) => {
    let options = {}
    if(type == 'post' && param){
        options.method = 'POST'
        let form = new FormData()
        for(let key in param){
            if(param.hasOwnProperty(key)) { //filter,只输出man的私有属性
                form.append(key , param[key])
            }
        }
         options.body = form
    }else{
        url = param ? url + '?' + paramToStr(param) : url
        options.method = 'GET'
    }
    if(typeof global == 'object' && global.global === global){
        options.headers = headers
        return nodeRequest(url, options)
    }else{
        return browserRequest(url, options)
    }
}

const nodeRequest = (url, options) => {
    return fetch(url, options)
        .then(function(res) {
            return res.json()
    }).catch(err => { console.log('node-fetch post error, 代码异常:' + err)})
}

const browserRequest = (url, options) => {
    return fetch(url, options)
    .then(response => {
        if (response.ok) {
            return Promise.resolve(response.json().then(
                json => {
                    return Promise.resolve(json)
                }
            ))
        } else {
            console.log("whatwg-fetch get error 拉取数据失败: " + response.status);
        }
    })
    .catch(err => { console.log('whatwg-fetch get error, 代码异常:' + err)})
}


export default fetchCom





