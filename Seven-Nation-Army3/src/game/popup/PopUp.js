import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import PropTypes from 'prop-types';

import '../../styles/Popup.scss';

const buttonColor = {
  backgroundColor: '#434651',
};

export default class PopUp extends Component {
  render() {
    const { buttonIsVisible } = this.props;
    return (
      <div className="popup" id="popupContainer">
        <span className="popuptext" id="myPopup">
          <p id="popupText"/>
          {buttonIsVisible && (
            <ButtonGroup vertical>
              <ButtonGroup>
                <Button id="holdButton" style={buttonColor}>
                  Hold
                </Button>
                <Button id="moveButton" style={buttonColor}>
                  Move
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button id="convoyButton" style={buttonColor}>
                  Convoy
                </Button>
                <Button id="supportButton" style={buttonColor}>
                  Support
                </Button>
              </ButtonGroup>
            </ButtonGroup>
          )}
        </span>
      </div>
    );
  }
}

PopUp.propTypes = {
  buttonIsVisible: PropTypes.bool.isRequired,
};
