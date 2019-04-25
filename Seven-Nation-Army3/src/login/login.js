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
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';

import '../styles/Login.scss';
import Video from '../common/components/Video';
import { login } from '../store/actions/authUser';

const labelStyle = { color: 'black' };
const warningText = { fontSize: '12px', color: 'red' };

class Login extends Component {
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
    this.props.login(this.state);
  };

  render() {
    const { email, password } = this.state;
    return (
      <Container className="LoginBody">
        <Video />
        <Col className="col-md-5 col-md-12 mt4">
          <Row>
            <Card body className="text-center titlecard">
              <CardBody>
                <h2 className="display-3">
                  <img
                    src={require('../media/images/title_SNA.png')}
                    alt="Seven-Nation-Army"
                  />
                </h2>
                <p style={labelStyle}>An Online Board Game Desktop App</p>
              </CardBody>
            </Card>
          </Row>
          <Row>
            <Card className="LoginCard">
              <CardBody>
                <CardTitle style={labelStyle} className="text-center">
                  Sign-in
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
                    <Button color="primary">Login</Button>
                    <Link to="/register">
                      <Button color="primary">Sign-up</Button>
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  authError: PropTypes.string,
  auth: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: creds => dispatch(login(creds)),
    push,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
