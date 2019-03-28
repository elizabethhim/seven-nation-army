import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../styles/BackButton.scss';

export default class BackButton extends Component {
  render() {
    return (
      <NavLink to="/">
        <Button className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
      </NavLink >
    )
  }
}
