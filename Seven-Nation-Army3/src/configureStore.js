import { createHashHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

import createRootReducer from './reducers';
import fbConfig from './config/fbConfig';

// create history
export const history = createHashHistory();

// define on your own as per requirment
const preloadedState = {};

const store = createStore(
  createRootReducer(history), // root reducer with router state
  preloadedState,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunk.withExtraArgument({ getFirebase, getFirestore })
    ),
    reactReduxFirebase(fbConfig),
    reduxFirestore(fbConfig)
  )
);
export default store;
