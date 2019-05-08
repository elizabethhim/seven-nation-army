import { push } from 'connected-react-router';
// import axios from 'axios';
import {
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAIL,
  CREATE_SESSION_SUCCESS,
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
export const createSession = () => {
  return dispatch => {
    dispatch({
      type: CREATE_SESSION_SUCCESS,
      payload: null,
    });
    dispatch(push('/game'));
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

export const joinSession = (roomID, roomCode) => {
  return (dispatch, _, { getFirebase }) => {
    getFirebase()
      .ref('root/sessions')
      .once('value', sessions => {
        const sessionList = sessions.val();
        if (roomID !== '') {
          dispatch({
            type: JOIN_SESSION_SUCCESS,
            payload: sessionList[roomID],
          });
          dispatch(push('/game'));
        } else {
          dispatch({
            type: JOIN_SESSION_NO_MATCH,
            payload: 'Not a valid room code.',
          });
        }
      })
      .catch(err => {
        dispatch({
          type: JOIN_SESSION_FAIL,
          payload: err,
        });
      });
  }
}

/*
export const joinSession = (roomID, roomCode) => {
  return (dispatch, getState) => {
    const token = getState().firebase.auth.stsTokenManager.accessToken
    console.log(token);
    axios({
      method: 'post',
      url: '35.165.246.90:5000/api/joinsession',
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': `Basic ${token}`,
      },
      data: {
        sessionID: roomID,
        passcode: roomCode,
      },
    }).then(res => {
      console.log('Result', res);
      dispatch({
        type: JOIN_SESSION_SUCCESS,
        payload: '-LdLRab8HD6zBlXNJMRK',
      });
      dispatch(push('/game'));
    }).catch(err => {
      console.log('Connection Error');
      dispatch({
        type: JOIN_SESSION_FAIL,
        payload: err,
      })
    });
    // TODO(Chris): Access AWS database and authorize join session.
  };
}
*/
