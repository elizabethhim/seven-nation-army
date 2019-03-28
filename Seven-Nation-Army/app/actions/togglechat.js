import type { GetState, Dispatch } from '../reducers/types';

export const TOGGLE_CHAT = 'TOGGLE_CHAT';

export default function toggleChat() {
  return {
    type: TOGGLE_CHAT
  };
}
