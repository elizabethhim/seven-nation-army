import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {AnimatedSwitch} from 'react-router-transition';

// Configure routes
import Home from './home';
import About from './about';
import Login from './login/login';
import PageNotFound from './common/components/PageNotFound';
import Settings from './settings/settings';

export default (
  <AnimatedSwitch
  atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="switch-wrapper"
  >
    <Route exact path="/" component={Home}/>
    <Route path="/login" component={Login}/>
    <Route exact path="/settings" component={Settings}/>
    <Route component={PageNotFound} />
  </AnimatedSwitch>
);