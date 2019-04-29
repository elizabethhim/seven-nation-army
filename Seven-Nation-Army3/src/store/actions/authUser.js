import { push } from 'connected-react-router';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SETTINGS_NAME_CHANGED,
  SETTINGS_PASSWORD_CHANGED,
  SETTINGS_LEFT_ALONE,
  SETTINGS_ERROR,
} from './actionTypes';

export const login = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS });
        dispatch(push('/home'));
      })
      .catch(err => {
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
        dispatch(push('/login'));
      })
      .catch(err => {
        dispatch({ type: LOGOUT_FAIL, err });
      });
  };
};

export const register = user => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        return res.user.updateProfile({
          displayName: user.displayName,
        });
      })
      .then(() => {
        dispatch({ type: REGISTER_SUCCESS });
        dispatch(push('/login'));
      })
      .catch(err => {
        dispatch({ type: REGISTER_FAIL, err });
      });
  };
};

export const save = displayName => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    const user = firebase.auth().currentUser;

    if (displayName !== '') {
      user
        .updateProfile({
          displayName,
        })
        .then(() => {
          dispatch({ type: SETTINGS_NAME_CHANGED });
          dispatch(push('/home'));
        })
        .catch(err => {
          dispatch({ type: SETTINGS_ERROR, err });
        });
    } else {
      dispatch({ type: SETTINGS_LEFT_ALONE });
      dispatch(push('/home'));
    }
  };
};

export const changePassword = password => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;

    user.updatePassword(password).then(() => {
      dispatch({ type: SETTINGS_PASSWORD_CHANGED });
      dispatch(logout());
    }).catch(err => {
      dispatch({ type: SETTINGS_ERROR, err });
    });
  }
}