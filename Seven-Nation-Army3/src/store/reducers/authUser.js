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
} from '../actions/actionTypes';

const initialState = {
  authError: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log('Login success!');
      return {
        ...state,
        authError: null,
      };
    case LOGOUT_SUCCESS:
      console.log('Logout success!');
      return {
        ...state,
        authError: null,
      };
    case REGISTER_SUCCESS:
      console.log('Register success!');
      return {
        ...state,
        authError: null,
      };
    case LOGIN_FAIL:
      console.log('Login failed');
      return {
        ...state,
        authError: action.err.message,
      };
    case LOGOUT_FAIL:
      console.log('Logout failed');
      return {
        ...state,
        authError: action.err.message,
      };
    case REGISTER_FAIL:
      console.log('Registration failed');
      return {
        ...state,
        authError: action.err.message,
      };
    case SETTINGS_NAME_CHANGED:
      console.log('Settings changed!');
      return {
        ...state,
        authError: null,
      };
    case SETTINGS_PASSWORD_CHANGED:
      console.log('Password changed! Logging out...');
      return {
        ...state,
        authError: null,
      };
    case SETTINGS_LEFT_ALONE:
      console.log('Settings left alone.');
      return {
        ...state,
        authError: null,
      };
    case SETTINGS_ERROR:
      console.log('An error occured while changing settings');
      return {
        ...state,
        authError: action.err.message,
      };
    default:
      return state;
  }
}
