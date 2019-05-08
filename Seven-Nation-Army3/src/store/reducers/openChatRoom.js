import {OPEN_CHAT_ROOM_SUCCESS, OPEN_CHAT_ROOM_FAIL} from '../actions/actionTypes';

const initialState = {};

export default function openChatRoom(state = initialState, action) {
    switch (action.type) {
      case OPEN_CHAT_ROOM_SUCCESS:
        return {
          ...state,
          roomID: action.payload.roomID,
          friendID: action.payload.friendID,
        };
      case OPEN_CHAT_ROOM_FAIL:
        return {
          ...state,
          roomID: null,
          friendID: null,
        };
      default:
        return state;
    }
  }