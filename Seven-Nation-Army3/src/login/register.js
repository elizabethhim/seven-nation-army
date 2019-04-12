import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Card,
  CardTitle,
  Container,
  Row,
  Col,
  CardBody,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/Login.scss';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <Container className=".LoginBody">
        <Col className="col-md-5 col-md-12 mt4">
          <Row>
            <Card className="LoginCard">
              <CardBody>
                <CardTitle className="text-center">
                  Register a new account
                </CardTitle>
                <form onSubmit={this.handleSubmit}>
                  <hr className="my-2" />
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="Email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="******"
                    />
                  </FormGroup>
                  <Link to="/Login">
                    <Button color="primary">Submit</Button>
                  </Link>{' '}
                  <Link to="/Login">
                    <Button color="primary">Cancel</Button>
                  </Link>
                </form>
              </CardBody>
            </Card>
          </Row>
        </Col>
      </Container>
    );
  }
}
