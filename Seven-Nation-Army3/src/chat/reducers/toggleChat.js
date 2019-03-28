import { TOGGLE_CHAT } from '../actions/actionTypes';

let initialState = {
  chatIsVisible: false
};

function toggleChat(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CHAT:
      return Object.assign({}, state, {
        chatIsVisible: !state.chatIsVisible
      });
    default:
      return state;
  }
}

export default toggleChat;
