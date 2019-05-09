import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BackButton from './BackButton';
import '../styles/Legend.scss';
import { getFirebase } from 'react-redux-firebase';

// const offline = { color: 'red' };
const online = { color: 'green' };

export default class Legend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    };
    this.playerRef = getFirebase()
      .database()
      .ref('root/sessions/-LdLRGh4fGk1rD5Zd_Np/players/');
  }

  listenForPlayers = playerRef => {
    const playerList = [];
    playerRef.once('value').then(snapshot => {
      snapshot.forEach(element => {
        playerList.push({
          id: element.key,
          username: element.val().username,
          country: element.val().country,
        });
      });
      this.setState({
        players: playerList,
      });
    });
  };

  colorOf = country => {
    switch (country) {
      case 'Austria':
        return { color: '#ed497d' };
      case 'England':
        return { color: '#605aa7' };
      case 'France':
        return { color: '#9a9148' };
      case 'Germany':
        return { color: '#c0495e' };
      case 'Italy':
        return { color: '#cb75db' };
      case 'Russia':
        return { color: '#c95df6' };
      case 'Turkey':
        return { color: '#7b69b8' };
      default:
        return { color: '#ffffff' };
    }
  };

  componentDidMount() {
    this.listenForPlayers(this.playerRef);
  }

  render() {
    const { toggleLegend } = this.props;
    const { players } = this.state;
    return (
      <div className="resize_fit_top_left">
        <span className="legend-header">
          <BackButton />
          <text>Legend</text>
          <Button className="minimize-legend" onClick={toggleLegend}>
            <FontAwesomeIcon icon={faAngleUp} />
          </Button>
        </span>
        {players.map(el => {
          return (
            <div key={el.key}>
              <p className="countryName" style={this.colorOf(el.country)}>
                <text style={online}>■</text>
                {el.country}
              </p>
              <p className="countryInfo">
                • {el.username}
                <br />• units
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

Legend.propTypes = {
  toggleLegend: PropTypes.func.isRequired,
};
