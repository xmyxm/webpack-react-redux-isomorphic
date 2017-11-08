import { SEARCH_REQUEST_POSTS, SEARCH_RESOLVE_POSTS, SEARCH_REJECT_POSTS } from './search_action.js'

const defaultlState = {
    istrue: false,
    isFetching: false,
    imgLoading: true
};

//首次渲染时获取数据
const SearchData = (state = defaultlState, action = {}) => {
    switch (action.type) {
        case SEARCH_REQUEST_POSTS:
            state.isFetching = true;
            state.param = action.param;
            return { ...state };

        case SEARCH_RESOLVE_POSTS://debugger;
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

        case SEARCH_REJECT_POSTS:
            return Object.assign({}, state, { 'istrue': false, 'isFetching': false });//请求失败，返回一个新的state
        default:
            return state;
    }
}

export default SearchData;

