/* eslint-disable max-len */
/* eslint-disable  */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Input } from 'reactstrap';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import ProductsList from './ProductsList';
import SideCart from './sideCart';
import EditableCart from './editablecart';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import createHashHistory from 'history/createHashHistory';
/* eslint-disable-next-line  */

class ProductList extends PureComponent {
  static propTypes = {
    data: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      productList: undefined,
      loader: 'LOADING',
      error: false,
      msg: undefined,
      editable: false,
      data: props.location.state.data,
      cart: '',
      cartID: '',
    };
    this.editable = this.editable.bind(this);
  }


  async componentDidMount() {
    const { data } = this.state;
    if (data.client && data.client.cart && data.client.cart.length > 0) {
      const cart = await this.getCart();
      this.setState({ cart: cart, cartID: cart.id });
    } else {
      this.setState({ cartID: data });
    }

    this.setState({ loader: 'LOADING' });
    const rows = await this.createRows();
    console.log(rows);
    this.setState({ productList: rows });
    this.setState({ loader: 'LOADED', editable: this.props.editable });
    // setTimeout(() => { this.setState({ loader: 'LOADED' }); }, 3000);
  }

  updateCart(cartData, cartId) {
    const {cart} = this.state;
    if(cartData){
      this.setState({ cart: cartData, cartID: cartId });
    }else{
      const history = createHashHistory();
      history.push('/pos/userSelection', { forceRefresh: true });
    }
  }

  showMessage = (message) => toast(message);

  getCart = async () => {
    let cart = {};
    let ref = this;
    const { data } = this.state;
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const pp = this.props;
    const ss = this.state;
    const cartEndPos = (data.client.cart.length) - 1
    const url = `${process.env.API_ENDPOINT}/pos/carts/${data.client.cart[cartEndPos].id}`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response);
      if (!response.data.error) {
        cart = response.data.cart;
      } else {
        ref.setState({
          error: true,
          msg: response.data.message,
        });
      }
    }).catch((error) => {
      ref.setState({
        error: true,
        msg: error.message,
      });
    });
    return cart;
  }

  createRows = async () => {
    const rows = [];
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT}/products`;
    console.log("url at pos", url);
    console.log("token at pos", token);

    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log('products at pos', response.data.products);
      console.log('error:', response.data.error);
      if (!response.data.error) {
        this.setState({ product: response.data.products });
        for (let i = 0; i < response.data.products.length; i += 1) {
          console.log("iteration", i, 'data', rows);
          // const durl = `/products/details/${response.data.products[i].id}`;
          // rows.push({
          //   // id: response.data.products[i].id,
          //   Title: response.data.products[i].isOtherProduct === 1 ? response.data.products[i].name : response.data.products[i].plant.name,
          //   image: "https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
          //   description: "here comes description and details of the product",
          //   alt: response.data.products[i].isOtherProduct === 1 ? response.data.products[i].name : response.data.products[i].plant.name,
          //   weight_type: response.data.products[i].weight_type,
          //   weight: response.data.products[i].weight,
          //   price: response.data.products[i].price,
          //   category: response.data.products[i].category_code,
          //   sku: response.data.products[i].sku,
          //   serial: response.data.products[i].serial,

          // });
          console.log("iteration", i, 'data', rows, response.data.products[i]);
          const obj = {
            id: response.data.products[i].id,
            name: response.data.products[i].name,
            weight_type: response.data.products[i].weight_type,
            weight: response.data.products[i].weight,
            quantity: response.data.products[i].quantity,
            price: response.data.products[i].price,
            category: response.data.products[i].category_code,
            sku: response.data.products[i].sku,
            serial: response.data.products[i].serial,
            image: "https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
            description: "here comes description and details of the product",
            alt: response.data.products[i].name,
            serials: response.data.products[i].serials,
            isPlant: (response.data.products[i].category_code == 'PLANT') ? true: false,
          }
          // console.log('obj', obj)
          rows.push(obj);
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
    return rows;
  }

  addToCart(product, count, wtype, weight, serials) {

    if(count <= 0){
      count = 1;
    }
    if(weight <= 0){
     weight = 1;
    }
    if(wtype == ""){
      wtype = product.weight_type;
    }

    const { data, cart } = this.state;
    const bodyFormData = new FormData();
    bodyFormData.append('product_id', product.id);
    bodyFormData.append('weight_type', wtype);
    bodyFormData.append('client_id', data.client_id);
    bodyFormData.append('weight', weight);
    bodyFormData.append('quantity', count);
    bodyFormData.append('unit_cost', product.price);
    bodyFormData.append('serials', JSON.stringify(serials));


    let url = `${process.env.API_ENDPOINT}/pos/cart/create`;
    if (cart != '') {
      if(cart.status == 0){
        url = `${process.env.API_ENDPOINT}/pos/cart/update/${cart.id}`;
      }else{
        url = `${process.env.API_ENDPOINT}/pos/cart/create`;
      }
    } else {
      url = `${process.env.API_ENDPOINT}/pos/cart/create`;
    }


    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    axios({
      method: 'post',
      url: url,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      if (!response.data.error) {
        this.setState({ cart: response.data.cart, cartID: response.data.cart.id });
      } else {
        // this.setState({
        //   error: true,
        //   msg: response.data.message,
        // });
      }
      if(response.data.message){
        this.showMessage(response.data.message);
      }
    }).catch((error) => {
      this.setState({
        error: true,
        msg: error.message,
      });
    });

  }


  searchProduct = (e) => {
    console.log(e.target.value);
    const condition = e.target.value;
    const {product} = this.state;
    const result = product.filter(product => product.name.includes(condition));
    this.setState({ productList: result });
  }

  editable() {
    this.setState({ editable: !this.state.editable });
  }

  // showMessage(message){
  //   return <div>
        
  //       <ToastsContainer store={ToastsStore}/>
  //   </div>
  // }

  render() {
    const {
      loader,
      productList,
      error,
      msg,
      editable,
      cart,
    } = this.state;
    let type = null;
    if (loader === 'LOADING') {
      type = <div className="load__icon-wrap loading-center"><svg className="load__icon"><path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg> </div>;
    }
    if (loader === 'LOADED' && error === false) {
      type = (
        <React.Fragment>
          <div className="shelf-search">
            <Input onChange={this.searchProduct} placeholder="Search Product" className="shelf-search-input" />
          </div>
          <div className="shelf-container-parent">
            <div className="shelf-container" >
              {/* {JSON.stringify(productList)} */}
              {this.state.productList && <ProductsList products={productList} onAddToCart={this.addToCart.bind(this)} />}
              <ToastContainer autoClose={3000} />
            </div>
            {cart
              && <div className="shelf-cart">
                <SideCart edit={this.editable} cart={cart} />
              </div>}

          </div>
        </React.Fragment>
      );
    }
    if (editable) {
      type = <EditableCart updatecart={this.updateCart.bind(this)} edit={this.editable} data={this.state.cartID} />;
    }
    if (error === true) {
      type = (
        <Card>
          <div>{msg}</div>
        </Card>
      );
    }
    return type;
  }
}
export default withRouter(ProductList);
