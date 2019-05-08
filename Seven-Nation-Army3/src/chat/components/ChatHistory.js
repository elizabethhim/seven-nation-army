import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import '../../styles/Chat.scss';
import MessageList from './MessageList.jsx';
import SendMessage from './SendMessage.jsx';
import ChatHeader from './ChatHeader.js';

// TODO: Port Chat History from the Chat.html file to React
class ChatHistory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friendUsername: " "
    };
    this.firebase = getFirebase();
    this.updateFriendUsername = this.updateFriendUsername.bind(this);
  }

  updateFriendUsername(props) {
    const friendRef = this.firebase.database().ref('root/sessions/-LdLRGh4fGk1rD5Zd_Np/players/' + props.friendID);
    friendRef.once("value").then(res => {
      if (res) {
        console.log(res.val().username);
        this.setState({ friendUsername: res.val().username })
      }
    });
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    if (this.props.roomID !== nextProps.roomID) {
      this.updateFriendUsername(nextProps);
    }
  }

  render() {
    const roomID = this.props.roomID;
    const friendID = this.props.friendID;
    console.log(this.state.friendUsername);

    return (
      <div className="chat">
        <ChatHeader
          name={this.state.friendUsername}
          totalMessages="100" />
        {/* <!-- end chat-header --> */}

        <div className="chat-history">
          <MessageList 
            roomID={roomID}
            friendID={friendID}
            friendUsername={this.state.friendUsername}
          />
        </div>
        {/* <!-- end chat-history --> */}

        <SendMessage 
          roomID={roomID}
          friendID={friendID}
          friendUsername={this.state.friendUsername}
        />
        {/* <!-- end chat-message --> */}
      </div>
    );
  }
}

ChatHistory.propTypes = {
  roomID: PropTypes.any,
  friendID: PropTypes.any,
};

const mapStateToProps = state => ({
  // console.log(state);
  roomID: state.chatRoom.roomID,
  friendID: state.chatRoom.friendID,
});

export default connect(mapStateToProps)(ChatHistory);
