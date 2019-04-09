import React, { Component } from 'react';

import HoldIcon from '../../media/images/hold.svg';
import '../../styles/Popup.scss';

export default class PopUp extends Component {
  render() {
    return (
		<div className="popup" id="popupContainer">
			<span className="popuptext" id="myPopup">
				<p id="popupText"></p>
			</span>
		</div>
    )
  }
}