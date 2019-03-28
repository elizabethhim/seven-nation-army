import React, { Component } from 'react';

import '../../styles/Chat.scss';

// TODO: Port Chat History from the Chat.html file to React
export default class ChatHistory extends Component {
  render() {
    return (
      <div className="chat">
        <div className="chat-header clearfix">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />

          <div className="chat-about">
            <div className="chat-with">Chat with Vincent Porter</div>
            <div className="chat-num-messages">already 50 messages</div>
          </div>
          <i className="fa fa-star"></i>
        </div>
        {/* <!-- end chat-header --> */}

        <div className="chat-history">
          <ul>
            <li className="clearfix">
              <div className="message-data align-right">
                <span className="message-data-time">10:10 AM, Today</span> &nbsp;
            &nbsp; <span className="message-data-name">Olia</span>
                <i className="fa fa-circle me"></i>
              </div>
              <div className="message other-message float-right">
                {"Hi Vincent... Let's team up against Germany! What do you think?"}
              </div>
            </li>

            <li>
              <div className="message-data">
                <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                <span className="message-data-time">10:12 AM, Today</span>
              </div>
              <div className="message my-message">
                {"Oh my god. Yes! Next turn, I'll use my army to attack Munich."}
                {"Can you support me?"}
              </div>
            </li>

            <li className="clearfix">
              <div className="message-data align-right">
                <span className="message-data-time">10:14 AM, Today</span> &nbsp;
            &nbsp; <span className="message-data-name">Olia</span>
                <i className="fa fa-circle me"></i>
              </div>
              <div className="message other-message float-right">
                {"Sounds good. I'll support you!"}
              </div>
            </li>

            <li>
              <div className="message-data">
                <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                <span className="message-data-time">10:20 AM, Today</span>
              </div>
              <div className="message my-message">
                {"Perfect. Maybe we should also move in on Italy..."}
              </div>
            </li>

            <li>
              <div className="message-data">
                <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                <span className="message-data-time">10:31 AM, Today</span>
              </div>
              <i className="fa fa-circle online"></i>
              {/* <i className="fa fa-circle online" style="color: #AED2A6"></i>
            <i className="fa fa-circle online" style="color:#DAE9DA"></i> */}
            </li>
          </ul>
        </div>
        {/* <!-- end chat-history --> */}

        <div className="chat-message clearfix">
          <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="2"></textarea>

          <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
        <i className="fa fa-file-image-o"></i>

          <button>Send</button>
        </div>
        {/* <!-- end chat-message --> */}
      </div>
    );
  }
}
