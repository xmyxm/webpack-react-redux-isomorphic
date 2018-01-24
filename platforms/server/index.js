import React from 'react';
import { renderToString } from 'react-dom/server';
import { HashRouter as Router, StaticRouter, MemoryRouter, Route, Switch, LinkS, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../../src/redux/reducer';
import { layout } from './layout.js';
import router from './router.js';


import Header from '../../src/component/header/header.jsx';
import Home from '../../src/component/home/home.jsx';
import Email from '../../src/component/email/email.jsx';
import Me from '../../src/component/me/me.jsx';
import List from '../../src/component/list/list.jsx';
import Search from '../../src/component/search/search.jsx';
import Detail from '../../src/component/detail/detail.jsx';


const initialState = {}
const middleware = [thunk]
const finalCreateStore = applyMiddleware(...middleware)(createStore)
const routers = Object.keys(router)

export default async function (ctx) {
  let url = ctx.url.toLowerCase()
  let commponentAry
  let status = routers.some(item => {
    if ((new RegExp(item)).test(url)) {
      commponentAry = router[item]
      return true
    }
  })

  if (!status) {
    return ctx.body = '当前url地址不匹配';
  }

  const serverStart = Date.now()

  const store = finalCreateStore(reducers, initialState)
  let reqQueue = []
  commponentAry.forEach(item => {
    if (item.serverRender) reqQueue.push(item.serverRender(store, ctx.query, ctx.headers))
  })
  await Promise.all(reqQueue)

  const serverTime = Date.now() - serverStart

  const renderStart = Date.now()

  const initData = store.getState()
  const html = layout(renderToString(
    <Provider store={store}>
      <MemoryRouter>
        <div className = "blogbox">
            <Header/>
            <Switch>
                <Route path="/" exact component = {Home} ></Route>
                <Route path="/index.html" exact component = {Home} ></Route>
                <Route path="/m/index.html" exact component = {Home} ></Route>
                <Route path="/home" component = {Home} ></Route>
                <Route path="/list" component = {List} ></Route>
                <Route path="/search" component = {Search}></Route>
                <Route path="/detail/:id" component = {Detail} ></Route>
                <Route path="/me" component = {Me} ></Route>
                <Route path="/email" component = {Email} ></Route>
                <Redirect to="/m/index.html" />
            </Switch>
        </div>
      </MemoryRouter>
    </Provider>
  ), initData);

  const renderTime = Date.now() - renderStart

  console.log(`访问url地址：${ctx.url} 数据请求耗时: ${serverTime}ms 渲染耗时: ${renderTime}ms`)

  ctx.body = html;
}






