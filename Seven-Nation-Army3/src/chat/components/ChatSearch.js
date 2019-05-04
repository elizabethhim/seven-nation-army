import React, { Component } from 'react';
import { Input } from 'reactstrap';
// import '../../styles/ChatSearch.scss';
import '../../styles/Chat.scss';

export default class ChatSearch extends Component {
  render() {
    return (
      // <Input
      //   type="search"
      //   name="search"
      //   id="chatSearch"
      //   placeholder="Search"
      //   className="search"
      // />

      <div class="search">
      <input type="text" placeholder="search" />
      <i class="fa fa-search"></i>
    </div>
    );
  }
}
