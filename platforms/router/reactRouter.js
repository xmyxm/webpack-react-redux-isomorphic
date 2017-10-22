import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
//import createHistory from 'history/createHashHistory';
import Header from '../../src/component/header/header.jsx';
import Home from '../../src/component/home/home.jsx';
import Email from '../../src/component/email/email.jsx';
import Me from '../../src/component/me/me.jsx';


//const history = createHistory();

export default (
    <Router>
        <div className = "blogbox">
            <Route exact path="/home" component = {Home} ></Route>
            <Route exact path="/email" component = {Email} ></Route>
            <Route exact path="/me" component = {Me} ></Route>
        </div>
    </Router>
)



// <Router history={history}>
//         <div className = "blogbox">
//             <Route exact path="/home" component = {Home} ></Route>
//             <Route exact path="/email" component = {Email} ></Route>
//             <Route exact path="/me" component = {Me} ></Route>
//         </div>
//     </Router>