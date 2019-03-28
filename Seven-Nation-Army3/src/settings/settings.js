import React from 'react';
import {
  Button, Form, FormGroup, Label, Input, Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import "../styles/Setting.scss";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Container className=".settingsBody">

        <div className="fullscreen-bg">
          <video loop muted autoPlay poster={require("../media/images/BackgroundVidStill.png")} className="fullscreen-bg__video">
            <source src={require("../media/videos/OceanBackground.mp4")} type="video/mp4" />
            <source src={require("../media/videos/OceanBackground.ogv")} type="video/ogg" />
          </video>
        </div>
        <nav className="navbar navbar-expand-lg" >
          <NavbarBrand href="/">Seven Nation Army</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/settings.js">Settings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                  </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                    </DropdownItem>
                  <DropdownItem>
                    Option 2
                    </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                    </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>

        </nav>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Change Display Name</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="Name" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Change Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="Password " />
          </FormGroup>
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
          <h1>Preferences</h1>
          <FormGroup>
            <Label check>
              <Input type="radio" name="radio1" />{' '}
              Notify end of round.
            </Label>
          </FormGroup>
          <FormGroup  >
            <Label check>
              <Input type="radio" name="radio2" />{' '}
              Notify end of game.
            </Label>
          </FormGroup>
          <Button color='primary'>Save Settings</Button>
        </Form>
      </Container>
    );
  }
}