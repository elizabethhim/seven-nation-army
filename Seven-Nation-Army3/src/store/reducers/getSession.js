import {
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAIL,
} from '../actions/actionTypes';

const initialState = {};

export default function sessionList(state = initialState, action) {
  switch (action.type) {
    case GET_SESSIONS_SUCCESS:
      return {
        ...state,
        sessions: action.payload,
      };
    case GET_SESSIONS_FAIL:
      return {
        ...state,
        sessions: null,
      };
    default:
      return state;
  }
}
