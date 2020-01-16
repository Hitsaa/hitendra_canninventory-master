/* eslint-disable */
import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Container,
  Row,
  Col,
  Label,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
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
import ProductInvoice from './ProductInvoice';
import renderCheckBoxField from '../../../../shared/components/form/CheckBox';
import Checkbox from './Checkbox';


export default class Editablecart extends PureComponent {
  static propTypes = {
    edit: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      PaymentMode: 0,
      cartresponse: {},
      totalNetAmount: 0,
      loaded: 'NOT_LOADED',
      error: false,
      discount: 0,
      total: 0,
      county_tax: 0,
      countyChecked: true,
      stateChecked: true,
      exciseChecked: true,
      cityChecked: true,
      state_tax: 0,
      excise_tax: 0,
      city_tax:0,
      checkoutRes: false,
      change:0,
      net_pay:0,
      tax: 0,
      msg: '',
      id: props.data, // 0 for cash 1 for card
      terms: '',
      cart: '',
    };
  }

  async componentDidMount() {
    this.getCartList();
  }

  async getCartList() {
    this.setState({ loader: 'LOADING' });
    const cartresponse = await this.getCart();
    this.setState({ cartresponse });
    //Call update discount by looping through all products
      this.state.cartresponse.products.forEach(element => {
          this.setProductDiscount(element.id,0);
      });
    this.setState({ loader: 'LOADED' });
  }

  showMessage = (message) => toast(message);

  confirmCheckout = () => () => {
    const { PaymentMode } = this.state;
    this.setState({ checkoutRes: true });
    if (PaymentMode == 0) {
      this.confirmPaymentDialog("Are you sure you want to checkout with Cash");
    } else if (PaymentMode == 1) {
      this.confirmPaymentDialog("Payment made successfully with your Card ?");
    } else if (PaymentMode == 2) {
      this.confirmPaymentDialog("Payment made successfully with parex ?");
    } else {
      this.showMessage("Please select a payment method");
    }
  };

  confirmPaymentDialog(messageStr) {
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
          onClick: () => ref.cancelClickedCheckout()
        }
      ]
    });
  }

  cancelClickedCheckout(){
    const history = createHashHistory();
        history.push('/pos/cartSelection', { forceRefresh: true });
        history.go('/pos/cartSelection', { forceRefresh: true });
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
        if (cart != null && cart.id) {
          // this.setState({ totalNetAmount: response.data.net_pay });
          // let tot = response.data.net_pay + cart.total_tax;
          // this.setState({ tax: cart.total_tax});
          // this.setState({ state_tax: cart.state_tax});
          // this.setState({ city_tax: cart.city_tax});
          // this.setState({ excise_tax: cart.excise_tax});
          // this.setState({ county_tax: cart.county_tax}); 
          // this.setState({ total: tot });.





          this.setState({ cart: cart });
          this.props.updatecart(cart, cart.id);
        } else {
          this.props.updatecart(null, null);
        }

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
      if (response.data.message) {
        this.getCartList();
      }
    }).catch((error) => {
    });
  }

  onStateCheckboxChange = (isChecked) => {
    this.state.stateChecked = !this.state.stateChecked;
    this.recalculateTax();
    
}
onCityCheckboxChange = (isChecked) => {
  this.state.cityChecked = !this.state.cityChecked;
  this.recalculateTax();    
}

onCountyCheckboxChange = (isChecked) => {
  this.state.countyChecked = !this.state.countyChecked;
  this.recalculateTax();  
}
onExciseCheckboxChange = (isChecked) => {
  this.state.exciseChecked = !this.state.exciseChecked;
  this.recalculateTax();
}

  checkoutProducts() {

    let selectedPaymentMode = ""
    const { PaymentMode } = this.state;
    if (PaymentMode == 0) {
      selectedPaymentMode = "CASH";
    } else if (PaymentMode == 1) {
      selectedPaymentMode = "CARD";
    } else if (PaymentMode == 2) {
      selectedPaymentMode = "PAREX";
    }

    const { cartresponse } = this.state;
    const apiUrl = `${process.env.API_ENDPOINT}/pos/checkout/${cartresponse.id}`;
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const bodyFormData = new FormData();
    bodyFormData.append('payment_method', selectedPaymentMode);
    bodyFormData.append('discount', this.state.discount);
    bodyFormData.append('tax', this.state.tax);
    bodyFormData.append('cart_products',JSON.stringify(this.state.cartresponse.products));
    bodyFormData.append('county_tax', this.state.county_tax);
    bodyFormData.append('state_tax', this.state.state_tax);
    bodyFormData.append('city_tax', this.state.city_tax);
    bodyFormData.append('excise_tax', this.state.excise_tax);
    bodyFormData.append('terms', this.state.terms);
    axios({
      method: 'post',
      url: apiUrl,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      if (response && (response.data.message == 'Success')) {
        this.showMessage('Your checkout successfully completed');
        const history = createHashHistory();
        const checkoutID = response.data.sale.id;
        history.push(`/pos/invoice/${checkoutID}`, { forceRefresh: true });
        history.go(`/pos/invoice/${checkoutID}`, { forceRefresh: true });
      } else {
        this.showMessage(response.data.message);
      }
    }).catch((error) => {
    });
  }

  setProductDiscount = (productID,discount) => {
    if((discount > 99) || (isNaN(discount))){
      return;
    }
//Get that product first
let productCart = this.state.cartresponse;
console.log('consoled cart',productCart.products);
let item = productCart.products.find(x=>x.id ===productID);
var index = productCart.products.findIndex(item => item.id === productID);
console.log('selected',item);
console.log('product id',productID);
// let item = productCart.products.some(item => productID === item.id);
//update discount
let newItem = item;
let dis = (discount*0.01*item.total);
let net_total = (item.total - dis);
newItem.discount = dis;
newItem.sub_total = item.total;
newItem.net_total = net_total;
//update product subtotal total
newItem.excise_tax = net_total*0.01*item.excise_rate;
newItem.state_tax = net_total*0.01*item.state_rate;
newItem.city_tax = net_total*0.01*item.city_rate;
newItem.county_tax = net_total*0.01*item.county_rate;
// Replace the item by index.
productCart.products.splice(index, 1, newItem);
this.state.cartresponse = productCart;
//Now loop through all products and get taxes breakdown...
let ci_tax = 0;
let st_tax = 0;
let ex_tax = 0;
let co_tax = 0;
let total_amount = 0;
let total_discount = 0;
this.state.cartresponse.products.forEach(element => {
  if(this.state.cityChecked){
    ci_tax = element.city_tax + ci_tax;
  }
  if(this.state.countyChecked){
    co_tax = element.county_tax + co_tax;
  }
  if(this.state.exciseChecked){
    ex_tax = element.excise_tax + ex_tax;
  }
  if(this.state.stateChecked){
    st_tax = element.state_tax + st_tax;
  }
  total_discount = element.discount + total_discount;
  total_amount = element.net_total + total_amount;
});
// this.state.city_tax = ci_tax;
// this.state.state_tax = st_tax;
// this.state.excise_tax = ex_tax;
// this.state.county_tax = co_tax;

          
          // let tot = response.data.net_pay + cart.total_tax;
          let total_tax = ci_tax + co_tax + ex_tax + st_tax;
          let total_net_pay = total_amount + total_tax;
          this.setState({ totalNetAmount: total_net_pay });
          this.setState({ tax: total_tax});
          this.setState({ state_tax: st_tax});
          this.setState({ city_tax: ci_tax});
          this.setState({ excise_tax: ex_tax});
          this.setState({ county_tax: co_tax});
          this.setState({ discount: total_discount});
          this.setState({ total: total_amount });
          this.setState({ net_pay: total_net_pay });
          // this.setState({ cart: cart });

console.log('final selected product',this.state.cartresponse);
  }

  recalculateTax(){
//Now loop through all products and get taxes breakdown...
let ci_tax = 0;
let st_tax = 0;
let ex_tax = 0;
let co_tax = 0;
let total_amount = 0;
let total_discount = 0;
this.state.cartresponse.products.forEach(element => {
  if(this.state.cityChecked){
    ci_tax = element.city_tax + ci_tax;
  }
  if(this.state.countyChecked){
    co_tax = element.county_tax + co_tax;
  }
  if(this.state.exciseChecked){
    ex_tax = element.excise_tax + ex_tax;
  }
  if(this.state.stateChecked){
    st_tax = element.state_tax + st_tax;
  }
  total_discount = element.discount + total_discount;
  total_amount = element.net_total + total_amount;
});

//Set state
let total_tax = ci_tax + co_tax + ex_tax + st_tax;
let total_net_pay = total_amount + total_tax;
this.setState({ totalNetAmount: total_net_pay });
this.setState({ tax: total_tax});
this.setState({ state_tax: st_tax});
this.setState({ city_tax: ci_tax});
this.setState({ excise_tax: ex_tax});
this.setState({ county_tax: co_tax});
this.setState({ discount: total_discount});
this.setState({ total: total_amount });
this.setState({ net_pay: total_net_pay });
  }

  setSaleChange = (paid) => {
    if(paid > this.state.net_pay){
      this.setState({ change: (paid - this.state.net_pay) });
    }else{
      this.setState({ change: 0 });
    }
  }

  setDiscount = (operator) => {
    //this.setState({ discount: parseInt(operator) });
    let enteredDiscount = operator.replace(/^0+/, '');
    const { cartresponse, totalNetAmount } = this.state;
    if (enteredDiscount === '') {
      this.setState({ discount: 0 });
    } else {
      this.setState({ discount: enteredDiscount });
      enteredDiscount = parseFloat(enteredDiscount);
    }

    let total_amount_cal = totalNetAmount - enteredDiscount + this.state.tax;
    if (total_amount_cal <= 0) {
      // this.showMessage("Discount should not be greater then Total Amount");
      this.setState({ total: 0 });
    } else {
      this.setState({ total: parseFloat((total_amount_cal).toFixed(2)) });
    }
  }

  setTerms = (operator) => {
    this.setState({ terms: operator });
  }

  render() {
    const { cartresponse, error, msg, discount, tax, total, totalNetAmount, cart, net_pay,change } = this.state;
    const { loader } = this.state;
    const { edit } = this.props;
    let type = null;
    if (this.state.checkoutRes) {
      type = (<ProductInvoice />)
    } else if (!(cartresponse)) {
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
    } else {
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
              <Row className="product-ROW">
                      <Col xs={4} className="col-VnH-center">
                        <Label>Product</Label>
                      </Col>
                      <Col xs={2} className="col-VnH-center">
                      <b>QTY</b>
                      </Col>
                      <Col xs={2} className="col-VnH-center">
                        <b>Sub-Total</b>
                      </Col>
                      <Col xs={1} className="col-VnH-center">
                      <b>Discount(%)</b>
                      </Col>
                      <Col xs={1} className="col-VnH-center">
                      <b>Total</b>
                      </Col>
                      <Col xs={1} className="col-VnH-center">
                      <b>Remove</b>
                      </Col>

                    </Row>
                {products.map((item) => {
                  return (
                    <Row className="product-ROW">
                      <Col xs={4} className="col-VnH-center">
                        <Label>{item.product.name}</Label>
                      </Col>
                      <Col xs={2} className="col-VnH-center">
                        <div className="editable-itemQuant">
                          <Input value={item.quantity} class="editcart-col-box" />
                        </div>
                      </Col>
                      <Col xs={2} className="col-VnH-center">
                        $ {item.sub_total ? item.sub_total : item.total}
                      </Col>
                      <Col xs={1} className="col-VnH-center">
                      <div className="editable-itemQuant">
                          <Input defaultValue={item.discount ? item.discount : 0} onChange={e => this.setProductDiscount(item.id,e.target.value)} type="text" min="0"  max="99" class="editcart-col-box" />
                        </div>
                      </Col>
                      <Col xs={1} className="col-VnH-center">
                        $ {item.net_total ? item.net_total : item.total}
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
                  <Col lg={6} className="">
                    <form className="form form form--horizontal" ref="testForm">
                      <div className="form__form-group">
                        <span className="form__form-group-label">Return Terms</span>
                        <div className="form__form-group-field">
                          <textarea type="text" name="terms" onChange={e => this.setTerms(e.target.value)} placeholder="Copy Return/Exchange policy here.." ref="terms" ></textarea>
                        </div>
                      </div>
                    </form>
                    <Row className="rowPadding">
                      <Col lg={{ size: 3, offset: 1 }}>Excise Tax</Col>
                      <Col lg={4} disabled className="editcart-col-box">{Math.round(this.state.excise_tax * Math.pow(10, 2)) / Math.pow(10, 2)}</Col>
                      <Col lg={3}>
                      <div className="form__form-group-field">
                        <Checkbox
                            name="excisetTax"
                            type="checkbox"
                            label=""
                            checked={this.state.exciseChecked}
                            onChange={this.onExciseCheckboxChange}
                        />
                        </div>
                </Col>
                    </Row>
                    <Row className="rowPadding">
                      <Col lg={{ size: 3, offset: 1 }}>County Tax</Col>
                      <Col lg={4} disabled className="editcart-col-box">{Math.round(this.state.county_tax * Math.pow(10, 2)) / Math.pow(10, 2)}</Col>
                      <Col lg={3}>
                      <div className="form__form-group-field">
                        <Checkbox
                            name="countyTax"
                            type="checkbox"
                            label=""
                            checked = {this.state.countyChecked}
                            onChange={this.onCountyCheckboxChange}
                        />
                        </div>
                </Col>
                    </Row>
                    <Row className="rowPadding">
                      <Col lg={{ size: 3, offset: 1 }}>City Tax</Col>
                      <Col lg={4} disabled className="editcart-col-box">{Math.round(this.state.city_tax * Math.pow(10, 2)) / Math.pow(10, 2)}</Col>
                      <Col lg={3}>
                      <div className="form__form-group-field">
                        <Checkbox
                            name="cityTax"
                            type="checkbox"
                            label=""
                            checked ={this.state.cityChecked}
                            onChange={this.onCityCheckboxChange}
                        />
                        </div>
                </Col>
                    </Row>
                    <Row className="rowPadding">
                      <Col lg={{ size: 3, offset: 1 }}>State Tax</Col>
                      <Col lg={4} disabled className="editcart-col-box">{Math.round(this.state.state_tax * Math.pow(10, 2)) / Math.pow(10, 2)}</Col>
                      <Col lg={3}>
                      <div className="form__form-group-field">
                        <Checkbox
                            name="stateTax"
                            type="checkbox"
                            label=""
                            checked = {this.state.stateChecked}
                            onChange={this.onStateCheckboxChange}
                        />
                        </div>
                </Col>
                    </Row>
                  </Col>
                  <Col lg={6} className="total-Box">
                    <Row className="rowPadding">
                      <Col lg={{ size: 4, offset: 1 }}>Total</Col>
                      <Col lg={6} className="editcart-col-box">{Math.round(total* Math.pow(10, 2)) / Math.pow(10, 2)}</Col>
                    </Row>
                    <Row className="rowPadding">
                      <Col lg={{ size: 4, offset: 1 }}>Discount</Col>
                      <Col lg={6}> <Input min={0} type="text" step="1" readOnly value={Math.round(discount * Math.pow(10, 2)) / Math.pow(10, 2)} className="editcart-col-box" /> </Col>
                    </Row>
                    <Row className="rowPadding">
                      <Col lg={{ size: 4, offset: 1 }}>Tax</Col>
                      <Col lg={6}> <Input min={0} readOnly type="text" value={Math.round(tax * Math.pow(10, 2)) / Math.pow(10, 2)} className="editcart-col-box" /> </Col>
                    </Row>

                    <Row className="rowPadding">
                      <Col lg={{ size: 4, offset: 1 }}>Total Amount Payable</Col>
                      <Col lg={6} className="editcart-col-box">{Math.round(net_pay * Math.pow(10, 2)) / Math.pow(10, 2)}</Col>
                    </Row>
                    <Row className="rowPadding">
                      <Col lg={{ size: 4, offset: 1 }}>Amount Tendered</Col>
                      <Col lg={6}> <Input min={0} type="text" onChange={e => this.setSaleChange(e.target.value)} defaultValue={Math.round(net_pay * Math.pow(10, 2)) / Math.pow(10, 2)} className="editcart-col-box" /> </Col>

                    </Row>
                    <Row className="rowPadding">
                      <Col lg={{ size: 4, offset: 1 }}>Change</Col>
                      <Col lg={6} className="editcart-col-box">{Math.round(change * Math.pow(10, 2)) / Math.pow(10, 2)}</Col>
                   
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
