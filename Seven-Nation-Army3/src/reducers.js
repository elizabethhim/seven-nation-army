import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

// import your Module reducers here and combine them
import home from './store/reducers/userRepos';
import chat from './store/reducers/userRepos';

export default (history) => combineReducers({
  router: connectRouter(history),
  home,
  chat,
  // rest of your reducers
});