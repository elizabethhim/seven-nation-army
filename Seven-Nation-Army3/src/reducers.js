import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { firestoreReducer as firestore } from 'redux-firestore';
import { firebaseReducer as firebase } from 'react-redux-firebase';

// import your Module reducers here and combine them
import home from './store/reducers/userRepos';
import chat from './store/reducers/userRepos';
import auth from './store/reducers/authUser';
import chatHistory from './chat/reducers';

export default history =>
  combineReducers({
    router: connectRouter(history),
    home,
    chat,
    chatHistory,
    firestore,
    firebase,
    auth,
    // rest of your reducers
  });
