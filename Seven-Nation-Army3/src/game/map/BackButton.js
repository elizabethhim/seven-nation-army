import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from 'reactstrap';

export default class BackButton extends Component {
  render() {
    return (
      <Button>
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </Button>
    )
  }
}
