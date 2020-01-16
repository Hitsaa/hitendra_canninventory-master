/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Button,
  Table,
} from 'reactstrap';
import PropTypes from 'prop-types';

export default class shoppingCart extends Component {
  PropTypes = {
    edit: PropTypes.func.isRequired,
    cart: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      sum: 0,
      cart: props.cart,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ cart: nextProps.cart });
  }

  renderItems = () => {
    const { cart } = this.state;
    return cart.products.map((item, index) => {
      console.log(index);
      return (
        <tr>
          <th scope="row">{item ? item.id : ''}</th>
          <td>{item.quantity}</td>
          <td>{item.total}</td>
        </tr>
      );
    });
  }

  render() {
    const { sum } = this.state;
    const { edit } = this.props;
    console.log(sum);
    return (
      <div>
        <div className="mainConatinerCart">
          <Table>
            <thead>
              <tr>
                <th>Plant</th>
                <th className="form-card-th-center">Quantity</th>
                <th className="form-card-th-center">Price</th>
              </tr>
            </thead>
            <tbody>
              {this.renderItems()}
            </tbody>
          </Table>

        </div>
        <div className="sideCartCheckout">
          <Button color="primary" type="submit" block onClick={() => edit()}> GO TO CHECKOUT</Button>
        </div>
      </div>
    );
  }
}
