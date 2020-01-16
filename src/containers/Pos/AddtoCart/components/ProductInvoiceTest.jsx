/* eslint-disable */
import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Label,
  Button,
  Input,
} from 'reactstrap';
import PropTypes, { any } from 'prop-types';
import LogoImage from '../../../../img/CannIn.png';
import jsPDF from "jspdf";
import { display } from '@material-ui/system';
import { Preview, print } from 'react-html2pdf';


const data = {
  buyer: {
    name: "isRetailer",
    address1: "New York Lane",
    address2: "New York, USA",
    email: "isretailer@gmail.com",
  },
  seller: {
    name: "Canninventory",
    address1: "okohama, okohana lane",
    address2: "Canada",
    email: "peter@canninventory.com"
  },

  product: [
    {
      product_name: "Ancient",
      product_category: "category",
      total_amount: "$100",
      quantity: "1"
    },
    {
      product_name: "Ancient",
      product_category: "category",
      total_amount: "$100",
      quantity: "1"
    },
    {
      product_name: "Ancient",
      product_category: "category",
      total_amount: "$100",
      quantity: "1"
    },
    {
      product_name: "Ancient",
      product_category: "category",
      total_amount: "$100",
      quantity: "1"
    }
  ],

  total_payble: {
    total: "$400",
    tax: "$10",
    discount: "$0",
    total_payble_amount: "$410",
  }

}

export default class ProductInvoice extends Component {
  PropTypes = {
    title: PropTypes.string,
    data: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      doc: '',
      userInfo: null
    }
  }

  componentDidMount() {
    let user_info = JSON.parse(localStorage.getItem('cannave_user'));
    this.setState({ userInfo: user_info });
  }

  componentWillReceiveProps(nextProps) {

  }


  renderData() {
    const { cartData } = this.props;
    const keys = Object.keys(cartData.products)
    return (
      <table id="tab_customers" class="table table-striped" style={{ width: '100%' }}>
        <tr class="warning">
          <th>Prodcut</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Category</th>
        </tr>
        {
          keys.map((e, i) => (
            <tr>
              <td>{cartData.products[i].product.name}</td>
              <td>{cartData.products[i].unit_cost}</td>
              <td>{cartData.products[i].product.quantity}</td>
              <td>{cartData.products[i].product.category_code}</td>
            </tr>
          ))
        }
      </table>
    )
  }

  getConvertedDate(dateStr) {
    let d = new Date(dateStr);
    let convertedDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    return convertedDate;
  }

  render() {
    const { checkoutResData } = this.props;
    const { userInfo } = this.state;
    return (

      <div>
        <Preview id={'jsx-template'} className="preview-pdf-container" >
          <div className="invoice-container preview-pdf-container" id="content">
            <Col xs="12" >

              <Row className="title-row">
                <Col xs="6" > <h3>Product Invoice</h3>  </Col>
                <Col xs="6" >  <img src={LogoImage} /> </Col>
              </Row>

              <Row className="title-row">
                <Col xs="7" >
                  <div className="invoice-head-info">
                    <h4>Buyer</h4>
                  </div>
                </Col>
                <Col xs="5" >
                  <div className="invoice-head-info">
                  <h4>Seller</h4>
                  <h5>hhhh</h5>
                  <h5>kkkk</h5>
                  <h5>jjjj</h5>
                  <h5>hhhh</h5>
                </div>
                </Col>
              </Row>


              <div className="row">
                <div className="col-12">
                  {this.renderData()}
                </div>
              </div>

              <Row className="title-row preview-pdf-container">
                <Col xs="7" >
                  <div className="invoice-head-info">
                    <Row>
                      <h5>Date : </h5>
                      <h5>{" " + this.getConvertedDate(checkoutResData.sale.created_at)}</h5>
                    </Row>
                    <Row>
                      <h5>Invoice Id : </h5>
                      <h5>{checkoutResData.sale.id}</h5>
                    </Row>
                    <Row>
                      <h5>Payment Method : </h5>
                      <h5><b>{checkoutResData.sale.payment_method}</b></h5>
                    </Row>
                  </div>
                </Col>
                <Col xs="5" >
                  <div className="invoice-head-info">
                    <h4>Amount</h4>
                    <h5>Sub-Total : <b>{checkoutResData.sale.sub_total}</b></h5>
                    <h5>Discount : <b>{checkoutResData.sale.discount}</b></h5>
                    <h5>Total: <b>{checkoutResData.sale.total}</b></h5>
                  </div>
                </Col>
              </Row>
            </Col>
          </div>
        </Preview>

        <div className="row download-invoice-btn">
          <div className="col-12 ">
            <div className="mb-3">
              <button className="btn btn-outline-primary" onClick={() => print('a', 'jsx-template')}>Download Invoice</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

