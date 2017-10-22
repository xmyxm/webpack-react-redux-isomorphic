import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createHashHistory'
import { HashRouter as Router, Route, Switch, Link} from 'react-router-dom';
import baseStyle from './style/base.less';
import {default as routerDOM} from './router/reactRouter.js'

ReactDOM.render(routerDOM,  document.getElementById('app'));








