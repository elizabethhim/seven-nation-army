import { OPEN_CHAT_ROOM_SUCCESS, OPEN_CHAT_ROOM_FAIL } from '../actions/actionTypes';

export default function openChatRoom(friendID) {
    return (dispatch, _, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const chatFriendsRef = firebase.database().ref('root/sessions/-LdLRGh4fGk1rD5Zd_Np/players/' + user.uid + '/chatFriends/' + friendID);
                const chatroomsRef = firebase.database().ref('root/chatrooms');

                chatFriendsRef.once('value').then(res => {
                    if (res.val()) {
                        dispatch({
                            type: OPEN_CHAT_ROOM_SUCCESS,
                            payload: { roomID: res.val().roomID, friendID: friendID },
                        });
                        console.log("Open Chat succeeded - roomID: " + res.val().roomID);
                    }
                    else {
                        const roomRef = chatroomsRef.push();
                        chatFriendsRef.update({
                            roomID: roomRef.key,
                        }, error => {
                            if (error) {
                                dispatch({
                                    type: OPEN_CHAT_ROOM_FAIL,
                                    payload: error,
                                });
                                console.log("Update failed - roomID to " + roomRef.key);
                            } 
                        });

                        const newFriendChatroomRef = firebase.database().ref('root/sessions/-LdLRGh4fGk1rD5Zd_Np/players/' + friendID + '/chatFriends/' + user.uid);
                        newFriendChatroomRef.update({
                            roomID: roomRef.key,
                        }, error => {
                            if (error) {
                                dispatch({
                                    type: OPEN_CHAT_ROOM_FAIL,
                                    payload: error,
                                });
                                console.log("Update failed - roomID to " + roomRef.key);
                            } else {
                                dispatch({
                                    type: OPEN_CHAT_ROOM_SUCCESS,
                                    payload: { roomID: roomRef.key, friendID: friendID },
                                });
                                console.log("Open Chat succedded- roomID: " + roomRef.key);
                            }
                        });
                    }
                }, error => {
                        if (error) {
                            dispatch({
                                type: OPEN_CHAT_ROOM_FAIL,
                                payload: error,
                            });
                            console.log("Open Chat failed");
                        }
                    });
            } else {
                console.log("Something went wrong... User is not signed in");
            }

        });

    };
}
