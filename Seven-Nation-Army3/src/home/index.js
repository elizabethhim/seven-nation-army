import React, { Component } from 'react';
/* import {
	Button, Form, FormGroup, Label, Input, Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav,
	NavItem,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap'; */
import '../styles/style.scss';
import { NavLink } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        {/* <Container>
			<nav class ='navbar navbar-expand-lg' >
				<NavbarBrand href='/'>Diplomacy</NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
				<Nav className='ml-auto' navbar>
					<NavItem>
					<NavLink href='/settings/settings.js' to = '/settings/setting.js'>Settings</NavLink>
					</NavItem>
					<NavItem>
					<NavLink href='/settings/settings.j' to ='/settings/settings.j'>Help</NavLink>
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
          <video
            loop
            muted
            autoPlay
            poster={require('../media/images/BackgroundVidStill.png')}
            className="fullscreen-bg__video"
          >
            <source
              src={require('../media/videos/OceanBackground.mp4')}
              type="video/mp4"
            />
            <source
              src={require('../media/videos/OceanBackground.ogv')}
              type="video/ogg"
            />
          </video>
        </div>

        <div>
          <img
            className="screen_item title"
            style={{ width: '75vh', top: '10%' }}
            src={require('../media/images/title_SNA.png')}
            alt="title-card"
          />
          <center
            className="screen_item title"
            style={{ color: 'black', top: '32%' }}
          >
            An Online Board Game Desktop App
          </center>
        </div>

        <div className="spacer">
          <NavLink to="/game" exact>
            <img
              className="screen_item resize_fit_center item"
              style={{ width: '50vh' }}
              src={require('../media/images/main_menu_new_game.png')}
              alt="new-game-card"
            />
          </NavLink>
          <img
            className="screen_item resize_fit_center item"
            style={{ top: '24%', width: '50vh' }}
            src={require('../media/images/main_menu_continue.png')}
            alt="continue-game-card"
          />
          <NavLink to="/settings" exact>
            <img
              className="screen_item resize_fit_center item"
              style={{ top: '48%', width: '50vh' }}
              src={require('../media/images/main_menu_settings.png')}
              alt="settings-card"
            />
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Home;
