// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import toggleReducer from './togglechat';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    toggleReducer
  });
}
