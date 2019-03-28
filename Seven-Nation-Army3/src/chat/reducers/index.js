import { combineReducers } from 'redux';

// import your Home Module reducers here and combine them
// Placed in same directory
import toggleReducer from './toggleChat'

export default combineReducers({
	toggleReducer
});