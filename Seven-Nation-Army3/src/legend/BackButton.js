import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from 'reactstrap';
import '../styles/BackButton.scss';
import { leaveSession } from '../store/actions/getSession';

class BackButton extends Component {
  render() {
    const { leaveSession } = this.props;
    return (
      <Button className="back-button" onClick={leaveSession}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
    );
  }
}

BackButton.propTypes = {
  leaveSession: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  leaveSession: () => dispatch(leaveSession()),
});

export default connect(null, mapDispatchToProps)(BackButton)