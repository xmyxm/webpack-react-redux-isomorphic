import {HEADER_REQUEST_POSTS, HEADER_RESOLVE_POSTS, HEADER_REJECT_POSTS} from './header_action.js'

const defaultlState = {
    istrue:false, 
    isFetching: false
};

//首次渲染时获取数据
const HeaderData = (state = defaultlState , action = {}) => {
    switch(action.type){
        case HEADER_REQUEST_POSTS:
             state.isFetching = true;
             state.param = action.param;
             return {...state};

        case HEADER_RESOLVE_POSTS:
            state.isFetching = false;
            let data = action.json;
            if(data && data.ID){
                state.Json = action.json;
                state.istrue = true;
            }
            return {...state};

        case HEADER_REJECT_POSTS:
            return Object.assign({}, state, {istrue:false,isFetching:false});//请求失败，返回一个新的state
        default:
            return state;
    }
}

export default HeaderData;

