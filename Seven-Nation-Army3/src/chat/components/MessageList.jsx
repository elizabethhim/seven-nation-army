import React from "react";
import { connect } from 'react-redux';
import '../../styles/Chat.scss';


const mapStateToProps = state => {
    return { messages: state.messages };
};

const ConnectedList = ({ messages }) => (
    <ul>
        {messages && messages.map(el => (
            <li key={el.id}>
                {el.message}
            </li>
        ))}
    </ul>
);

const MessageList = connect(mapStateToProps)(ConnectedList);
  
export default MessageList;

