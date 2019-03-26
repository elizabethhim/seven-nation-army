/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Button} from 'reactstrap';

export default class Welcome extends Component {

  render() {
    return (
      // <div className="container">
      //   <img
      //     className="resize_fit_center background"
      //     src="images/main_menu_bg_w_title.png"
      //   />
      //   <img
      //     className="item resize_fit_center screen_item"
      //     src="images/main_menu_new_game.png"
      //   />
      //   <img
      //     className="item resize_fit_center screen_item"
      //     style={{ top: '30%' }}
      //     src="images/main_menu_continue.png"
      //   />
      //   <img
      //     className="item resize_fit_center screen_item"
      //     style={{ top: '60%' }}
      //     src="images/main_menu_settings.png"
      //   />
      // </div>
      <div>
      <NavLink to="/game" exact={true}>
              <Button color="primary">New Game</Button>
              <Button color="primary">Continue</Button>
              <Button color="primary">Settings</Button>
              <Button color="primary">Exit</Button>
            </NavLink>
      </div>


    );
  }
}
