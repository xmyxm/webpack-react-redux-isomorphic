import React from 'react';
import { renderToString } from 'react-dom/server';
import { HashRouter as Router, StaticRouter, MemoryRouter, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//import createHistory from 'history/createMemoryHistory'

import Header from '../../src/component/header/header.jsx';
import Home from '../../src/component/home/home.jsx';
import Email from '../../src/component/email/email.jsx';
import Me from '../../src/component/me/me.jsx';
import List from '../../src/component/list/list.jsx';
import reducers from '../../src/redux/reducer';
import { layout } from './layout.js';


const initialState = {};
const middleware = [thunk];
const finalCreateStore = applyMiddleware(...middleware)(createStore);
const store = finalCreateStore(reducers, initialState);

//function async 

export default function (ctx) {
  let Moudel, moudelName = ctx.url.replace(/\//g, '').toLowerCase();
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
    default:
      Moudel = Home;
      break;
  }

  if (Moudel.serverRender) {
    //await Promise.all(prefetchTasks)
    Moudel.serverRender(store);
  }

  const html = layout(renderToString(
    <Provider store={store}>
      <MemoryRouter location={ctx.url}>
        <div>
          <Header />
          <Moudel />
        </div>
      </MemoryRouter>
    </Provider>
  ), store.getState());
  ctx.body = html;
}






