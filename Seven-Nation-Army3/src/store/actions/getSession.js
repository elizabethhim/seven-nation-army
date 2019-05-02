import { GET_SESSIONS_SUCCESS, GET_SESSIONS_FAIL } from '../actions/actionTypes';

export const getSessions = () => {
  return (dispatch, _, { getFirebase }) => {
    getFirebase()
      .database()
      .ref('sessions')
      .once('value', snap => {
        console.log('Once', snap.toJSON());
      })
      .then(res => {
        console.log('Realtime database', res);
        dispatch({
          type: GET_SESSIONS_SUCCESS,
          payload: res,
        });
      })
      .catch(err => {
        console.log('Error', err);
        dispatch({
          type: GET_SESSIONS_FAIL,
          payload: err,
        });
      });
  };
};
