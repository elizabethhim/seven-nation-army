import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Chat.scss';

export default class ChatHeader extends Component {
    render() {
        const { name, totalMessages} = this.props;

        return (
            <div className="chat-header clearfix">
                {/* <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
                    alt="avatar"
                /> */}
                <div className="chat-about">
                    <div className="chat-with">Chat with {name}</div>
                    <div className="chat-num-messages">already {totalMessages} messages</div>
                </div>
                <i className="fa fa-star" />
        </div>
        );

    }

}

ChatHeader.propTypes = {
    name: PropTypes.string.isRequired,
    totalMessages: PropTypes.string.isRequired,
  };

