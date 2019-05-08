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
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../../styles/Setting.scss';
import '../../styles/Login.scss';
import Video from '../../common/components/Video';
import { createSession } from '../../store/actions/getSession';

const labelStyle = { color: 'black' };

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
        <Card className="LoginCard">
          <CardBody>
            <CardTitle style={labelStyle} className="text-center">New Game</CardTitle>
            <hr className="my-2" />
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label style={labelStyle}>Game Name</Label>
                <Input type="text"></Input>
              </FormGroup>
              <FormGroup>
                <Label style={labelStyle} for="exampleSelect">Prefered # of Players</Label>
                <Input type="select" name="select" id="exampleSelect">
                  {players.map(i => (
                    <option key={i}>{i}</option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label style={labelStyle}>Adjudication Period</Label>
                <Input type="select">
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>30</option>
                    <option>60</option>
                    <option>120</option>
                </Input>
              </FormGroup>
              <Button color="primary">Create New Game</Button>
            </Form>
          </CardBody>
        </Card>
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
