/* eslint-disable arrow-body-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable react/no-unused-state */

import React, { Component } from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import PropTypes from 'prop-types';

class Plant extends Component {
  static propTypes = {
    plant: PropTypes.element.isRequired,
    onAddToCart: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      dropdownOpen: false,
      wtype: '',
      price: 0,
    };
    this.toggle = this.toggle.bind(this);
  }

  setCount = (operator) => {
    const { count } = this.state;
    console.log(operator, Number.isInteger(parseInt(operator)));
    if (operator === 'dec' && count > 0) {
      this.setState({ count: count - 1 });
    } else if (operator === 'inc') {
      this.setState({ count: count + 1 });
    } else if (Number.isInteger(parseInt(operator))) {
      this.setState({ count: parseInt(operator) });
    }
  }

  setPrice = (operator) => {
    if (Number.isInteger(parseInt(operator))) {
      this.setState({ price: parseInt(operator) });
    }
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  render() {
    const { count, price, wtype } = this.state;
    const { plant } = this.props;
    return (
      <div className="shelf-item">
        <div className="shelf-item__thumb">
          <img src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt={plant.alt} title={plant.Title} />
        </div>
        <p className="shelf-item__title">{plant.name}</p>
        <small>Price</small>
        <Input value={price} onChange={e => this.setPrice(e.target.value)} />
        <div className="quantity-box">
          <small>Quantity</small>
          <InputGroup className="input-box">
            <InputGroupAddon addonType="prepend">
              <Button>-</Button>
            </InputGroupAddon>
            <Input value={count} onChange={e => this.setCount(e.target.value)} />
            <InputGroupAddon addonType="prepend">
              <Button className="quantity-handeler">+</Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div>
          {/* Batch SN: {plant.batch.batch_no} */}
          <br />
        </div>
        <Button color="primary" onClick={() => { this.props.onAddToCart(plant, count, wtype, price); }}>
          Add to cart
        </Button>
      </div>
    );
  }
}

export default Plant;
