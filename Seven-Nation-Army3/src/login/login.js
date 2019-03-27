import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Card, CardTitle, Container, Row, Col, CardBody, Jumbotron } from 'reactstrap';
import "../styles/Login.css";


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
        <Container className=".LoginBody">
   
        

        <Col className="col-md-5 col-md-12">
    
        <Card body className="text-center">
        <h1 className="display-3">Seven Nation Army</h1>
        <p className="lead">The Diplomacy Board Game Desktop App</p>
        </Card>

        <Card className="LoginCard" >
        <CardBody>
        <form onSubmit={this.handleSubmit}>
        <CardTitle className="text-center">Sign-in</CardTitle>
        <hr className="my-2" />
            <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
        </FormGroup>
        <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="******" />
        </FormGroup>
        <Button color="primary">Submit</Button>
        </form>
        </CardBody>
        
        </Card>
        </Col>
      </Container>
    );
  }
}



