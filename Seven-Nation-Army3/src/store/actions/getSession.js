import { push } from 'connected-react-router';
import axios from 'axios';
import {
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAIL,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_FAIL,
  JOIN_SESSION_SUCCESS,
  JOIN_SESSION_NO_MATCH,
  JOIN_SESSION_FAIL,
  LEAVE_SESSION,
  // CREATE_SESSION_FAIL,
} from '../actions/actionTypes';

export const getSessions = () => {
  return (dispatch, _, { getFirebase }) => {
    getFirebase()
      .database()
      .ref('root/sessions')
      .once('value')
      .then(res => {
        dispatch({
          type: GET_SESSIONS_SUCCESS,
          payload: res.val(),
        });
      })
      .catch(err => {
        dispatch({
          type: GET_SESSIONS_FAIL,
          payload: err,
        });
      });
  };
};

// TODO: Create a new session in the database with all the correct parameters
// (Port from Seven-Nation-Army-Backend)
export const createSession = (title, passcode, adjudicationPeriod) => {
  return (dispatch, getState) => {
    const token = getState().firebase.auth.stsTokenManager.accessToken
    const bodyFormData = new FormData();
    bodyFormData.set('title', title);
    bodyFormData.set('passcode', passcode);
    bodyFormData.set('adjudicationPeriod', adjudicationPeriod);
    console.log(token);
    axios({
      method: 'post',
      url: 'http://35.165.246.90:5000/api/createsession',
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: bodyFormData,
      auth: {
        username: token,
        password: ''
      }
    }).then(res => {
      console.log('Result', res);
      if((res['data'])['data'] === 'session created'){
        dispatch({
          type: CREATE_SESSION_SUCCESS,
          payload: '-LdLRab8HD6zBlXNJMRK',
        });
        dispatch(push('/game'));
      }else{
        dispatch({
          type: CREATE_SESSION_FAIL,
          payload: (res['data'])['data'] ,
        });
      }
      
      
    }).catch(err => {
      console.log('Connection Error');
      console.log(err);
      dispatch({
        type: CREATE_SESSION_FAIL,
        payload: err,
      })
    });
    // TODO(Chris): Access AWS database and authorize join session.
  };
};

export const leaveSession = () => {
  return dispatch => {
    dispatch({
      type: LEAVE_SESSION,
    });
    dispatch(push('./home'))
  }
}

// export const joinSession = (roomID, roomCode) => {
//   return (dispatch, _, { getFirebase }) => {
//     getFirebase()
//       .ref('root/sessions')
//       .once('value', sessions => {
//         const sessionList = sessions.val();
//         if (roomID !== '') {
//           dispatch({
//             type: JOIN_SESSION_SUCCESS,
//             payload: sessionList[roomID],
//           });
//           dispatch(push('/game'));
//         } else {
//           dispatch({
//             type: JOIN_SESSION_NO_MATCH,
//             payload: 'Not a valid room code.',
//           });
//         }
//       })
//       .catch(err => {
//         dispatch({
//           type: JOIN_SESSION_FAIL,
//           payload: err,
//         });
//       });
//   }
// }


export const joinSession = (roomID, roomCode) => {
  return (dispatch, getState) => {
    const token = getState().firebase.auth.stsTokenManager.accessToken
    const bodyFormData = new FormData();
    bodyFormData.set('sessionID', roomID);
    bodyFormData.set('passcode', roomCode);
    console.log(token);
    axios({
      method: 'post',
      url: 'http://35.165.246.90:5000/api/joinsession',
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: bodyFormData,
      auth: {
        username: token,
        password: ''
      }
    }).then(res => {
      console.log('Result', res);
      if((res['data'])['data'] === 'User added'){
        dispatch({
          type: JOIN_SESSION_SUCCESS,
          payload: '-LdLRab8HD6zBlXNJMRK',
        });
        dispatch(push('/game'));
      }else{
        dispatch({
          type: JOIN_SESSION_NO_MATCH,
          payload: (res['data'])['data'] ,
        });
      }
      
      
    }).catch(err => {
      console.log('Connection Error');
      console.log(err);
      dispatch({
        type: JOIN_SESSION_FAIL,
        payload: err,
      })
    });
    // TODO(Chris): Access AWS database and authorize join session.
  };
}

