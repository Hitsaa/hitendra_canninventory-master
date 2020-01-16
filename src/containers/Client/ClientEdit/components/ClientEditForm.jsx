/* eslint-disable */
import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Input } from 'reactstrap';
import { reduxForm } from 'redux-form';
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';

class ClientEditForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      clientID: '',
      client: '',
      error: false,
      msg: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ loader: 'LOADING' });
    const parts = window.location.hash.split('/');
    const clientID = parts.pop() || parts.pop();
    this.setState({ clientID });
    const client = await this.getCustomer(clientID);
    this.setState({ client });
    this.setState({ loader: 'LOADED' });
  }

  getCustomer = async (clientID) => {
    let client = {};
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT}/customers/${clientID}`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.data.error) {
        client = response.data.client;
        this.setState({ client: response.data.client });
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
    return client;
  }

  async handleSubmit(e) {
    e.preventDefault();
    const firstName = this.refs.testForm.firstName.value;
    const lastName = this.refs.testForm.lastName.value;
    const phoneNumber = this.refs.testForm.phone.value;
    const zip = this.refs.testForm.zip.value;
    const city = this.refs.testForm.city.value;
    const state = this.refs.testForm.state.value;
    const address = this.refs.testForm.address.value;
    const email = this.refs.testForm.email.value;
    const businessName = this.refs.testForm.businessName.value;
    const businessLicenseNumber = this.refs.testForm.businessLicenseNumber.value;
    const notes = this.refs.testForm.notes.value;
    // eslint-disable-next-line no-consoles
    const bodyFormData = new FormData();
    bodyFormData.append('firstName', firstName);
    bodyFormData.append('lastName', lastName);
    bodyFormData.append('businessName', businessName);
    bodyFormData.append('businessLicenseNumber', businessLicenseNumber);
    bodyFormData.append('phoneNumber', phoneNumber);
    bodyFormData.append('zip', zip);
    bodyFormData.append('city', city);
    bodyFormData.append('state', state);
    bodyFormData.append('address', address);
    bodyFormData.append('email', email);
    bodyFormData.append('notes', notes);
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const urls = `${process.env.API_ENDPOINT}/clients/update/${this.state.clientID}`;
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
        history.push('/clients/list', { forceRefresh: true });
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
            <span className="form__form-group-label">First Name</span>
            <div className="form__form-group-field">
              <Input defaultValue={this.state.client.firstName} type="text" ref="firstName" name="firstName" />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Last Name</span>
            <div className="form__form-group-field">
              <Input defaultValue={this.state.client.lastName} type="text" ref="lastName" name="lastName" />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Business Name</span>
            <div className="form__form-group-field">
              <Input defaultValue={this.state.client.businessName} type="text" ref="businessName" name="businessName" />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Business License #NO</span>
            <div className="form__form-group-field">
              <Input defaultValue={this.state.client.businessLicenseNumber} type="text" ref="businessLicenseNumber" name="businessLicenseNumber" />
            </div>
          </div>
          <div className="form__form-group form__form-group-id">
            <span className="form__form-group-label">Phone Number</span>
            <div className="form__form-group-field">
              <Input defaultValue={this.state.client.phoneNumber} type="text" ref="phone" name="phone" />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Email Address</span>
            <div className="form__form-group-field">
              <Input defaultValue={this.state.client.email} type="text" ref="email" name="email" />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Address</span>
            <div className="form__form-group-field">
              <Input defaultValue={this.state.client.address} type="text" ref="address" name="address" />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Zip Code</span>
            <div className="form__form-group-field">
              <Input defaultValue={this.state.client.zipCode} type="text" ref="zip" name="zip" />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">City</span>
            <div className="form__form-group-field">
              <Input defaultValue={this.state.client.city} type="text" ref="city" name="city" />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">State</span>
            <div className="form__form-group-field">
              <Input defaultValue={this.state.client.state} type="text" ref="state" name="state" />
            </div>
          </div>
         
          <div className="form__form-group">
            <span className="form__form-group-label">Notes</span>
            <div className="form__form-group-field">
              <Input defaultValue={this.state.client.notes} type="text" ref="notes" name="notes" />
            </div>
          </div>
          <div className="form_form-group">
            <ButtonToolbar className="form__button-toolbar">
              <Button color="primary" className="btn-block" type="submit">UPDATE CLIENT</Button>
            </ButtonToolbar>
          </div>
        </form>
      );
    }
    return type;
  }
}

export default reduxForm({
  form: 'product_add_form', // a unique identifier for this form
})(ClientEditForm);
