/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-unused-state */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-unised-vars */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable quote-props */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-unused-expression */
/* eslint-disable no-unused-expressions */
import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Input } from 'reactstrap';
import { reduxForm } from 'redux-form';
// import { matchPath } from 'react-router';
// import PropTypes from 'prop-types';
// import axios from 'axios';
// import PropTypes from 'prop-types';
// import { PropTypes } from 'react';
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';


class ProductEditForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      serial: this.generateSerial(),
      error: false,
      msg: '',
      product: '',
      productID: '',
      weightType: [
        'POUNDS',
        'GRAMS',
        'OUNCES',
        'FLUID_OUNCES',
        'MILILITRES',
        'MILIGRAMS',
        'UNIT',
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ loader: 'LOADING' });
    const parts = window.location.hash.split('/');
    const productID = parts.pop() || parts.pop();
    this.setState({ productID });
    const product = await this.getProduct(productID);
    this.setState({ product });
    this.setState({ loader: 'LOADED' });
  }

  getProduct = async (productID) => {
    let product = {};
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT}/products/${productID}`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.data.error) {
        product = response.data.product;
        this.setState({ product: response.data.product });
        console.log(response.data.product);
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
    return product;
  }

  generateSerial() {
    const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const serialLength = 10;
    let randomSerial = 'SN';
    let randomNumber = 0;
    for (let i = 0; i < serialLength; i += 1) {
      randomNumber = Math.floor(Math.random() * chars.length);
      randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }
    // console.log('serial', randomSerial);
    return randomSerial;
  }

  async handleSubmit(e) {
    e.preventDefault();
    const name = this.refs.testForm.name.value;
    const price = this.refs.testForm.price.value;
    const quantity = this.refs.testForm.quantity.value;
    const weightType = this.refs.testForm.weightType.value;
    const weight = this.refs.testForm.weight.value;
    const description = this.refs.testForm.description.value;
    // eslint-disable-next-line no-console
    const bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('price', price);
    bodyFormData.append('quantity', quantity);
    bodyFormData.append('weight_type', weightType);
    bodyFormData.append('weight', weight);
    bodyFormData.append('description', description);

    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const productID = this.state.productID;
    const urls = `${process.env.API_ENDPOINT}/products/update/${productID}`;
    axios({
      method: 'post',
      url: urls,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      if (!response.data.error) {
        const history = createHashHistory();
        history.push(`/products/details/${this.state.productID}`, { forceRefresh: true });
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
  }

  render() {
    const { error, msg } = this.state;
    const { loader } = this.state;
    let type = null;
    if (loader === 'LOADING') {
      type = <div className="load__icon-wrap"><svg className="load__icon"><path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg> </div>;
    }
    if (loader === 'LOADED') {
      type = (
        <form className="form form form--horizontal" ref="testForm" onSubmit={this.handleSubmit}>
          {error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : null}
          <div className="form__form-group">
            <span className="form__form-group-label">Product Name</span>
            <div className="form__form-group-field">
              {
                this.state.product.name ? <Input defaultValue={this.state.product.name} type="text" name="name" ref="name" /> : <Input disabled name="name" value="N/A" />
              }
            </div>
          </div>
          <div className="form__form-group form__form-group-id">
            <span className="form__form-group-label">Serial Number</span>
            <div className="form__form-group-field">
              {
                this.state.product.serial ? <Input defaultValue={this.state.product.serial} disabled type="text" ref={node => (this.inputSerial = node)} /> : <Input disabled value="N/A" />
              }
            </div>
          </div>
          <div className="form__form-group form__form-group-id">
            <span className="form__form-group-label">Category</span>
            <div className="form__form-group-field">
              {
                this.state.product.category_code ? <Input defaultValue={this.state.product.category_code} disabled type="text" ref="category" name="category" /> : <Input disabled value="N/A" />
              }
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Weight Type</span>
            <div className="form__form-group-field">
              <Input type="select" ref="weightType" name="weightType">
                <option value={this.state.product.weight_type}>{this.state.product.weight_type}</option>
                {
                  this.state.weightType.map(Value => <option value={Value} key={Value}>{Value}</option>)
                }
              </Input>
            </div>
          </div>
          <div className="form__form-group form__form-group-id">
            <span className="form__form-group-label">Weight</span>
            <div className="form__form-group-field">
              {
                this.state.product.weight ? <Input defaultValue={this.state.product.weight} type="text" ref="weight" name="weight" /> : <Input ref="weight" name="weight" defaultValue="0" />
              }
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Quantity</span>
            <div className="form__form-group-field">
              {
                this.state.product.quantity ? <Input defaultValue={this.state.product.quantity} type="number" name="quantity" ref="quantity" /> : <Input name="quantity" ref="quantity" defaultValue="0" />
              }
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Price</span>
            <div className="form__form-group-field">
              {
                this.state.product.price ? <Input defaultValue={this.state.product.price} type="number" name="price" ref="price" /> : <Input ref="price" name="price" defaultValue="0" />
              }
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Description</span>
            <div className="form__form-group-field">
              {
                this.state.product.description ? <textarea defaultValue={this.state.product.description} type="text" name="description" ref="description" /> : <textarea type="text" name="description" ref="description" defaultValue="N/A" />
              }
            </div>
          </div>
          <div className="form_form-group">
            <ButtonToolbar className="form__button-toolbar">
              <Button color="primary" className="btn-block" type="submit">UPDATE PRODUCT</Button>
            </ButtonToolbar>
          </div>
        </form>
      );
    }
    return type;
  }
}

export default reduxForm({
  form: 'plant_add_form',
  enableReinitialize: true,
})(ProductEditForm);
