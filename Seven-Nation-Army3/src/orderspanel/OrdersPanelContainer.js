import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import OrdersPanel from './OrdersPanel';
import '../styles/OrdersPanel.scss';

export default class OrdersPanelContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersPanelIsVisible: true,
    };
    this.toggleOrdersPanel = this.toggleOrdersPanel.bind(this);
  }

  toggleOrdersPanel() {
    this.setState({
      ordersPanelIsVisible: !this.state.ordersPanelIsVisible,
    });
  }

  render() {
    const { ordersPanelIsVisible } = this.state;
    const { ordersList } = this.props;

    return (
      <Fragment>
        {ordersPanelIsVisible ? (
          <OrdersPanel
            orders={ordersList}
            toggleOrdersPanel={this.toggleOrdersPanel}
          />
        ) : (
          <div id="ordersContainer" className="resize_fit_top_right">
            <span className="orders-header">
              <text>Orders</text>
              <Button
                className="minimize-orderspanel"
                onClick={this.toggleOrdersPanel}
              >
                <FontAwesomeIcon icon={faAngleDown} />
              </Button>
            </span>
          </div>
        )}
      </Fragment>
    );
  }
}