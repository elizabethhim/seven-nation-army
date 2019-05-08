import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';

import { getSessions } from '../../store/actions/getSession';

class GameList extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick = () => {
    for (let property in this.props.sessions) {
      console.log(this.props.sessions[property]);
    }
    // TODO(Danny): Get row ID and insert into second parameter of this function.
    this.props.toggleModal(true, '');
  }

  componentDidMount = () => {
    this.props.getSessions();
  }

  render() {
    const { sessions } = this.props;
    console.log(sessions);
    let list = [];
    for (let gameID in sessions) {
      if (sessions[gameID].hasOwnProperty('participatingUserIDs')) {
        list.push(
          <tr>
            <td>{sessions[gameID].title}</td>
            <td>Anonymous</td>
            <td>{`${Object.keys(sessions[gameID].participatingUserIDs).length} / 7`}</td>
            <td><Button onClick={this.onClick}>Join</Button></td>
          </tr>
        );
      }
    }
    return (
      <Fragment>
        <Table style={{ backgroundColor: "#ffffff", borderRadius: "10px", color: "#000000" }}>
          <thead>
            <tr>
              <th>Room Name</th>
              <th>Created by</th>
              <th>Players</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

GameList.propTypes = {
  toggleModal: PropTypes.func,
  getSessions: PropTypes.func.isRequired,
  sessions: PropTypes.object,
};

const mapStateToProps = state => ({
  sessions: state.session.sessions,
});

const mapDispatchToProps = dispatch => ({
  getSessions: () => dispatch(getSessions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameList);