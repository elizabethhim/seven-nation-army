import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { Button } from 'reactstrap';
import ChatSearch from './ChatSearch';
import ChatList from './ChatList';
// import '../../styles/PeopleList.scss';
import '../../styles/Chat.scss'
/* import toggleChat from '../actions/toggleChat'; */

export default class PeopleList extends Component {
  render() {
    const { toggleChat } = this.props;
    return (
      <div className = "people-list">
        <Button onClick={toggleChat} className="chat-button-center">
          <FontAwesomeIcon icon={faAngleDown} className="minimize" />
        </Button>
        <ChatSearch className="search" />
        <ChatList />
      </div>
    );
  }
}

PeopleList.propTypes = {
  toggleChat: PropTypes.func.isRequired,
};
