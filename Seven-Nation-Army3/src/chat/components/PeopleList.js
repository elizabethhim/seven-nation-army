import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { Button } from 'reactstrap';
import ChatSearch from './ChatSearch';
import ChatList from './ChatList';
import '../../styles/PeopleList.scss';
import toggleChat from '../actions/toggleChat';

class PeopleList extends Component {
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
      <div>
        <Button
          onClick={this.toggle}
          className="chat-button-center"
          active={!chatIsVisible}
        >
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
  chatIsVisible: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  chatIsVisible: state.chat.toggleReducer.chatIsVisible
});

export default connect(
  mapStateToProps,
  { toggleChat }
)(PeopleList);
