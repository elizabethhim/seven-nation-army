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
  Card,
  CardBody,
  CardTitle
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../styles/Setting.scss';
import Video from '../common/components/Video';
import { logout, save, changePassword } from '../store/actions/authUser';

const labelStyle = { color: 'black' };
const checkStyle = { color: 'black', fontSize: '12px' };

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      password: '',
      displayName: '',
    };
  }

  onLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  onSubmit = event => {
    const { displayName, password } = this.state;
    event.preventDefault();
    if (displayName !== '') {
      this.props.save(displayName);
    }
    if (password !== '') {
      this.props.changePassword(password);
    }
  };

  onChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { password, displayName } = this.state;
    return (
      <Container className=".settingsBody">
        <Video />
        <Nav className="navbar navbar-expand-lg">
          <NavbarBrand href="/#/home">Seven Nation Army</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
             <NavItem>
               <NavLink href={"/#/help"}>
                    Help
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/elizabethhim/Seven-Nation-Army">
                  GitHub
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <div onClick={this.onLogout.bind(this)}>Logout</div>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Nav>
        <Card className="LoginCard">
          <CardBody>
            <Form onSubmit={this.onSubmit.bind(this)}>
              <FormGroup>
                <Label style={labelStyle} for="displayName">Change Display Name</Label>
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
                <Label style={labelStyle} for="password">Change Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                  value={password}
                  onChange={this.onChange}
                />
              </FormGroup>
              <legend style={labelStyle}>Preferences</legend>
              {/* TODO(Christopher): Save inside collections */}
              <div style={{padding: '10px 0px', marginBottom: '10px'}}>
                <FormGroup check>
                  <Label style={checkStyle} check>
                    <Input type="checkbox" name="checkbox1" /> Notify end of round.
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label style={checkStyle} check>
                    <Input type="checkbox" name="checkbox2" /> Notify end of game.
                  </Label>
                </FormGroup>
              </div>
              {/* TODO(Christopher): Save inside collections */}
              <Button color="primary">Save Settings</Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

Settings.propTypes = {
  logout: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
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
    save: displayName => dispatch(save(displayName)),
    changePassword: password => dispatch(changePassword(password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
