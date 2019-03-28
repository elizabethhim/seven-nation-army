import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './ChatContainer.css';
import PeopleList from './Chat/PeopleList';
import Chat from './Chat/Chat';
import toggleChat from '../actions/togglechat';

type Props = {
  toggleChat: () => void,
  chatIsVisible: boolean
};

class ChatContainer extends Component<Props> {
  props: Props;

  toggle = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.toggleChat();
  };

  render() {
    const { chatIsVisible } = this.props;
    return (
      <Fragment>
        {!chatIsVisible && (
          <Button
            onClick={this.toggle}
            className={style.button}
            active={chatIsVisible}
          >
            <FontAwesomeIcon icon={faAngleUp} />
            Chat
          </Button>
        )}
        {chatIsVisible && (
          <div className={style.container}>
            <PeopleList className={style.list} />
            <Chat />
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  chatIsVisible: state.toggleReducer.chatIsVisible
});

export default connect(
  mapStateToProps,
  { toggleChat }
)(ChatContainer);
