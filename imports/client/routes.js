import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import MainLayout from './layouts/MainLayout';
import App from './App';
import About from './pages/About';

Meteor.startup(() => {
    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={MainLayout} >
                <IndexRoute component={App} />
                <Route path="/about" component={About} />
                <Route path="/:id" component={App} />
            </Route>
        </Router>,
        document.querySelector('#render-target')
    );
});