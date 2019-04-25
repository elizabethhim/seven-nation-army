import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../styles/Setting.scss';
import Video from '../common/components/Video';
import { logout, save } from '../store/actions/authUser';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      password: '',
      displayName: '',
    };
  }

  onLogout = event => {
    event.preventDefault();
    console.log('Logout pressed!');
    console.log(this.state);
    console.log(this.props);
    // this.props.logout();
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.save(this.state);
  };

  onChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { password, displayName } = this.state;
    return (
      <Container className=".settingsBody">
        <Video />
        <nav className="navbar navbar-expand-lg">
          <NavbarBrand href="/#/home">Seven Nation Army</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/elizabethhim/Seven-Nation-Army">
                  GitHub
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <div onClick={this.onLogout}>Logout</div>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </nav>
        <Form onSubmit={this.onSubmit.bind(this)}>
          <FormGroup>
            <Label for="displayName">Change Display Name</Label>
            <Input
              type="text"
              name="text"
              id="displayName"
              placeholder={this.props.auth.displayName}
              value={displayName}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Change Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={this.onChange}
            />
          </FormGroup>
          {/* Why the heck is this option here anyways? It should be in New Game */}
          <FormGroup>
            <Label for="exampleSelect">Select Prefered Number of players</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
            </Input>
          </FormGroup>
          {/* Why the heck is this option here anyways? It should be in New Game */}
          <h1>Preferences</h1>
          {/* TODO(Christopher: Save inside collections */}
          <FormGroup>
            <Label check>
              <Input type="radio" name="radio1" /> Notify end of round.
            </Label>
          </FormGroup>
          <FormGroup>
            <Label check>
              <Input type="radio" name="radio2" /> Notify end of game.
            </Label>
          </FormGroup>
          {/* TODO(Christopher: Save inside collections */}
          <Button color="primary">Save Settings</Button>
        </Form>
      </Container>
    );
  }
}

Settings.propTypes = {
  logout: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
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
    logout: () => dispatch(logout()),
    save: state => dispatch(save(state)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
