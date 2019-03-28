import React, { Component, Fragment } from 'react';
import { Popover, PopoverBody } from 'reactstrap';
import style from './Popup.css';

type Props = {
  id: number,
  country: string,
  player: string
};

export default class Popup extends Component<Props> {
  props: Props;

  constructor(props: Props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  state = {
    isVisible: false
  };

  componentDidMount() {
    this.setState({
      isVisible: false
    });
  }

  toggle = () => {
    const { isVisible } = this.state;
    this.setState({
      isVisible: !isVisible
    });
  };

  render() {
    const { id, country, player } = this.props;
    const { isVisible } = this.state;
    return (
      <Fragment>
        <span className={style.dot} id={`dot-${id}`} />
        <Popover
          className={style.popup}
          trigger="hover"
          isOpen={isVisible}
          target={`dot-${id}`}
          toggle={this.toggle}
        >
          <PopoverBody className={style.popup_container}>
            <div>{country}</div>
            <div>{player}</div>
          </PopoverBody>
        </Popover>
      </Fragment>
    );
  }
}
