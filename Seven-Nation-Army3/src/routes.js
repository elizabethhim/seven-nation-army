import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Configure routes
import Home from './home';
import About from './about';
import Login from './login/login';
import PageNotFound from './common/components/PageNotFound';

export default (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/login" component={Login}/>
    <Route component={PageNotFound} />
  </Switch>
);