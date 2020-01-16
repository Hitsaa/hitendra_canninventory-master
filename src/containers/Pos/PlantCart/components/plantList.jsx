/* eslint-disable max-len */
/* eslint-disable  */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Input } from 'reactstrap';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import PlantsList from './PlantsList';
import SideCart from './sideCart';
import EditableCart from './editablecart';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
/* eslint-disable-next-line  */

class PlantList extends PureComponent {
  static propTypes = {
    data: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      plantList: undefined,
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
    this.setState({ plantList: rows });
    this.setState({ loader: 'LOADED', editable: this.props.editable });
    // setTimeout(() => { this.setState({ loader: 'LOADED' }); }, 3000);
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
    const url = `${process.env.API_ENDPOINT}/plants`;
    console.log("url at pos", url);
    console.log("token at pos", token);

    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log('plants at pos', response.data.plants);
      console.log('error:', response.data.error);
      if (!response.data.error) {
        this.setState({ plant: response.data.plants });
        for (let i = 0; i < response.data.plants.length; i += 1) {
          console.log("iteration", i, 'data', rows);
        
          const obj = {
            id: response.data.plants[i].id,
            name: response.data.plants[i].name,
            weight_type: response.data.plants[i].weight_type,
            weight: response.data.plants[i].weight,
            quantity: response.data.plants[i].quantity,
            price: response.data.plants[i].price,
            category: response.data.plants[i].category_code,
            sku: response.data.plants[i].sku,
            serial: response.data.plants[i].serial,
            image: "https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
            description: "here comes description and details of the plant",
            alt: response.data.plants[i].name,
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

  addToCart(plant, count, wtype, price) {

    if(count <= 0){
      this.showMessage("Quantity should be greater then 0");
    }else if(price <= 0){
      this.showMessage("Please enter price greater then 0");
    }else{
    const { data, cart } = this.state;
    const bodyFormData = new FormData();
    bodyFormData.append('plant_id', plant.id);
    bodyFormData.append('client_id', data.client_id);
    bodyFormData.append('price', price);


    let url = `${process.env.API_ENDPOINT}/pos/plants/cart/create`;
    if (cart != '') {
      if(cart.status == 0){
        url = `${process.env.API_ENDPOINT}/pos/plants/cart/update/${cart.id}`;
      }else{
        url = `${process.env.API_ENDPOINT}/pos/plants/cart/create`;
      }
    } else {
      url = `${process.env.API_ENDPOINT}/pos/plants/cart/create`;
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

  }


  searchPlant = (e) => {
    console.log(e.target.value);
    const condition = e.target.value;
    const {plant} = this.state;
    const result = plant.filter(plant => plant.name.includes(condition));
    this.setState({ plantList: result });
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
      plantList,
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
            <Input onChange={this.searchPlant} placeholder="Search Plant" className="shelf-search-input" />
          </div>
          <div className="shelf-container-parent">
            <div className="shelf-container" >
              {/* {JSON.stringify(plantList)} */}
              {this.state.plantList && <PlantsList plants={plantList} onAddToCart={this.addToCart.bind(this)} />}
              <ToastContainer autoClose={3000} />
            </div>
            {cart != ''
              && <div className="shelf-cart">
                <SideCart edit={this.editable} cart={cart} />
              </div>}

          </div>
        </React.Fragment>
      );
    }
    if (editable) {
      type = <EditableCart edit={this.editable} data={this.state.cartID} />;
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
export default withRouter(PlantList);
