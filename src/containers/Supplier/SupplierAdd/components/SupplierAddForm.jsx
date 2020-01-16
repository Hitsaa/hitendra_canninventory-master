/* eslint-disable */
import React, { PureComponent } from 'react';
import { Button, ButtonToolbar,Col } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';
import renderSelectField from '../../../../shared/components/form/Select';


class SupplierAddForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      error: false,
      msg: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const businessName = this.inputBusinessName.value;
    const phoneNumber = this.inputPhoneNumber.value;
    const zip = this.inputZip.value;
    const city = this.inputCity.value;
    const state = this.inputState.value;
    const address = this.inputAddress.value;
    const emailAddress = this.inputEmailAddress.value;
    const businessLicense = this.inputBusinessLicense.value;
    const notes = this.inputNotes.value;
    const role = this.inputRole.value;
    if (businessName && phoneNumber && zip && city
       && state && address && businessLicense && emailAddress) {
      // eslint-disable-next-line no-console
      const bodyFormData = new FormData();
      bodyFormData.append('businessName', businessName);
      bodyFormData.append('phone', phoneNumber);
      bodyFormData.append('zip', zip);
      bodyFormData.append('city', city);
      bodyFormData.append('state', state);
      bodyFormData.append('email', emailAddress);
      bodyFormData.append('address', address);
      bodyFormData.append('notes', notes);
      bodyFormData.append('role', role.value);
      bodyFormData.append('businessLicenseNumber', businessLicense);
      const tokenStr = localStorage.getItem('cannave_token');
      const token = JSON.parse(tokenStr);
      const urls = `${process.env.API_ENDPOINT}/suppliers`;
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
          history.push('/suppliers/list', { forceRefresh: true });
        }
        console.log(response);
      });
    }
  }

  render() {
    const { error, msg } = this.state;
    return (
      <form className="form form form--horizontal" onSubmit={this.handleSubmit}>
        {error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : null}
        <Col md={6} lg={6}>
        <div className="form__form-group">
          <span className="form__form-group-label">Business Name</span>
          <div className="form__form-group-field">
            <Field
              name="business_name"
              component="input"
              type="text"
              ref={node => (this.inputBusinessName = node)}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Role</span>
          <div className="form__form-group-field">
            <Field
              name="role"
              component={renderSelectField}
              type="text"
              required
              ref={node => (this.inputRole = node)}
              options={[
                { value: 'GROWER', label: 'GROWER' },
                { value: 'PROCESSOR', label: 'PROCESSOR'},
              ]}
            />
          </div>
        </div>
        <div className="form__form-group form__form-group-id">
          <span className="form__form-group-label">Phone Number</span>
          <div className="form__form-group-field">
            <Field
              name="phone_number"
              component="input"
              type="text"
              ref={node => (this.inputPhoneNumber = node)}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Email Address</span>
          <div className="form__form-group-field">
            <Field
              name="email_address"
              component="input"
              type="email"
              ref={node => (this.inputEmailAddress = node)}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Address</span>
          <div className="form__form-group-field">
            <Field
              name="address"
              component="input"
              type="text"
              ref={node => (this.inputAddress = node)}
            />
          </div>
        </div>
        </Col>
        <Col md={6} lg={6}>
        <div className="form__form-group">
          <span className="form__form-group-label">Zip Code</span>
          <div className="form__form-group-field">
            <Field
              name="zipCode"
              component="input"
              type="number"
              ref={node => (this.inputZip = node)}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">City</span>
          <div className="form__form-group-field">
            <Field
              name="city"
              component="input"
              type="text"
              ref={node => (this.inputCity = node)}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">State</span>
          <div className="form__form-group-field">
            <Field
              name="state"
              component="input"
              type="text"
              ref={node => (this.inputState = node)}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Business License Number</span>
          <div className="form__form-group-field">
            <Field
              name="businessLicense"
              component="input"
              ref={node => (this.inputBusinessLicense = node)}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Notes</span>
          <div className="form__form-group-field">
            <Field
              name="notes"
              component="textarea"
              ref={node => (this.inputNotes = node)}
              type="text"
            />
          </div>
        </div>
        </Col>
        <div className="form_form-group">
          <ButtonToolbar className="form__button-toolbar">
            <Button color="primary" className="btn-block" type="submit">CREATE SUPPLIER</Button>
          </ButtonToolbar>
        </div>
      </form>
    );
  }
}
export default reduxForm({
  form: 'product_add_form', // a unique identifier for this form
})(SupplierAddForm);
