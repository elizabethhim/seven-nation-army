import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import WelcomePage from './containers/WelcomePage';
import GamePage from './containers/GamePage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.WELCOME} exact component={WelcomePage} />
      <Route path={routes.HOME} component={HomePage} />
      <Route path={routes.GAME} component={GamePage} />
    </Switch>
  </App>
);
