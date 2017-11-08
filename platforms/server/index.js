import React from 'react';
import { renderToString } from 'react-dom/server';
import { HashRouter as Router, StaticRouter, MemoryRouter, Route, Switch, LinkS, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//import createHistory from 'history/createMemoryHistory'

import Header from '../../src/component/header/header.jsx';
import Home from '../../src/component/home/home.jsx';
import Email from '../../src/component/email/email.jsx';
import Me from '../../src/component/me/me.jsx';
import List from '../../src/component/list/list.jsx';
import Search from '../../src/component/search/search.jsx';
import Detail from '../../src/component/detail/detail.jsx';
import reducers from '../../src/redux/reducer';
import { layout } from './layout.js';


const initialState = {};
const middleware = [thunk];
const finalCreateStore = applyMiddleware(...middleware)(createStore);
const store = finalCreateStore(reducers, initialState);

//function async 

export default async function (ctx) {
  let Moudel, moudelName = ctx.url.replace(/(\/|[0-9])/g, '').toLowerCase();
  if (moudelName == 'favicon.ico') {
    return ctx.body = '';
  }
  console.log(moudelName);
  switch (moudelName) {
    case 'home':
      Moudel = Home;
      break;
    case 'email':
      Moudel = Email;
      break;
    case 'me':
      Moudel = Me;
      break;
    case 'list':
      Moudel = List;
      break;
    case 'detail':
      Moudel = Detail;
      break;
    case 'search':
      Moudel = Search;
      break;
    default:
      Moudel = Home;
      break;
  }

  let reqQueue = [Header.serverRender(store)];
  if (Moudel.serverRender) {
    reqQueue.push(Moudel.serverRender(store, ctx.url));
  }

  await Promise.all(reqQueue);

  const initData = store.getState();

  const html = layout(renderToString(
    <Provider store={store}>
      <MemoryRouter location={ctx.url}>
        <div className="blogbox">
          <Header />
          <Moudel />
        </div>
      </MemoryRouter>
    </Provider>
  ), initData);


  ctx.body = html;
}






