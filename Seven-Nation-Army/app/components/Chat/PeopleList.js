import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import ChatSearch from './ChatSearch';
import ChatList from './ChatList';
import style from './PeopleList.css';
import toggleChat from '../../actions/togglechat';

type Props = {
  toggleChat: () => void,
  chatIsVisible: boolean
};

class PeopleList extends Component<Props> {
  props: Props;

  toggle = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.toggleChat();
  };

  render() {
    const { chatIsVisible } = this.props;
    return (
      <div>
        <Button
          onClick={this.toggle}
          className={style.chat_button_center}
          active={!chatIsVisible}
        >
          <FontAwesomeIcon icon={faAngleDown} className={style.minimize} />
        </Button>
        <ChatSearch className={style.search} />
        <ChatList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chatIsVisible: state.toggleReducer.chatIsVisible
});

export default connect(
  mapStateToProps,
  { toggleChat }
)(PeopleList);
