import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../styles/Chat.scss';
import ChatMessage from './ChatMessage';
import { getFirebase } from 'react-redux-firebase';

export default class MessageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.firebase = getFirebase();
    this.chatroomListener = null;
    this.chatroomRef = null;
    this.listenForNewMessages = this.listenForNewMessages.bind(this);
  }

  listenForNewMessages(props) {
    this.firebase.auth().onAuthStateChanged((user) => { 

      this.chatroomRef = this.firebase.database().ref('root/chatrooms/' + props.roomID);
      this.chatroomListener = this.chatroomRef.on('value', snapshot => {
        const messageList = [];
        
        snapshot.forEach(element => {
          let myMessage = true;
          if(user.uid != element.val().senderID) {
            myMessage = false;
          }
          messageList.push({
            senderID: element.val().senderID,
            senderName: element.val().senderName,
            time: element.val().time,
            message: element.val().message,
            messageID: element.key,
            myMessage: myMessage,
          });
        });
        this.setState({
          messages: messageList,
        });
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.roomID) {
      if(this.messageRef) {
        this.messageRef.off("value", this.chatroomListener);
      }
      this.listenForNewMessages(nextProps);
    }
  }

  render() {
    // console.log(this.state.messages);
    return (
      this.state.messages &&
      this.state.messages.map(el => (
        <ChatMessage
          key={el.messageID}
          myMessage={el.myMessage}
          time={el.time}
          name={el.senderName}
          message={el.message}
        />
      ))
    );
  }
}

MessageList.propTypes = {
  roomID: PropTypes.any,
  friendID: PropTypes.any,
  friendUsername: PropTypes.any,
};

