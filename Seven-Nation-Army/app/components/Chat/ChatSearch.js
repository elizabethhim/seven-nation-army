import React, { Component } from 'react';
import { Input } from 'reactstrap';

export default class ChatSearch extends Component {
  render() {
    return (
      <Input type="search" name="search" id="chatSearch" placeholder="Search" />
    );
  }
}
