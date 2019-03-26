// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import Map from './Map';


type Props = {};

export default class Game extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <Map/>
      </div>
    );
  }
}
