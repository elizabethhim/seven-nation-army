import React from 'react';
import { connect } from 'react-redux';
import '../../styles/Chat.scss';
import ChatMessage from './ChatMessage';

const mapStateToProps = state => {
  console.log(state);
  return { messages: state.chatHistory.addMessageReducer.messages };
};

const ConnectedList = ({ messages }) => {
  return (
    messages &&
    messages.map(el => (
      <ChatMessage
        key={el.id}
        myMessage={true}
        time={'10:10 AM, Today'}
        name={'Olia'}
        message={el.message}
      />
    ))
  );
};

const MessageList = connect(mapStateToProps)(ConnectedList);

export default MessageList;
