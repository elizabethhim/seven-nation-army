import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import addMessage from "../actions/addMessage";
import '../../styles/Chat.scss';
import ChatMessage from './ChatMessage';

function mapDispatchToProps(dispatch) {
    return {
      addMessage: chatMessage => dispatch(addMessage(chatMessage))
    };
}

class ConnectedForm extends Component {
    constructor() {
        super();

        this.state = {
            message: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.id]:               
        [event.target.value] });
    }

    handleSubmit(event) {
        console.log("called");
        event.preventDefault();
        const { message } = this.state;
        // <ChatMessage 
        //                         myMessage={true}
        //                         time={"10:10 AM, Today"}
        //                         name={"Olia"}
        //                         message={this.state}
        //                     />
        const id = uuidv1();
        this.props.addMessage({ message, id});
        this.setState({ message: "" });
    }

    render() {
        const {message} = this.state;

        return (
            <form onSubmit={this.handleSubmit} className="chat-message clearfix">
                <input
                    type = "text"
                    id="message"
                    value = {message}
                    onChange={this.handleChange}
                    name="message-to-send"
                    // placeholder="Type your message"
                    // rows="2"
                />
                <i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
                <i className="fa fa-file-image-o" />
                <button type = "submit">Send</button>
          </form>
        );
    }

}

const SendMessage = connect(null, mapDispatchToProps)(ConnectedForm);

export default SendMessage;





