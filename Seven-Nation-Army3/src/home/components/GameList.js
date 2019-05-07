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
              <th>Last Name</th>
              <th>Username</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td><Button onClick={this.onClick}>Click me</Button></td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td><Button onClick={this.onClick}>Click me</Button></td>
            </tr>
            <tr>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td><Button onClick={this.onClick}>Click me</Button></td>
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
