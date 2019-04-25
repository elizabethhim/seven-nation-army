import React, { Component } from 'react';
import '../../styles/Chat.scss';
import MessageList from './MessageList.jsx';
import SendMessage from './SendMessage.jsx';

// TODO: Port Chat History from the Chat.html file to React
export default class ChatHistory extends Component {
  render() {
    return (
      <div className="chat">
        <div className="chat-header clearfix">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
            alt="avatar"
          />

          <div className="chat-about">
            <div className="chat-with">Chat with Vincent Porter</div>
            <div className="chat-num-messages">already 50 messages</div>
          </div>
          <i className="fa fa-star" />
        </div>
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
