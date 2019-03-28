/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import { Button } from 'reactstrap';
import './Welcome.css';

export default class Welcome extends Component {
  render() {
    return (
        <div className="container">
          
          <img
            className="background resize_fit_center"
            src="../resources/images/main_menu_bg_w_title.png"
          />
    
          <NavLink to="/game" exact> 
          <div>
          <img
            className="screen_item resize_fit_center item"
            src="../resources/images/main_menu_new_game.png"
          />
        </div>
           </NavLink>
          
          <NavLink to="/settings" exact>
          <div>
          <img
            className="screen_item resize_fit_center item"
            style={{ top: '60%' }}
            src="../resources/images/main_menu_settings.png"
          />
          </div>
          </NavLink>
        </div>
      
      // <div>
      //   <NavLink to="/game" exact>
      //     <Button color="danger">New Game</Button>
      //     <Button color="primary">Continue</Button>
      //     <Button color="primary">Settings</Button>
      //     <Button color="primary">Exit</Button>
      //   </NavLink>
      // </div>
    );
  }
}
