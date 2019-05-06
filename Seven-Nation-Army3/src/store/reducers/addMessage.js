import { ADD_MESSAGE } from '../actions/actionTypes';

let initialState = {
  messages: [],
};

export default function addMessage(state = initialState, action) {
  if (action.type === ADD_MESSAGE) {
    //add message data to firebase

    return {
      ...state,
      messages: [...state.messages, action.payload],
    };
  }
  return state;
}
