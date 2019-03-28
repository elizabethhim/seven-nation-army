import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {AnimatedSwitch} from 'react-router-transition';

// Configure routes
import Home from './home';
import About from './about';
import Login from './login/login';
import Map from './game/map/map';
import PageNotFound from './common/components/PageNotFound';

export default (
  <AnimatedSwitch
  atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="switch-wrapper"
  >
    <Route exact path="/" component={Home}/>
    <Route path="/map" component={Map}/>
    <Route path="/about" component={About}/>
    <Route path="/login" component={Login}/>
    <Route component={PageNotFound} />
  </AnimatedSwitch>
);
