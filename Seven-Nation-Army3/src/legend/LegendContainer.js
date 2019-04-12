import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BackButton from './BackButton';
import Legend from './Legend';
import '../styles/Legend.scss';

export default class LegendContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legendIsVisible: true,
    };
    this.toggleLegend = this.toggleLegend.bind(this);
  }

  toggleLegend() {
    this.setState({
      legendIsVisible: !this.state.legendIsVisible,
    });
  }

  render() {
    const { legendIsVisible } = this.state;
    return (
      <Fragment>
        {legendIsVisible ? (
          <Legend toggleLegend={this.toggleLegend} />
        ) : (
          <div className="resize_fit_top_left">
            <span className="legend-header">
              <BackButton />
              <text>Legend</text>
              <Button className="minimize-legend" onClick={this.toggleLegend}>
                <FontAwesomeIcon icon={faAngleDown} />
              </Button>
            </span>
          </div>
        )}
      </Fragment>
    );
  }
}
