import { paramToStr } from '../../utils/url-data.js';
import fetch from 'isomorphic-fetch';

export const HEADER_REQUEST_POSTS = 'HEADER_REQUEST_POSTS';//发送请求
export const HEADER_REJECT_POSTS = 'HEADER_REJECT_POSTS';//失败
export const HEADER_RESOLVE_POSTS = 'HEADER_RESOLVE_POSTS';//成功

//开始获取数据
export const requestPosts = (path, param) => {
    return {
        type: HEADER_REQUEST_POSTS,
        path,
        param
    }
}

//获取数据成功
export const resolvePosts = (path, json) => {
    return {
        type: HEADER_RESOLVE_POSTS,
        path,
        json
    }
}

//获取数据失败
export const rejectPosts = (path, error) => {
    return {
        type: HEADER_REJECT_POSTS,
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















