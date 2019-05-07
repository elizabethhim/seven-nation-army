import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container, NavbarBrand, NavbarToggler, Nav, Form, FormGroup, Label, Button, Input, Card, CardBody, CardTitle } from 'reactstrap';
import PropTypes from 'prop-types';

import Video from '../../common/components/Video';
import { joinSession } from '../../store/actions/getSession';

const labelStyle = { color: 'black' };
const warningText = { fontSize: '12px', color: 'red' };

class Continue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomCode: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.joinSession(this.state.roomCode);
  };

  render() {
    const { roomCode } = this.state;
    return (
      <Container className=".settingsBody">
        <Video />
        <Nav className="navbar navbar-expand-lg">
          <NavbarBrand href="/#/home">Seven Nation Army</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
        </Nav>
        <Card className="LoginCard">
          <CardBody>
            <CardTitle style={labelStyle} className="text-center">
              Join Room
            </CardTitle>
            <Form onSubmit={this.onSubmit.bind(this)}>
              <hr className="my-2" />
              <FormGroup>
                <Label style={labelStyle} for="roomCode">
                  Room Code
                </Label>
                <Input
                  type="text"
                  name="roomCode"
                  id="roomCode"
                  placeholder="Enter room code here"
                  value={roomCode}
                  onChange={this.onChange}
                />
              </FormGroup>

              {this.props.sessionError ? (
                <p style={warningText}>{this.props.sessionError}</p>
              ) : (
                  <Fragment />
                )}
              <Button color="primary">Join Game</Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

Continue.propTypes = {
  sessionError: PropTypes.string,
  joinSession: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sessionError: state.session.sessionError,
});

const mapDispatchToProps = dispatch => ({
  joinSession: roomCode => dispatch(joinSession(roomCode)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Continue);
