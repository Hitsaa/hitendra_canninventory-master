/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */

import React, { PureComponent } from 'react';
import {
  Button, ButtonToolbar, Card, CardBody, Col,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ProductForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      loaded: 'NOT_LOADED',
      id: 0,
    };
  }

  async componentDidMount() {
    // this.props.match.params.redirectParam;
    console.log('props', this.props);
    console.log('propps', this.routeProps);
    const id = 1;
    this.setState({ loader: 'LOADING', id });
    const product = await this.getProduct(id);
    this.setState({ product });
    console.log(product);
    this.setState({ loader: 'LOADED' });
  }

  getProduct = async (id) => {
    let product = null;
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT}/product/${id}`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      if (!response.data.error) {
        product = response.data.product;
        console.log(product);
      }
    }).catch((error) => {
      console.log(error);
    });
    return product;
  }

  render() {
    const { loader } = this.state;
    // console.log('rows1', this.state);
    let type = null;
    if (loader === 'LOADING') {
      type = <div className="load__icon-wrap"><svg className="load__icon"><path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg> </div>;
    }
    if (loader === 'LOADED') {
      type = (
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <div className="card__title">
                <h5 className="bold-text">Edit </h5>
              </div>
              <form className="form form--horizontal">
                <div className="form__form-group">
                  <span className="form__form-group-label">Title</span>
                  <div className="form__form-group-field">
                    <Field
                      name="title"
                      component="input"
                      type="text"
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Quantity</span>
                  <div className="form__form-group-field">
                    <Field
                      name="quantity"
                      component="input"
                      type="number"
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Sold</span>
                  <div className="form__form-group-field">
                    <Field
                      name="sold"
                      component="input"
                      type="number"
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Total</span>
                  <div className="form__form-group-field">
                    <Field
                      name="total"
                      type="text"
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Image URL</span>
                  <div className="form__form-group-field">
                    <Field
                      name="img"
                      component="input"
                      type="text"
                    />
                  </div>
                </div>
                <ButtonToolbar className="form__button-toolbar">
                  <Button color="primary" type="submit">Submit</Button>
                  <Link className="btn btn-secondary" to="/dashboard">Cancel</Link>
                </ButtonToolbar>
              </form>
            </CardBody>
          </Card>
        </Col>
      );
    }
    return type;
  }
}

export default reduxForm({
  form: 'product_add_form', // a unique identifier for this form
})(ProductForm);
