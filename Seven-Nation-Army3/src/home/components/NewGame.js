import React, { Component } from 'react';
import {
  FormGroup,
  Label,
  Input,
  Container,
  NavbarBrand,
  NavbarToggler,
  Button,
  Form,
  NavLink,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Video from '../../common/components/Video';
import { createSession } from '../../store/actions/getSession';

export class NewGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [...Array(7).keys()].map(x => x + 1),
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = () => {
    this.props.createSession();
  };

  render() {
    const { players } = this.state;
    return (
      <Container className=".settingsBody">
        <Video />
        <nav className="navbar navbar-expand-lg">
          <NavbarBrand href="/#/home">Seven Nation Army</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
        </nav>
        <FormGroup>
          <Label for="exampleSelect">Select Prefered Number of players</Label>
          <Input type="select" name="select" id="exampleSelect">
            {players.map(i => (
              <option key={i}>{i}</option>
            ))}
          </Input>
        </FormGroup>
        {/*TODO: Implement creation of new game session */}
        <Form onSubmit={this.onSubmit}>
          <Button color="primary">Create New Game</Button>
        </Form>
      </Container>
    );
  }
}

NewGame.propTypes = {
  createSession: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createSession: () => dispatch(createSession()),
});

export default connect(
  null,
  mapDispatchToProps
)(NewGame);
