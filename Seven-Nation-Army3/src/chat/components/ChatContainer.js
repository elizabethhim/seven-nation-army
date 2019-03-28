import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../styles/ChatContainer.scss';
import PeopleList from './PeopleList';
import ChatHistory from './ChatHistory';
import toggleChat from '../actions/toggleChat';

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.toggleChat();
  }

  render() {
    const { chatIsVisible } = this.props;
    return (
      <Fragment>
        {!chatIsVisible && (
          <Button
            onClick={this.toggle}
            className="chat-container-button"
            active={chatIsVisible}
          >
            <FontAwesomeIcon icon={faAngleUp} className="maximize-icon" />
            <span className="chat-container-button-text">Chat</span>
          </Button>
        )}
        {chatIsVisible && (
          <div className="chat-container">
            <PeopleList className="people-list" />
            <ChatHistory />
          </div>
        )}
      </Fragment>
    );
  }
}

ChatContainer.propTypes = {
  toggleChat: PropTypes.func.isRequired,
  chatIsVisible: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  chatIsVisible: state.chat.toggleReducer.chatIsVisible
});

export default connect(
  mapStateToProps,
  { toggleChat }
)(ChatContainer);

