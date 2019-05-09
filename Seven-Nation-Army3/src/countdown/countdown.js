import React, { Component } from 'react';
import { getFirebase } from 'react-redux-firebase';
import { sessionID } from '../game/scripts';

class Timer extends Component {
  render() {
    return (
      <div>
        <p style={{ fontSize: 30, margin: 'auto', padding: '2vw 0 2vw 1vw' }}>
          {this.props.value}:{this.props.seconds}
        </p>
      </div>
    );
  }
}

export default class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: '00',
      value: '',
      isStarted: false,
    };
    this.secondsRemaining = 0;
    this.intervalHandle = 0;
    this.adjudicationPeriod = 0;

    this.handleChange = this.handleChange.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
    this.tick = this.tick.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  tick() {
    var min = Math.floor(this.secondsRemaining / 60);
    var sec = this.secondsRemaining - min * 60;

    this.setState({
      value: min,
      seconds: sec,
    });

    if (sec < 10) {
      this.setState({
        seconds: '0' + this.state.seconds,
      });
    }

    if (min < 10) {
      this.setState({
        value: '0' + min,
      });
    }

    if ((min === 0) & (sec === 0)) {
      clearInterval(this.intervalHandle);
    }

    if (sec === 0 && min === 0) {
      console.log('done');
      this.startCountDown();
    }
    this.secondsRemaining--;
  }

  startCountDown() {
    this.setState({
      value: this.adjudicationPeriod,
    })
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.value;
    this.secondsRemaining = time * 60;
    this.setState({
      isStarted: true,
    });
  }

  componentDidMount() {
    return getFirebase()
      .database()
      .ref('root/sessions/' + sessionID + '/adjudicationPeriod')
      .once('value')
      .then(snapshot => {
        this.adjudicationPeriod = snapshot.val();
        this.startCountDown();
      });
  }
  render() {
    return (
      <div>
        <Timer value={this.state.value} seconds={this.state.seconds} />
      </div>
    );
  }
}
