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

  onClick = event => {
    console.log(event.target.id);
    this.props.toggleModal(true, event.target.id);
  }

  componentDidMount = () => {
    this.props.getSessions();
  }

  render() {
    const { sessions } = this.props;
    let list = [];
    for (let gameID in sessions) {
      if (sessions[gameID].hasOwnProperty('participatingUserIDs')) {
        list.push(
          <tr key={gameID}>
            <td>{sessions[gameID].title}</td>
            <td>Anonymous</td>
            <td>{`${Object.keys(sessions[gameID].participatingUserIDs).length} / 7`}</td>
            <td><Button id={gameID} onClick={this.onClick}>Join</Button></td>
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