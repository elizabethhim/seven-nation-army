import React, { Component, Fragment } from 'react';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';

export default class GameList extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick = () => {
    // TODO(Danny): Get row ID and insert into second parameter of this function.
    this.props.toggleModal(true, '');
  }

  render() {
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
            <tr>
              <td>The White Stripes</td>
              <td>Otto</td>
              <td>2/7</td>
              <td><Button onClick={this.onClick}>Join</Button></td>
            </tr>
            <tr>
              <td>The Alliance</td>
              <td>Thornton</td>
              <td>7/7</td>
              <td><Button onClick={this.onClick}>Join</Button></td>
            </tr>
            <tr>
              <td>World War Z</td>
              <td>the Bird</td>
              <td>3/7</td>
              <td><Button onClick={this.onClick}>Join</Button></td>
            </tr>
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

GameList.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
