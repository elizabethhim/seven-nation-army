import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from 'reactstrap';
import '../styles/BackButton.scss';

export default class BackButton extends Component {
  render() {
    return (
      <NavLink to="/home">
        <Button className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
      </NavLink>
    );
  }
}
