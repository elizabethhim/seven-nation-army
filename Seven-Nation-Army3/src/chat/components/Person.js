import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import '../../styles/Person.scss';
import '../../styles/Chat.scss';

export default class Person extends Component {
  render() {
    const { name, isOnline, status} = this.props;
    return (
      <li className="clearfix">
        {/* <img src={source} alt="avatar" className="person-img" /> */}
        <div className="about">
          <div className="name">{name}</div>
          <div className="status">
            {/* <FontAwesomeIcon
              icon={faCircle}
              className={isOnline ? 'person-online' : 'person-offline'}
            /> */}
            <i class="fa fa-circle online"></i>
            {status}
          </div>
        </div>
      </li>
    );
  }
}

Person.propTypes = {
  name: PropTypes.string.isRequired,
  isOnline: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  // source: PropTypes.string.isRequired,
};
