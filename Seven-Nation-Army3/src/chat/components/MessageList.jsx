import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../styles/Chat.scss';
import ChatMessage from './ChatMessage';

// const ConnectedList = ({ messages }) => {
//   return (
//     messages &&
//     messages.map(el => (
//       <ChatMessage
//         key={el.messageID}
//         myMessage={true}
//         time={el.time}
//         name={el.senderName}
//         message={el.message}
//       />
//     ))
//   );
// };

class ConnectedList extends Component {
  render() {
    return (
      this.props.messages &&
      this.props.messages.map(el => (
        <ChatMessage
          key={el.messageID}
          myMessage={true}
          time={el.time}
          name={el.senderName}
          message={el.message}
        />
      ))
    );
  }
}

const mapStateToProps = state => ({
  // console.log(state);
  messages: state.chatHistory.messages
});

export default connect(mapStateToProps)(ConnectedList);
