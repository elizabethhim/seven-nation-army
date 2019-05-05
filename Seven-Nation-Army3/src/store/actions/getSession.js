import { push } from 'connected-react-router';
import {
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAIL,
  CREATE_SESSION_SUCCESS,
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

export const createSession = () => {
  return dispatch => {
    dispatch({
      type: CREATE_SESSION_SUCCESS,
      payload: null,
    });
    dispatch(push('/game'));
  };
};
