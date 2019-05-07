import {
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAIL,
  JOIN_SESSION_SUCCESS,
  JOIN_SESSION_NO_MATCH,
  JOIN_SESSION_FAIL,
} from '../actions/actionTypes';

const initialState = {};

export default function session(state = initialState, action) {
  switch (action.type) {
    case GET_SESSIONS_SUCCESS:
      return {
        ...state,
        sessionError: null,
      };
    case GET_SESSIONS_FAIL:
      return {
        ...state,
        sessionError: 'Could not get list of sessions.',
      };
    case JOIN_SESSION_SUCCESS:
      return {
        ...state,
        session: action.payload,
        sessionError: null,
      };
    case JOIN_SESSION_NO_MATCH:
      return {
        ...state,
        session: null,
        sessionError: action.payload,
      };
    case JOIN_SESSION_FAIL:
      return {
        ...state,
        session: null,
        sessionError: action.payload,
      }
    default:
      return state;
  }
}
