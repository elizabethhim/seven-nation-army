import { ADD_MESSAGE } from './actionTypes';

export default function addMessage(payload) {
  return {
    type: ADD_MESSAGE,
    payload,
  };
}
