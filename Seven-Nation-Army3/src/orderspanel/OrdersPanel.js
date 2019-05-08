import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/OrdersPanel.scss';


const buttonColor = {
  backgroundColor: '#434651',
};

export default class OrdersPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersList: [],
    }
  }

  componentDidMount() {
  }

  render() {
    const { toggleOrdersPanel } = this.props.toggleOrdersPanel;

    return (
      <div className="resize_fit_top_right">
        <span className="orders-header">
          <text>Orders</text>
          <Button className="minimize-orderspanel" onClick={toggleOrdersPanel}>
            <FontAwesomeIcon icon={faAngleUp} />
          </Button>
        </span>
        {this.props.orders.map(order => (
          <p className='orders' key={order}>
            • {order}
          </p>
        ))}
        <Button id="submitOrders" style={buttonColor}>
          Submit
        </Button>
      </div>
    );
  }
}

OrdersPanel.propTypes = {
  toggleOrdersPanel: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
};
