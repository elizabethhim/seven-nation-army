import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Chat.scss';

export default class ChatMessage extends Component {
  render() {
    const { myMessage, time, name, message } = this.props;

    return (
      <Fragment>
        {myMessage ? (
          <li className="clearfix">
            <div className="message-data align-right">
              <span className="message-data-time">{time}</span> &nbsp; &nbsp;
              <span className="message-data-name">{name}</span>
              <i className="fa fa-circle me" />
            </div>
            <div className="message other-message float-right">{message}</div>
          </li>
        ) : (
          <li className="clearfix">
            <div className="message-data">
              <span className="message-data-name">
                <i className="fa fa-circle online" />
                {name}
              </span>
              <span className="message-data-time">{time}</span>
            </div>
            <div className="message my-message">{message}</div>
          </li>
        )}
      </Fragment>
    );
  }
}

ChatMessage.propTypes = {
  myMessage: PropTypes.bool.isRequired,
  time: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
