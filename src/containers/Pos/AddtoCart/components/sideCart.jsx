/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Button,
  Table,
} from 'reactstrap';
import PropTypes from 'prop-types';
// import ShoppingCart from '@material-ui/icons/Close';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
// import EditIcon from  '@material-ui/icons/Edit'
// import { createMuiTheme, MuiThemeProvider }
//  from '@material-ui/core/styles';
// import DataPaginationTable2 from '../../../../shared/components/table/DataPaginationTable2';
// const options = {
//   filter: false,
//   sort: false,
//   responsive: 'scroll',
//   print: false,
//   selectableRows: false,
//   search:false,
//   download:false
// };

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
    //  const { sum } = this;
    //  this.setState({ total: 0 });
    const { cart } = this.state;
    return cart.products.map((item, index) => {
      console.log(index);
      return (
        <tr>
          <th scope="row">{item ? item.product.name : ''}</th>
          {/* <th scope="row">{item ? item.id : ''}</th> */}
          <td>{item.quantity}</td>
          <td>{item.unit_cost}</td>
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
                <th>Product</th>
                <th className="form-card-th-center">Quantity</th>
                <th className="form-card-th-center">Rate</th>
              </tr>
            </thead>
            <tbody>
              {this.renderItems()}
            </tbody>
          </Table>

        </div>
        {/* <div className="cartBillingdiv">
         <div className="cart-sum-padding"><Label>Total</Label></div>
         <div className="cart-sum-info">410</div>
        </div> */}
        {/* <div className="cartBillingdiv">
         <div className="cart-sum-padding"><Label>Tax</Label></div>
         <div className="cart-sum-info">5%</div>
        </div> */}
        {/* <div className="cartBillingdiv">
        <div className="cart-sum-padding"><Label>Discount</Label></div>
         <div className="cart-sum-info">0</div>
        </div> */}
        {/* <div className="cartBillingdiv">
        <div className="cart-sum-padding"><Label>Grand Total</Label></div>
         <div className="cart-sum-info">420</div>
        </div> */}
        {/* <div className="cartBillingdiv">
         <div className="cart-sum-padding"><Label>Discount Coupon</Label></div>
         <div> <Input value="********" /></div>
        </div> */}
        <div className="sideCartCheckout">
          <Button color="primary" type="submit" block onClick={() => edit()}> GO TO CHECKOUT</Button>
        </div>
      </div>
    );
  }
}
