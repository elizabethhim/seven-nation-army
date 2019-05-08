import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Label, Button, Input, Card, CardBody, CardTitle } from 'reactstrap';
import PropTypes from 'prop-types';

import { joinSession } from '../../store/actions/getSession';

const labelStyle = { color: 'black' };
const warningText = { fontSize: '12px', color: 'red' };

class JoinModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomID: '-Ld_bcgkJ0hKGr_iu32T',
      roomCode: 'abc123',
    };
    this.onJoin = this.onJoin.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  onJoin = event => {
    const { roomID, roomCode } = this.state;
    event.preventDefault();
    this.props.joinSession(roomID, roomCode);
  }

  onCancel = event => {
    event.preventDefault();
    this.props.toggleModal(false, '');
  }

  render() {
    const { roomCode } = this.state;
    const { sessionError } = this.props;
    return (
      <Fragment>
        <Card className="LoginCard">
          <CardBody>
            <CardTitle style={labelStyle} className="text-center">
              Join Room
            </CardTitle>
            <Form>
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

              {sessionError && (
                <p style={warningText}>{sessionError.message}</p>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  flexWrap: 'wrap',
                }}
              >
                <Button color="primary" onClick={this.onJoin}>Join Game</Button>
                <Button color="primary" onClick={this.onCancel}>Cancel</Button>
              </div>
            </Form>
          </CardBody>
        </Card >
      </Fragment>
    );
  }
}

JoinModal.propTypes = {
  sessionError: PropTypes.string,
  joinSession: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sessionError: state.session.sessionError,
});

const mapDispatchToProps = dispatch => ({
  joinSession: (roomID, roomCode) => dispatch(joinSession(roomID, roomCode)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinModal);
