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
      friendName: " "
    };
    this.firebase = getFirebase();
    this.updateFriendUsername = this.updateFriendUsername.bind(this);
  }

  updateFriendUsername(props) {
    if (props.roomData) {
      console.log('hi');
      const friendRef = this.firebase.database().ref('root/sessions/-LdLRGh4fGk1rD5Zd_Np/players/' + props.roomData.friendID);
      friendRef.once("value").then(res => {
        if (res) {
          this.setState({ friendName: res.val().username })
        }
      });
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    if (this.props.roomData !== nextProps.roomData) {
      this.updateFriendUsername(nextProps);
    }
  }

  render() {

    return (
      <div className="chat">
        <ChatHeader
          name={this.state.friendName}
          totalMessages="100" />
        {/* <!-- end chat-header --> */}

        <div className="chat-history">
          <MessageList />
        </div>
        {/* <!-- end chat-history --> */}

        <SendMessage />
        {/* <!-- end chat-message --> */}
      </div>
    );
  }
}

ChatHistory.propTypes = {
  roomData: PropTypes.any,
};

const mapStateToProps = state => ({
  // console.log(state);
  roomData: state.chatRoom.roomData
});

export default connect(mapStateToProps)(ChatHistory);
