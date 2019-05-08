import {
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAIL,
  JOIN_SESSION_SUCCESS,
  JOIN_SESSION_NO_MATCH,
  JOIN_SESSION_FAIL,
  LEAVE_SESSION,
} from '../actions/actionTypes';

const initialState = {};

export default function session(state = initialState, action) {
  switch (action.type) {
    case GET_SESSIONS_SUCCESS:
      return {
        ...state,
        sessions: action.payload,
        sessionError: null,
      };
    case GET_SESSIONS_FAIL:
      return {
        ...state,
        sessions: null,
        sessionError: 'Could not get list of sessions.',
      };
    case JOIN_SESSION_SUCCESS:
      return {
        ...state,
        session: action.payload,
        sessions: null,
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
    case LEAVE_SESSION:
      return {
        ...state,
        session: null,
        sessions: null,
        sessionError: null,
      }
    default:
      return state;
  }
}
