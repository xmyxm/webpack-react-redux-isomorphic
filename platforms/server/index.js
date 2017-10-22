import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware,combineReducers } from 'redux';
import thunk from 'redux-thunk';

//import App from '../../client/src/view/home.js';

import Home from '../../src/component/home/home.jsx';
import reducers from '../../src/redux/reducer';
import {layout} from './layout.js';


const initialState = {};
const middleware = [thunk];
const finalCreateStore = applyMiddleware(...middleware)(createStore);
const store = finalCreateStore(reducers, initialState);

//get page and switch json and html
export default function(ctx) {

        const html = layout(renderToString(
          <Provider store={store}>
            <StaticRouter location={ctx.url} context={{}}>
              <Home/>
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













