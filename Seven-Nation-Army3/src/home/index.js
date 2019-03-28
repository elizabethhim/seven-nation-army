import React, { Component } from 'react';
import {
  Button, Form, FormGroup, Label, Input, Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import "../styles/style.scss";
import { NavLink } from 'react-router-dom';

class Home extends Component {
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

      <div>
        {/* <Container>
			<nav class ="navbar navbar-expand-lg" >
				<NavbarBrand href="/">Diplomacy</NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
				<Nav className="ml-auto" navbar>
					<NavItem>
					<NavLink href="/settings/settings.js" to = "/settings/setting.js">Settings</NavLink>
					</NavItem>
					<NavItem>
					<NavLink href="/settings/settings.j" to ="/settings/settings.j">Help</NavLink>
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
			</Container> */}
        <div className="fullscreen-bg">
          <video loop muted autoPlay poster={require("../media/images/BackgroundVidStill.png")} className="fullscreen-bg__video">
            <source src={require("../media/videos/OceanBackground.mp4")} type="video/mp4" />
            <source src={require("../media/videos/OceanBackground.ogv")} type="video/ogg" />
          </video>
        </div>
        <div>

          <NavLink to="/map" exact>
            <img
              className="screen_item resize_fit_center item"
              src={require("../media/images/main_menu_new_game.png")}
            />
          </NavLink>
          <img
            className="screen_item resize_fit_center item"
            style={{ top: '30%' }}
            src={require("../media/images/main_menu_continue.png")}
          />
          <img
            className="screen_item resize_fit_center item"
            style={{ top: '60%' }}
            src={require("../media/images/main_menu_settings.png")}
          />
        </div>

      </div>
    );
  }
}

export default Home;
