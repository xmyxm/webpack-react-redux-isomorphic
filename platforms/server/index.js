import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter,Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware,combineReducers } from 'redux';
import thunk from 'redux-thunk';

import Home from '../../src/component/home/home.jsx';
import Email from '../../src/component/email/email.jsx';
import Me from '../../src/component/me/me.jsx';
import reducers from '../../src/redux/reducer';
import {layout} from './layout.js';


const initialState = {};
const middleware = [thunk];
const finalCreateStore = applyMiddleware(...middleware)(createStore);
const store = finalCreateStore(reducers, initialState);

export default function(ctx) {
        const html = layout(renderToString(
          <Provider store={store}>
            <StaticRouter location={ctx.url} context={{}}>
              <div>
                <Route exact path="/home" component = {Home} ></Route>
                <Route exact path="/me" component = {Me} ></Route>
                <Route exact path="/email" component = {Email} ></Route>
              </div>
            </StaticRouter>
          </Provider>
        ), store.getState());
        ctx.body = html;
}



/*  let moudel,moudelName = ctx.url.replace(/\//g, '').toLowerCase();
  switch(moudelName){
    case 'home' :  
      moudel = Home;
      break;
    case 'email':
      moudel = Email;
      break;
    case 'me':
      moudel = Me;
      break;
    default :
      moudel = Home;
      break;
  }
*/

/*console.log('typeof moudel   输出类型');
console.log(typeof moudel);

        const html = layout(renderToString(
          <Provider store={store}>
            <StaticRouter location={ctx.url} context={{}}>
              <div>
                <Email/>
                <Route exact path="/home" component = {moudel} ></Route>
              </div>
            </StaticRouter>
          </Provider>
        ), store.getState());
        ctx.body = html;
*/






