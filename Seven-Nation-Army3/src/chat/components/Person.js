import React, { Component } from 'react';
import { connect } from "react-redux";
// import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

// import { faCircle } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import '../../styles/Person.scss';
import '../../styles/Chat.scss';
import openChatRoom from "../../store/actions/openChatRoom";

class Person extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    event.preventDefault();
    this.props.openChatRoom(this.props.id);
  }
  render() {
    const { name, isOnline, status } = this.props;
    return (
      <li className="clearfix">
        <div className="about" onClick={this.handleClick}>
          <div className="name">{name}</div>
          <div className="status">
            {/* <FontAwesomeIcon
              icon={faCircle}
              className={isOnline ? 'person-online' : 'person-offline'}
            /> */}
            <i className={`fa fa-circle ${isOnline ? 'online' : 'offline'}`} />
            {status}
          </div>
        </div>
      </li>
    );
  }
}

Person.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isOnline: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  // source: PropTypes.string.isRequired,
  openChatRoom: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  openChatRoom: friendID => dispatch(openChatRoom(friendID))
})

export default connect(null, mapDispatchToProps)(Person);
