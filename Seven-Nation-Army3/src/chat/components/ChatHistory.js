import React, { Component } from 'react';
import '../../styles/Chat.scss';
import MessageList from './MessageList.jsx';
import SendMessage from './SendMessage.jsx';
import ChatHeader from './ChatHeader.js';

// TODO: Port Chat History from the Chat.html file to React
export default class ChatHistory extends Component {
  render() {
    return (
      <div className="chat">
        <ChatHeader 
          name = "Samantha"
          totalMessages = "100"/>
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
