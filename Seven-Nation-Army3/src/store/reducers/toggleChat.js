import { TOGGLE_CHAT } from '../actions/actionTypes';

const initialState = {
  chatIsVisible: false,
};

export default function toggleChat(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CHAT:
      return {
        ...state,
        chatIsVisible: !state.chatIsVisible,
      };
    default:
      return state;
  }
}
