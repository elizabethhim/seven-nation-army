import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

// Configure routes
import About from './about';
import PageNotFound from './common/components/PageNotFound';
import Game from './game/game';
import Home from './home';
import Login from './login/login';
import Register from './login/register';
import Settings from './settings/settings';
/* import Help from './help/help'; */
// import Chat from './game/chat/chat';

export default (
  <AnimatedSwitch
    atEnter={{ opacity: 0 }}
    atLeave={{ opacity: 0 }}
    atActive={{ opacity: 1 }}
    className="switch-wrapper"
  >
    <Route exact path="/">
      <Redirect to="/login" />
    </Route>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/home" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/settings" component={Settings} />
    {/*<Route path="/map" component={Map} />*/}
    <Route path="/game" component={Game} />
    {/*<Route path="/help" component={Help} />*/}
    {/*<Route path ="/chat" component={Chat}/>*/}
    <Route component={PageNotFound} />
  </AnimatedSwitch>
);
