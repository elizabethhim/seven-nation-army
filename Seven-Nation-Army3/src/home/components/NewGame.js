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
      title:'',
      passcode: '',
      adjudicationPeriod:'5',

    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };


  onSubmit = event => {
    const {title} = this.state;
    const {passcode} = this.state;
    const {adjudicationPeriod} = this.state;
    event.preventDefault();
    this.props.createSession(title, passcode, adjudicationPeriod);
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
                <Label style={labelStyle}>Game Title</Label>
                <Input 
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter game title"
                  value={this.state.title}
                  onChange={this.onChange}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label style={labelStyle}>Passcode</Label>
                <Input type="text"
                  type="text"
                  name="passcode"
                  id="passcode"
                  placeholder="Enter passcode "
                  value={this.state.passcode}
                  onChange={this.onChange}
                
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label style={labelStyle}>Adjudication Period</Label>
                <Input type="select"
                  id="adjudicationPeriod"
                  onChange={this.onChange}
                  value={this.state.adjudicationPeriod}
                
                >
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>30</option>
                    <option>60</option>
                    <option>120</option>
                </Input>
              </FormGroup>
              <Button color="primary" onClick={this.onSubmit}>Create New Game</Button>
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
  createSession: (title, passcode, adjudicationPeriod) => dispatch(createSession(title, passcode, adjudicationPeriod)),
});

export default connect(
  null,
  mapDispatchToProps
)(NewGame);
