import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

// Configure routes
import Home from './home';
import About from './about';
import Login from './login/login';
import Map from './game/map/map';
import Settings from './settings/settings';
import Help from './help/help';
import PageNotFound from './common/components/PageNotFound';
// import Chat from './game/chat/chat';


export default (
  <AnimatedSwitch
    atEnter={{ opacity: 0 }}
    atLeave={{ opacity: 0 }}
    atActive={{ opacity: 1 }}
    className="switch-wrapper"
  >
    <Route exact path="/" component={Home} />
    <Route path="/map" component={Map} />
    <Route path="/settings" component={Settings} />
    {/*<Route path="/help" component={Help} />*/}
    <Route path="/about" component={About} />
    <Route path="/login" component={Login} />
    {/*<Route path ="/chat" component={Chat}/>*/}
    <Route component={PageNotFound} />
  </AnimatedSwitch>
);
