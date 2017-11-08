import { paramToStr } from '../../utils/url-data.js';
import fetch from 'isomorphic-fetch';

export const SEARCH_REQUEST_POSTS = 'SEARCH_REQUEST_POSTS';//发送请求
export const SEARCH_REJECT_POSTS = 'SEARCH_REJECT_POSTS';//失败
export const SEARCH_RESOLVE_POSTS = 'SEARCH_RESOLVE_POSTS';//成功

//开始获取数据
export const requestPosts = (path, param) => {
    return {
        type: SEARCH_REQUEST_POSTS,
        path,
        param
    }
}

//获取数据成功
export const resolvePosts = (path, json) => {
    return {
        type: SEARCH_RESOLVE_POSTS,
        path,
        json
    }
}

//获取数据失败
export const rejectPosts = (path, error) => {
    return {
        type: SEARCH_REJECT_POSTS,
        path,
        error
    }
}

// 页面初次渲染时获取数据
export const fetchPosts = (path, postData) => {
    let url = path + '?' + paramToStr(postData);
    return dispatch => {
        dispatch(requestPosts(url, postData));
        const start = new Date();
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            "Content-Type": 'text/plain',//"application/json",
        })
            .then(response => {
                if (response.ok) {
                    return Promise.resolve(response.json().then(
                        json => {
                                const ms = new Date() - start;
                                console.log('服务耗时：' + url + '  总时长：' + ms);
                                if (json.BlogWorkList) {
                                    for (let i = 0, l = json.BlogWorkList.length; i < l; i++) {
                                        json.BlogWorkList[i].Title = encodeURIComponent(json.BlogWorkList[i].Title);
                                    }
                                }
                                return Promise.resolve(dispatch(resolvePosts(path, json)))
                            }
                    ))
                } else {
                    console.log(`redux action fetch 拉取数据失败,code: ${response.status},错误信息: ${response.statusText}`);
                }
            })
            .catch(error => dispatch(rejectPosts(path, error)))
    }
}















