/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-unused-state */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
// import axios from 'axios';
// import PropTypes from 'prop-types';
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';
// import CurrencyUsdIcon from 'mdi-react/CurrencyUsdIcon';
// import TagIcon from 'mdi-react/TagIcon';
// import renderDropZoneMultipleField from '../../../../shared/components/form/DropZoneMultiple';
import renderSelectField from '../../../../shared/components/form/Select';

class CategoryAddForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      loaded: 'NOT_LOADED',
      plants: [],
      SKU: this.generateSKU(),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ loaded: 'LOADING' });
    const plants = await this.renderPlants();
    const SKU = this.generateSKU();
    this.setState({ SKU });
    this.setState({ plants });
    this.setState({ loaded: 'LOADED' });
  }

  generateSKU() {
    const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const serialLength = 10;
    let randomSerial = 'SKU';
    let randomNumber = 0;
    for (let i = 0; i < serialLength; i += 1) {
      randomNumber = Math.floor(Math.random() * chars.length);
      randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }
    return randomSerial;
  }

  async handleSubmit(e) {
    e.preventDefault();
    const plant = this.inputPlantID.value;
    const name = this.inputName.value;
    const sku = this.inputSKU.value;
    if (plant && name && sku) {
      // eslint-disable-next-line no-console
      const bodyFormData = new FormData();
      bodyFormData.append('plant_id', plant.value);
      bodyFormData.append('name', name);
      bodyFormData.append('sku', sku);
      const tokenStr = localStorage.getItem('cannave_token');
      const token = JSON.parse(tokenStr);
      const urls = `${process.env.API_ENDPOINT}/categories`;

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
          history.push('/categories/list', { forceRefresh: true });
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
  }

  async renderPlants() {
    const values = [];

    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT}/plants/`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      if (!response.data.error) {
        for (let i = 0; i < response.data.plants.length; i += 1) {
          values.push({
            value: response.data.plants[i].id,
            label: response.data.plants[i].name,
          });
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
    return values;
  }

  render() {
    const { plants, error, msg } = this.state;
    const { loaded } = this.state;
    const { SKU } = this.state;
    let type = null;
    if (loaded === 'LOADING') {
      type = <div className="load__icon-wrap"><svg className="load__icon"><path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg> </div>;
    }
    if (loaded === 'LOADED') {
      type = (
        <form className="form form form--horizontal" onSubmit={this.handleSubmit}>
          {error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : null}
          <div className="form__form-group">
            <span className="form__form-group-label">Plant Name</span>
            <div className="form__form-group-field">
              <Field
                name="plant_id"
                component={renderSelectField}
                type="text"
                ref={node => (this.inputPlantID = node)}
                options={plants}
              />
            </div>
          </div>
          <div className="form__form-group form__form-group-id">
            <span className="form__form-group-label">Category Name</span>
            <div className="form__form-group-field">
              <Field
                name="name"
                type="text"
                component="input"
                ref={node => (this.inputName = node)}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">SKU</span>
            <div className="form__form-group-field">
              <Field
                name="SKU"
                type="text"
                value={SKU}
                component="input"
                ref={node => (this.inputSKU = node)}
                disabled
              />
            </div>
          </div>
          <div className="form_form-group">
            <ButtonToolbar className="form__button-toolbar">
              <Button color="primary" className="btn-block" type="submit">CREATE NEW CATEGORY</Button>
            </ButtonToolbar>
          </div>
        </form>
      );
    }
    return type;
  }
}
export default reduxForm({
  form: 'category_add_form',
  initialValues: {
    SKU: `SKU${Math.floor(Math.random() * 99999999) + 10000000}`,
  },
  enableReinitialize: true,
})(CategoryAddForm);
