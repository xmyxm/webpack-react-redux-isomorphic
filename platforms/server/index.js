import React from 'react';
import { renderToString } from 'react-dom/server';
import { HashRouter as Router, StaticRouter, MemoryRouter, Route, Switch, LinkS, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../../src/redux/reducer';
import { layout } from './layout.js';
import router from './router.js';

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

  console.log('访问url地址：' + ctx.url)

  const store = finalCreateStore(reducers, initialState)
  let reqQueue = []
  commponentAry.forEach(item => {
    if (item.serverRender) reqQueue.push(item.serverRender(store, ctx.url))
  })
  await Promise.all(reqQueue)

  const initData = store.getState()
  const html = layout(renderToString(
    <Provider store={store}>
      <MemoryRouter location={ctx.url}>
        <div className="blogbox">
          {
            commponentAry.map(item => {
              return item
            })
          }
        </div>
      </MemoryRouter>
    </Provider>
  ), initData);


  ctx.body = html;
}






