import { push } from 'connected-react-router';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './actionTypes';

export const login = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS });
        dispatch(push('/'));
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: LOGIN_FAIL, err });
      });
  };
};

export const logout = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
      })
      .error(err => {
        dispatch({ type: LOGOUT_FAIL, err });
      });
  };
};

export const register = user => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        return firestore
          .collection('users')
          .doc(res.user.uid)
          .set({
            displayName: user.displayName,
          });
      })
      .then(() => {
        dispatch({ type: REGISTER_SUCCESS });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: REGISTER_FAIL, err });
      });
  };
};
