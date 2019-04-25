import React, { Component, Fragment } from 'react';
import {
  Button,
  FormGroup,
  Label,
  Input,
  Card,
  CardTitle,
  Container,
  Row,
  Col,
  CardBody,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/Login.scss';
import Video from '../common/components/Video';
import { register } from '../store/actions/authUser';

const labelStyle = { color: 'black' };
const warningText = { fontSize: '12px', color: 'red' };

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.register(this.state);
  };

  render() {
    const { email, password } = this.state;
    return (
      <Container className="LoginBody">
        <Video />
        <Col className="col-md-5 col-md-12 mt4">
          <Row>
            <Card className="LoginCard">
              <CardBody>
                <CardTitle style={labelStyle} className="text-center">
                  Register a new account
                </CardTitle>
                <form onSubmit={this.onSubmit.bind(this)}>
                  <hr className="my-2" />
                  <FormGroup>
                    <Label style={labelStyle} for="email">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.onChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label style={labelStyle} for="password">
                      Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="******"
                      value={password}
                      onChange={this.onChange}
                    />
                  </FormGroup>

                  {this.props.authError ? (
                    <p style={warningText}>{this.props.authError}</p>
                  ) : (
                    <Fragment />
                  )}

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Button color="primary">Submit</Button>
                    <Link to="/Login">
                      <Button color="primary">Cancel</Button>
                    </Link>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Row>
        </Col>
      </Container>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  authError: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: user => dispatch(register(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
