/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-unused-state */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-type */
/* eslint-disable  */
import React, { PureComponent } from 'react';
import {
  Container,
  Row,
  Col,
  Label,
  Button,
  Input,
  // InputGroup,
  // InputGroupAddon,
} from 'reactstrap';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import BackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import createHashHistory from 'history/createHashHistory';

export default class PlantCheckout extends PureComponent {
  static propTypes = {
    edit: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      PaymentMode: 0,
      cartresponse: {},
      loaded: 'NOT_LOADED',
      error: false,
      discount: '',
      msg: '',
      id: props.data, // 0 for cash 1 for card
    };
  }

  async componentDidMount() {
    this.getCartList();
  }

  async getCartList(){
    this.setState({ loader: 'LOADING' });
    const cartresponse = await this.getCart();
    this.setState({ cartresponse });
    this.setState({ loader: 'LOADED' });
  }

  showMessage = (message) => toast(message);

  confirmCheckout = () => () => {
   
    const {PaymentMode} = this.state;
  if(PaymentMode == 0){
    this.confirmPaymentDialog("Are you sure you want to checkout with Cash");
  } else if(PaymentMode == 1){
    this.confirmPaymentDialog("Payment made successfully with your card ?");
  }else if(PaymentMode == 2){
    this.showMessage("Work in progress");
  }else {
    this.showMessage("Please select a payment method");
  }
};

  confirmPaymentDialog(messageStr){
    let ref = this;
    confirmAlert({
      title: 'Checkout',
      message: messageStr,
      buttons: [
        {
          label: 'Yes',
          onClick: () => ref.checkoutProducts()
        },
        {
          label: 'No',
          onClick: () => ''
        }
      ]
    });
  }

  getCart = async () => {
    let cart = [];
    const { id } = this.state;
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const pp = this.props;
    const ss = this.state;
    const url = `${process.env.API_ENDPOINT}/pos/carts/${id}`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response);
      if (!response.data.error) {
        cart = response.data.cart;
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
    return cart;
  }

  products = (item) => {
    return (
      <Row className="product-ROW">
        {/* <Col lg={2}>
          <img src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="anythjing" />
        </Col> */}
        <Col xs={4} className="col-VnH-center">
          <Label>Green Tea</Label>
        </Col>
        <Col xs={3} className="col-VnH-center">
          <div className="editable-itemQuant">
            <Button color="primary" type="button" onClick={() => console.log('add')}>-</Button>
            <Input value="3" class="editcart-col-box" />
            <Button color="primary" type="button" onClick={() => console.log('add')}>
              +
            </Button>
          </div>
        </Col>
        {/* <Col lg={2} className="col-VnH-center">
          <div className="editcart-col-box">$ 100 </div>
        </Col> */}
        <Col xs={3} className="col-VnH-center">
          $ 300
        </Col>
        <Col xs={1} className="col-VnH-center">
          <Tooltip title="back">
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Col>

      </Row>
    );
  }

  deleteProduct = item => () => {
    const apiUrl = `${process.env.API_ENDPOINT}/pos/cart/${item.cart_id}/product/${item.product_id}/delete`;
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const bodyFormData = new FormData();
    axios({
      method: 'post',
      url: apiUrl,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      if(response.data.message){
        this.getCartList();
      }
    }).catch((error) => {
    });
  }


  checkoutProducts() {

    let selectedPaymentMode =  ""
    const {PaymentMode} = this.state;
    if(PaymentMode == 0){
        selectedPaymentMode = "CASH";
    }else if(PaymentMode == 1) {
      selectedPaymentMode = "CARD";
    }else if(PaymentMode == 2){
      selectedPaymentMode = "PAREX";
    }

    const {cartresponse} = this.state;
    const apiUrl = `${process.env.API_ENDPOINT}/pos/checkout/${cartresponse.id}`;
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const bodyFormData = new FormData();
    bodyFormData.append('payment_method', selectedPaymentMode);
    bodyFormData.append('discount', this.state.discount);
    axios({
      method: 'post',
      url: apiUrl,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      if(response && (response.data.message == 'Success')){
        this.showMessage('Your checkout successfully completed');
        const history = createHashHistory();
        history.push('/dashboard', { forceRefresh: true });
        history.go('/dashboard', { forceRefresh: true });
      }else{
        this.showMessage(response.data.message);
      }
    }).catch((error) => {
    });
  }

  render() {
    const { cartresponse, error, msg } = this.state;
    const { loader } = this.state;
    const { edit } = this.props;
    let type = null;
    if(!(cartresponse)){
      type = (
      <Container>
          <Card>
            <Row>
              <Col>
                <Tooltip title="back">
                  <IconButton onClick={() => edit()}>
                    <Col><BackIcon /> Add More Items</Col>
                  </IconButton>
                </Tooltip>
              </Col>
            </Row>
            <div className="editableItemDiv">  Cart is empty , Please add products</div>
            </Card>
        </Container>
      )
    }else{
    const products = cartresponse.products;
    const { PaymentMode } = this.state;

    if (loader === 'LOADING') {
      type = <div className="load__icon-wrap loading-center"><svg className="load__icon"><path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg> </div>;
    }
    if (loader === 'LOADED') {
      type = (
        <Container>
          <Card>
            <Row>
              <Col>
                <Tooltip title="back">
                  <IconButton onClick={() => edit()}>
                    <Col><BackIcon /> Add More Items</Col>
                  </IconButton>
                </Tooltip>
              </Col>
            </Row>
            <div className="editableItemDiv">
              {/* <Row className="heading-ROW">
                {}
              </Row> */}
              {/* {cartresponse.products.maps((item) => {
                this.products(item);
              })} */}
              {products.map((item) => {
                return (
                  <Row className="product-ROW">
                    {/* <Col lg={2}>
                      <img src="https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="anythjing" />
                    </Col> */}
                    <Col xs={4} className="col-VnH-center">
                      <Label>{item.product.name}</Label>
                    </Col>
                    <Col xs={3} className="col-VnH-center">
                      <div className="editable-itemQuant">
                        {/* <Button color="primary" type="button" onClick={() => console.log('add')}>-</Button> */}
                        <Input value={item.quantity} class="editcart-col-box" />
                        {/* <Button color="primary" type="button" onClick={() => console.log('add')}>
                          +
                        </Button> */}
                      </div>
                    </Col>
                    {/* <Col lg={2} className="col-VnH-center">
                      <div className="editcart-col-box">$ 100 </div>
                    </Col> */}
                    <Col xs={3} className="col-VnH-center">
                      $ {item.total}
                    </Col>
                    <Col xs={1} className="col-VnH-center">
                      <Tooltip title="back">
                        <IconButton>
                          <CloseIcon onClick={this.deleteProduct(item)} />
                          <ToastContainer autoClose={3000} />
                        </IconButton>
                      </Tooltip>
                    </Col>

                  </Row>
                );
              })}
              <Row className="total-Box-Row">
                <Col lg={6} className="col-VnH-center">
                  <div className="product-margin-top2p">
                    {/* <InputGroup className="input-box">
                    <Input placeholder="Apply Promo" />
                    <InputGroupAddon addonType="append"><Button color="secondary">Apply</Button></InputGroupAddon>
                  </InputGroup> */}
                  </div>
                  {/* <Button>Apply</Button> */}
                </Col>
                <Col lg={6} className="total-Box">
                  <Row className="rowPadding">
                    <Col lg={{ size: 4, offset: 1 }}>Total</Col>
                    <Col lg={6} className="editcart-col-box">{cartresponse ? cartresponse.sub_total : ''}</Col>
                  </Row>
                  <Row className="rowPadding">
                    <Col lg={{ size: 4, offset: 1 }}>Discount</Col>
                    {/* <Col lg={6} className="editcart-col-box">{cartresponse ? cartresponse.discount : '0'}</Col> */}
                    <Input value={this.state.discount} className="editcart-col-box" />
                  </Row>
                  {/* <Row className="rowPadding">
                  <Col lg={{ size: 4, offset: 1 }}>Coupon</Col>
                  <Col lg={6} className="couponDiv">
                    <Input className="editcart-col-box" placeholder="Input Coupon Code" />
                  </Col>
                </Row> */}
                  <Row className="rowPadding">
                    <Col lg={{ size: 4, offset: 1 }}>Total Amount Payable</Col>
                    <Col lg={6} className="editcart-col-box">{cartresponse ? cartresponse.total : ''}</Col>
                  </Row>
                  <Row className="rowPadding">
                    <Col lg={{ size: 4, offset: 1 }}>Payment Mode</Col>
                    <Col lg={6}>
                      <Button color={PaymentMode === 0 ? 'primary' : 'secondary'} onClick={() => this.setState({ PaymentMode: 0 })} block>Cash</Button>
                      <Button color={PaymentMode === 1 ? 'primary' : 'secondary'} onClick={() => this.setState({ PaymentMode: 1 })} block>Card</Button>
                      <Button color={PaymentMode === 2 ? 'primary' : 'secondary'} onClick={() => this.setState({ PaymentMode: 2 })} block>Pay with Parex</Button>
                    </Col>
                  </Row>
                  <Row className="rowPadding">
                    <Col lg={12}>
                      <div className="sideCartCheckout">
                        <Button color="primary" onClick={this.confirmCheckout()} block>CHECKOUT</Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Card>
        </Container>
      );
    }

  }
  return type;

  }
}
