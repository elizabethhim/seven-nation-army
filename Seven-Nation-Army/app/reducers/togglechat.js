import { TOGGLE_CHAT } from '../actions/togglechat';
import type { Action } from './types';

const initialState = {
  chatIsVisible: false
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case TOGGLE_CHAT:
      return {
        ...state,
        chatIsVisible: !state.chatIsVisible
      };
    default:
      return state;
  }
};
