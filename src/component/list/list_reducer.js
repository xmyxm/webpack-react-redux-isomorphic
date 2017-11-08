import { LIST_REQUEST_POSTS, LIST_RESOLVE_POSTS, LIST_REJECT_POSTS } from './list_action.js'

const defaultlState = {
    istrue: false,
    isFetching: false,
    imgLoading: true,
    param: {}
};
//首次渲染时获取数据
const ListData = (state = { ...defaultlState }, action = {}) => {
    switch (action.type) {

        case LIST_REQUEST_POSTS:
            state.isFetching = true;
            state.param = action.param;
            return { ...state };

        case LIST_RESOLVE_POSTS:
            //debugger;
            state.isFetching = false;
            let data = action.json;
            if (data && data.TotalCount) {
                if (data.PageIndex * data.PageSize >= data.TotalCount) {
                    state.imgLoading = false;
                } else {
                    state.imgLoading = true;
                }
                if (state.Json && state.Json.BlogWorkList) {
                    state.Json.BlogWorkList = state.Json.BlogWorkList.concat(action.json.BlogWorkList);
                } else {
                    state.Json = { BlogWorkList: data.BlogWorkList };
                }
                state.istrue = true;
            }
            return { ...state };//请求成功,返回一个新的state

        case LIST_REJECT_POSTS:
            return Object.assign({}, state, { 'istrue': false, 'isFetching': false });//请求失败，返回一个新的state

        default:
            return state;
    }
}

export default ListData;

