import { push } from 'connected-react-router';
// import { genSaltSync, hashSync } from 'bcryptjs';
import {
  // GET_SESSIONS_SUCCESS,
  // GET_SESSIONS_FAIL,
  CREATE_SESSION_SUCCESS,
  JOIN_SESSION_SUCCESS,
  JOIN_SESSION_NO_MATCH,
  JOIN_SESSION_FAIL,
  // CREATE_SESSION_FAIL,
} from '../actions/actionTypes';

// Chris: Hold-over from when I was testing database access.
// DEPRECATED:: DO NOT USE
/*
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
*/

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

export const joinSession = code => {
  return (dispatch, _, { getFirebase }) => {
    // BUG: GENERATES A 2A TYPE OF HASH, NOT COMPATIBLE WITH PYTHON 2B HASH
    // const hash = hashSync(code, 14);
    // console.log(hash);
    getFirebase()
      .ref('root/sessions')
      .once('value', sessions => {
        const sessionList = sessions.val();
        let roomID = '';
        console.log('Sessions', sessionList);
        for (let sessionID in sessionList) {
          if (code === sessionList[sessionID].hashedPasscode) {
            roomID = sessionList[sessionID].hashedPasscode;
            break;
          }
        }
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
