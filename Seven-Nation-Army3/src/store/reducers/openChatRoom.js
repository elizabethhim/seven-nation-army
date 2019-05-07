import {OPEN_CHAT_ROOM_SUCCESS, OPEN_CHAT_ROOM_FAIL} from '../actions/actionTypes';

const initialState = {};

export default function openChatRoom(state = initialState, action) {
    switch (action.type) {
      case OPEN_CHAT_ROOM_SUCCESS:
        return {
          ...state,
          roomData: action.payload,
        };
      case OPEN_CHAT_ROOM_FAIL:
        return {
          ...state,
          roomData: null,
        };
      default:
        return state;
    }
  }