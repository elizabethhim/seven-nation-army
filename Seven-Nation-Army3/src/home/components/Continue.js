import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, NavbarBrand, NavbarToggler, Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import Video from '../../common/components/Video';
import { getSessions } from '../../store/actions/getSession';

class Continue extends Component {
  componentDidMount() {
    this.props.getSessions();
  }

  render() {
    console.log('Sessions', this.props.sessions);
    return (
      <Container className=".settingsBody">
        <Video />
        <Nav className="navbar navbar-expand-lg">
          <NavbarBrand href="/#/home">Seven Nation Army</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
        </Nav>
      </Container>
    );
  }
}

Continue.propTypes = {
  sessions: PropTypes.object,
  getSessions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sessions: state.sessionList.sessions,
});

const mapDispatchToProps = dispatch => ({
  getSessions: () => dispatch(getSessions()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Continue);
