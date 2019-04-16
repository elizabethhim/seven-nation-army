import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';

import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../styles/ChatContainer.scss';
import PeopleList from './PeopleList';
import ChatHistory from './ChatHistory';
/* import toggleChat from '../actions/toggleChat'; */

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatIsVisible: false,
    };
    this.toggleChat = this.toggleChat.bind(this);
  }

  toggleChat() {
    this.setState({
      chatIsVisible: !this.state.chatIsVisible,
    });
  }

  render() {
    const { chatIsVisible } = this.state;
    return (
      <Fragment>
        {chatIsVisible ? (
          <div className="chat-container">
            <PeopleList className="people-list" toggleChat={this.toggleChat} />
            <ChatHistory />
          </div>
        ) : (
          <Button className="chat-container-button" onClick={this.toggleChat}>
            <FontAwesomeIcon icon={faAngleUp} className="maximize-icon" />
            <span className="chat-container-button-text">Chat</span>
          </Button>
        )}
      </Fragment>
    );
  }
}
