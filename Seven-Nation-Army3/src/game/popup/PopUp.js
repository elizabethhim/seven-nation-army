import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import PropTypes from 'prop-types';

import '../../styles/Popup.scss';

export default class PopUp extends Component {
	render() {
		const { buttonIsVisible } = this.props;
		return (
			<div className="popup" id="popupContainer">
				<span className="popuptext" id="myPopup">
					<p id="popupText"></p>
					{buttonIsVisible && (
						<ButtonGroup vertical>
							<ButtonGroup>
								<Button style={{ backgroundColor: '#434651' }}>Hold</Button>
								<Button style={{ backgroundColor: '#434651' }}>Move</Button>
							</ButtonGroup>
							<ButtonGroup>
								<Button style={{ backgroundColor: '#434651' }}>Convoy</Button>
								<Button style={{ backgroundColor: '#434651' }}>Support</Button>
							</ButtonGroup>
						</ButtonGroup>
					)}
				</span>
			</div>
		)
	}
}

PopUp.propTypes = {
	buttonIsVisible: PropTypes.bool.isRequired,
}