import React, { Component, Fragment } from 'react';
import Person from './Person';

export default class ChatList extends Component {
  render() {
    return (
      <Fragment>
        <Person
          name="Vincent Porter"
          isOnline
          status="online"
          source="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg"
        />
        <Person
          name="Aiden Chavez"
          isOnline={false}
          status="left 7 minutes ago"
          source="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg"
        />
        <Person
          name="Mike Thomas"
          isOnline
          status="online"
          source="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg"
        />
        <Person
          name="Erica Hughes"
          isOnline
          status="online"
          source="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg"
        />
        <Person
          name="Ginger John"
          isOnline
          status="online"
          source="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg"
        />
        <Person
          name="Tracy Carp"
          isOnline={false}
          status="left 30 mins ago"
          source="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_06.jpg"
        />
      </Fragment>
    );
  }
}
