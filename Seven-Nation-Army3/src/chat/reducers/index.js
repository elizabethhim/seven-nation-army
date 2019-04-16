import { combineReducers } from 'redux';

// import your Home Module reducers here and combine them
// Placed in same directory
import addMessageReducer from './addMessage'

export default combineReducers({
	addMessageReducer
});