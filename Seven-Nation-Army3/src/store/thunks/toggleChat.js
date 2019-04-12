import { toggleChat } from '../actions/toggleChat';

// A thunk is a function that returns a function.
// get user repos
export default function toggleChat() {
  return toggleChat;
}
