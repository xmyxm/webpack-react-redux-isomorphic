import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter,Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware,combineReducers } from 'redux';
import thunk from 'redux-thunk';

//import App from '../../client/src/view/home.js';

import Home from '../../src/component/home/home.jsx';
import Email from '../../src/component/email/email.jsx';
import Me from '../../src/component/me/me.jsx';
import reducers from '../../src/redux/reducer';
import {layout} from './layout.js';


const initialState = {};
const middleware = [thunk];
const finalCreateStore = applyMiddleware(...middleware)(createStore);
const store = finalCreateStore(reducers, initialState);

//get page and switch json and html
export default function(ctx) {

  let moudel,moudelName = ctx.url.replace(/\//g, '').toLowerCase();
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


        const html = layout(renderToString(
          <Provider store={store}>
            <StaticRouter location={ctx.url} context={{}}>
              <Route exact path="/home" component = {moudel} ></Route>
            </StaticRouter>
          </Provider>
        ), store.getState());
        ctx.body = html;

        /*let callBackData = {
          'status': 200,
          'message': '这个是主页',
          'data': {}
        };
        ctx.body = callBackData;*/
        //ctx.throw(406, 'allow json and html only');
}





/*console.log('typeof moudel   输出类型');
console.log(typeof moudel);

        const html = layout(renderToString(
          <Provider store={store}>
            <Switch>
              <div className = "blogbox">
                <Route exact path="/home" component = {moudel} ></Route>
                </div>
            </Switch>
          </Provider>
        ), store.getState());
        ctx.body = html;
*/






