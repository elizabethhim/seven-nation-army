import React, { Component } from 'react';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './Person.css';

type Props = {
  name: string,
  isOnline: boolean,
  status: string,
  source: string
};

export default class Person extends Component<Props> {
  props: Props;

  render() {
    const { name, isOnline, status, source } = this.props;
    return (
      <li className="clearfix">
        <img src={source} alt="avatar" className={style.img} />
        <div className={style.about}>
          <div className="name">{name}</div>
          <div className={style.status}>
            <FontAwesomeIcon
              icon={faCircle}
              className={isOnline ? style.online : style.offline}
            />
            {status}
          </div>
        </div>
      </li>
    );
  }
}
