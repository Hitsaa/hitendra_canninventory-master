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
import axios from 'axios';


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
      userInfo: '',
      products: '',
      checkout: '',
      loader: 'LOADING',
      buyer: '',
      seller: '',
    }
    this.generatePdf = this.generatePdf.bind(this);
  }

  async componentDidMount() {
    this.setState({ loader: 'LOADING' });
    let user_info = JSON.parse(localStorage.getItem('cannave_user'));
    this.setState({ userInfo: user_info });
    const parts = window.location.hash.split('/');
    const checkoutID = parts.pop() || parts.pop();
    const data = await this.getInvoice(checkoutID);
    console.log('res', data);
    this.setState({ checkout: data.checkout });
    this.setState({ products: data.products });
    this.setState({ buyer: data.buyer });
    this.setState({ seller: data.seller });
    this.setState({ loader: 'LOADED' });

  }

  // componentWillReceiveProps(nextProps) {

  // }
  getInvoice = async (checkoutID) => {
    let data = '';
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT}/pos/invoice/${checkoutID}`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.data.error) {
        data = response.data;
      } else {
        this.setState({
          error: true,
          msg: response.data.message,
        });
      }
    }).catch((error) => {
      this.setState({
        error: true,
        msg: error.message,
      });
    });
    return data;
  }
  generatePdf() {
    const urls = `${process.env.API_FILE_ENDPOINT}/pos/invoice/download/${this.state.checkout.id}`;
    // fake server request, getting the file url as response
    setTimeout(() => {
      const response = {
        file: urls,
      };
      // server sent the url to the file!
      // now, let's download:
      window.open(response.file);
      // you could also do:
      // window.location.href = response.file;
    }, 100);
  }


  renderData() {
    const { products, checkout } = this.state;
    console.log('fd', products);
    const keys = Object.keys(products)
    return (
      <table id="tab_customers" class="table table-striped" style={{ width: '100%' }}>
        <tr class="warning">
          <th>Product</th>
          <th>Category</th>
          <th>Weight</th>
          <th>Quantity</th>
          <th>Sub Total</th>
          <th>Discount</th>
          <th>Net Total</th>
        </tr>
        {
          products.map((i) => (
            <tr>
              <td>{i.name}</td>
              <td>{i.category_code}</td>
              <td>{i.weight > 0 ? i.weight : 'N/A'}</td>
              <td>{i.quantity > 0 ? i.quantity : 'N/A'}</td>
              <td>{i.total}</td>
              <td>{i.discount}</td>
              <td>{i.net_total}</td>
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
    const { checkout, loader, buyer, seller } = this.state;
    const { userInfo } = this.state;

    // return (
    let type = null;
    if (loader === 'LOADING') {
      type = <div className="load__icon-wrap loading-center"><svg className="load__icon"><path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg> </div>;
    }
    if (loader === 'LOADED') {
      console.log('ch', checkout);
      type = (
        <div>
          <Preview id={'jsx-template'} className="preview-pdf-container" >
            <div className="invoice-container preview-pdf-container" id="content">

              <Row className="title-row">
                <Col xs="6" > <h3>Product Invoice</h3>  </Col>
                <Col xs="6" >  <img src={LogoImage} /> </Col>
              </Row>

              <Row className="title-row">
                <Col xs="7" >
                  <div className="invoice-head-info">
                    <h4>Buyer Details</h4>

                    {<div>
                      <h5>{buyer.firstName}</h5>
                      <h5>{buyer.email}</h5>
                      <h5>{buyer.businessLicenseNumber ? buyer.businessLicenseNumber : buyer.patientLicense}</h5>
                      <h5>{buyer.phoneNumber}</h5>
                      <h5>{buyer.address} </h5>
                      <h5>{buyer.state} </h5>

                    </div>
                    }
                  </div>
                </Col>
                <Col xs="5" >
                  <div className="invoice-head-info">
                    <h4>Seller</h4>
                    {<div>
                      <h5>{seller.firstName}</h5>
                      <h5>{seller.email}</h5>
                      <h5>{seller.businessLicenseNumber}</h5>
                      <h5>{seller.phoneNumber}</h5>
                      <h5>{seller.address} </h5>
                      <h5>{seller.state} </h5>

                    </div>
                    }
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
                      <h5>{" " + this.getConvertedDate(checkout.created_at)}</h5>
                    </Row>
                    <Row>
                      <h5>Invoice Id : </h5>
                      <h5>INV#{checkout.id}</h5>
                    </Row>
                    <Row>
                      <h5>Payment Method : </h5>
                      <h5><b>{checkout.payment_method}</b></h5>
                    </Row>
                  </div>
                </Col>
                <Col xs="5" >
                  <div className="invoice-head-info">
                    <h4>Amount</h4>
                    <h5>Sub-Total : <b>{Math.round(checkout.sub_total * Math.pow(10, 2)) / Math.pow(10, 2)}</b></h5>
                    <h5>Discount : <b>{Math.round(checkout.discount * Math.pow(10, 2)) / Math.pow(10, 2)}</b></h5>
                    <h5>Excise Tax : <b>{Math.round(checkout.excise_tax * Math.pow(10, 2)) / Math.pow(10, 2)}</b></h5>
                    <h5>City Tax : <b>{Math.round(checkout.city_tax * Math.pow(10, 2)) / Math.pow(10, 2)}</b></h5>
                    <h5>County Tax : <b>{Math.round(checkout.county_tax * Math.pow(10, 2)) / Math.pow(10, 2)}</b></h5>
                    <h5>State Tax : <b>{Math.round(checkout.state_tax * Math.pow(10, 2)) / Math.pow(10, 2)}</b></h5>
                    <h5>Total Tax : <b>{Math.round(checkout.total_tax * Math.pow(10, 2)) / Math.pow(10, 2)}</b></h5>
                    <h5>Total Paid : <b>{Math.round(checkout.total_paid * Math.pow(10, 2)) / Math.pow(10, 2)}</b></h5>
                  </div>
                </Col>
                <Col xs="12" >
                  <hr />
                  <p>{checkout.termsOfReturn}</p>
                </Col>
              </Row>

            </div>
          </Preview>

          <div className="row download-invoice-btn">
            <div className="col-12 ">
              <div className="mb-3">
                <button className="btn btn-outline-primary" onClick={() => this.generatePdf()}>Download Invoice</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return type;
  }
}


