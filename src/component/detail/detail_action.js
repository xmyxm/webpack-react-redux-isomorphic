import { paramToStr } from 'utilspath/url-data.js'
import fetchCom from 'utilspath/fetchcom.js'

export const DETAIL_REQUEST_POSTS = 'DETAIL_REQUEST_POSTS';//发送请求
export const DETAIL_REJECT_POSTS = 'DETAIL_REJECT_POSTS';//失败
export const DETAIL_RESOLVE_POSTS = 'DETAIL_RESOLVE_POSTS';//成功

//开始获取数据
export const requestPosts = (path, param) => {
    return {
        type: DETAIL_REQUEST_POSTS,
        path,
        param
    }
}

//获取数据成功
export const resolvePosts = (path, json) => {
    return {
        type: DETAIL_RESOLVE_POSTS,
        path,
        json
    }
}

//获取数据失败
export const rejectPosts = (path, error) => {
    return {
        type: DETAIL_REJECT_POSTS,
        path,
        error
    }
}

export const fetchPosts = (url, param, headers) => {
    return dispatch => {
        url = url + '/' + param.id
        dispatch(requestPosts(url, param))
        return fetchCom(url,'get', null, headers)
        .then(json => {
                if(json.DetailContent){
                    json.DetailContent.Content = encodeURIComponent(json.DetailContent.Content)
                    json.DetailContent.Tag = encodeURIComponent(json.DetailContent.Tag)
                    dispatch(resolvePosts(url, json))
                }else{
                    dispatch(rejectPosts(url, error))
                }
            }
        )
        .catch(error => dispatch(rejectPosts(url, error)))
    }
}















