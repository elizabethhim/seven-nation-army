import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import PropTypes from 'prop-types';
import addMessage from "../../store/actions/addMessage";
import '../../styles/Chat.scss';
import { getFirebase } from 'react-redux-firebase';

// import ChatMessage from './ChatMessage';

class ConnectedForm extends Component {
  constructor() {
    super();

    this.state = {
      message: ""
    };
    this.firebase = getFirebase();
    this.userID = null;
    this.username = "";
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  getUserInfo() {
    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userID = user.uid;
        this.username = user.displayName;
      }
      else {
        console.log("Something went wrong... User is not signed in");
      }
    });
  }

  componentDidMount() {
    this.getUserInfo();
  }

  handleChange = event => {
    this.setState({
      [event.target.id]:
        event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    // const messageID = uuidv1();
    const senderID = this.userID;
    const senderName = this.username;
    const roomID = this.props.roomID;
    const d = new Date();
    const time = d.getHours() + ':' + d.getMinutes() + ', ' + d.getMonth() + "/" + d.getDay() + "/" + d.getFullYear();
    const message = this.state.message;
    this.props.addMessage({ senderID, senderName, time, message, roomID });
    this.setState({ message: "" });
  }

  render() {
    const { message } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="chat-message clearfix">
        <input
          type="text"
          id="message"
          value={message}
          onChange={this.handleChange}
          className="message-to-send"
          placeholder="Type your message..."
          rows="2"
        />
        <i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
        <i className="fa fa-file-image-o" />
        <button type="submit">Send</button>
      </form>
    );
  }
}

ConnectedForm.propTypes = {
  addMessage: PropTypes.func.isRequired,
  roomID: PropTypes.any,
  friendID: PropTypes.any,
  friendUsername: PropTypes.any,
};

const mapDispatchToProps = dispatch => ({
  addMessage: chatMessage => dispatch(addMessage(chatMessage))
})

export default connect(null, mapDispatchToProps)(ConnectedForm);
