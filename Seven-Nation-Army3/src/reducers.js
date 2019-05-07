import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { firestoreReducer as firestore } from 'redux-firestore';
import { firebaseReducer as firebase } from 'react-redux-firebase';

// import your Module reducers here and combine them
import home from './store/reducers/userRepos';
import chat from './store/reducers/userRepos';
import auth from './store/reducers/authUser';
import chatHistory from './store/reducers/addMessage';
import chatRoom from './store/reducers/openChatRoom'
import session from './store/reducers/getSession';

export default history =>
  combineReducers({
    router: connectRouter(history),
    home,
    chat,
    chatHistory,
    chatRoom,
    firestore,
    firebase,
    auth,
    session,
    // rest of your reducers
  });
