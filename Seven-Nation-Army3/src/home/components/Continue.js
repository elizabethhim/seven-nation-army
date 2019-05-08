import React, { Component } from 'react';
import { Container, NavbarBrand, NavbarToggler, Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import Video from '../../common/components/Video';
import Gamelist from './GameList';
import JoinModal from './JoinModal';

export default class Continue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      gameID: '',
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.getRoomID = this.getRoomID.bind(this);
  }

  toggleModal = (showModal, gameID) => {
    this.setState({
      showModal,
      gameID,
    })
  }

  getRoomID = () => {
    return this.state.gameID;
  }

  render() {
    const { showModal } = this.state;
    return (
      <Container className=".settingsBody">
        <Video />
        <Nav className="navbar navbar-expand-lg">
          <NavbarBrand href="/#/home">Seven Nation Army</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
        </Nav>
        {showModal ? <JoinModal getRoomID={this.getRoomID} toggleModal={this.toggleModal} /> : <Gamelist toggleModal={this.toggleModal} />}
      </Container>
    );
  }
}

Continue.propTypes = {
  toggleModal: PropTypes.func,
};