import { ADD_MESSAGE } from './actionTypes';

export default function addMessage(payload) {
  return (dispatch, _, { getFirebase }) => {
    const firebase = getFirebase();
    const roomID = payload.roomID;
    const chatRoomRef = firebase.database().ref('root/chatrooms/' + roomID);
    const messageRef = chatRoomRef.push();
    
    messageRef.update({
      senderName: payload.senderName,
      senderID: payload.senderID,
      time: payload.time,
      message: payload.message,
    }, error => {
      if(error) {
        console.log("Update messages to chatroom: " + roomID + " failed");
      } else {
        dispatch({
          type: ADD_MESSAGE,
          payload,
      });
      console.log("Update messages to chatroom: " + roomID + " succeeded");
      }
    });
  };
}
