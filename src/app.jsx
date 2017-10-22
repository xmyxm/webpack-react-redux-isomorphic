import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//域名根路径无法指向当前web站点index.html页面时启用 hash 路由
import createHistory from 'history/createHashHistory'
import { HashRouter as Router, Route, Switch, Link} from 'react-router-dom';
//import createHistory from 'history/createBrowserHistory';
//import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { createStore, applyMiddleware,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './redux/reducer';//拿到所有reducer来生成stare
import baseStyle from './style/base.less';

import Header from './component/header/header.jsx';
import Me from 'bundle-loader?lazy&name=app-[name]!./component/me/me.jsx';
import Home from 'bundle-loader?lazy&name=app-[name]!./component/home/home.jsx';
import List from 'bundle-loader?lazy&name=app-[name]!./component/list/list.jsx';
import Detail from 'bundle-loader?lazy&name=app-[name]!./component/detail/detail.jsx';
import Email from 'bundle-loader?lazy&name=app-[name]!./component/email/email.jsx';
import Search from 'bundle-loader?lazy&name=app-[name]!./component/search/search.jsx';
import Bundle from './component/bundle.jsx';
import Loading from './component/loading/loading.jsx';



//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
const history = createHistory();
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
    //middleware.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
//初始化默认state数据
const initialState = {};
const finalCreateStore = applyMiddleware(...middleware)(createStore);
const store = finalCreateStore(reducers, initialState);

if (module.hot) {
    const nextReducer = require('./redux/reducer');
    module.hot.accept('./redux/reducer',() => { store.replaceReducer(nextReducer)} );
}

const createComponent = (component) =>() => (
    <Bundle load={component}>
        {
            (Component) => Component?<Component />:<Loading/>
        }
    </Bundle>
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
        <div className = "blogbox">
            <Header/>
            <Route exact path="/" component = {createComponent(Home)} ></Route>
            <Route exact path="/index.html" component = {createComponent(Home)} ></Route>
            <Route exact path="/m/index.html" component = {createComponent(Home)} ></Route>
            <Route path="/home" component = {createComponent(Home)} ></Route>
            <Route path="/list" component = {createComponent(List)} ></Route>
            <Route path="/search" component = {createComponent(Search)}></Route>
            <Route path="/detail/:id" component = {createComponent(Detail)} ></Route>
            <Route path="/me" component = {createComponent(Me)} ></Route>
            
            <Route path="/email" component = {createComponent(Email)} ></Route>
        </div>
    </Router>
  </Provider>,
  document.getElementById('app')
)








