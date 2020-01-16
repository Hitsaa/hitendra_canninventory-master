/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';
import renderCheckBoxField from '../../../../shared/components/form/CheckBox';

class EmployeeAddForm extends PureComponent {
  constructor() {
    super();
    this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    console.log('opt', this.inputOptForMarkeitng.value);
    const firstName = this.inputFirstName.value;
    const lastName = this.inputLastName.value;
    const phoneNumber = this.inputPhoneNumber.value;
    const dob = this.inputDob.value;
    const zip = this.inputZip.value;
    const city = this.inputCity.value;
    const state = this.inputState.value;
    const address = this.inputAddress.value;
    const email = this.inputEmail.value;
    const patientLicense = this.inputPatientLicense.value;
    const gramsMonthlyLimit = this.inputGramsMonthlyLimit.value;
    const optForMarkeitng = this.inputOptForMarkeitng.value;
    const optValue = optForMarkeitng ? 1 : 0;
    const notes = this.inputNotes.value;
    if (firstName && lastName && phoneNumber && dob && zip && city
       && state && address && email && patientLicense && gramsMonthlyLimit) {
      // eslint-disable-next-line no-console
      console.log('opt', this.inputOptForMarkeitng.value);
      const bodyFormData = new FormData();
      bodyFormData.append('firstName', firstName);
      bodyFormData.append('lastName', lastName);
      bodyFormData.append('phoneNumber', phoneNumber);
      bodyFormData.append('dob', dob);
      bodyFormData.append('zip', zip);
      bodyFormData.append('city', city);
      bodyFormData.append('state', state);
      bodyFormData.append('address', address);
      bodyFormData.append('email', email);
      bodyFormData.append('patientLicense', patientLicense);
      bodyFormData.append('gramsMonthlyLimit', gramsMonthlyLimit);
      bodyFormData.append('notes', notes);
      bodyFormData.append('optForMarketing', optValue);
      const tokenStr = localStorage.getItem('cannave_token');
      const token = JSON.parse(tokenStr);
      const urls = `${process.env.API_ENDPOINT}/customers`;
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
          history.push('/customers/list', { forceRefresh: true });
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

  render() {
    const { error, msg } = this.state;
    return (
      <form className="form form form--horizontal" onSubmit={this.handleSubmit}>
        {error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : null}
        <div className="form__form-group">
          <span className="form__form-group-label">First Name</span>
          <div className="form__form-group-field">
            <Field
              name="first_name"
              component="input"
              type="text"
              ref={node => (this.inputFirstName = node)}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Last Name</span>
          <div className="form__form-group-field">
            <Field
              name="last_name"
              component="input"
              type="text"
              ref={node => (this.inputLastName = node)}
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
          <span className="form__form-group-label">Date of Birth</span>
          <div className="form__form-group-field">
            <Field
              name="dob"
              component="input"
              type="date"
              ref={node => (this.inputDob = node)}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Email Address</span>
          <div className="form__form-group-field">
            <Field
              name="email"
              component="input"
              type="text"
              ref={node => (this.inputEmail = node)}
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
          <span className="form__form-group-label">Patient License Number</span>
          <div className="form__form-group-field">
            <Field
              name="patientLicense"
              component="input"
              ref={node => (this.inputPatientLicense = node)}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Monthly Limit <span>(grams)</span></span>
          <div className="form__form-group-field">
            <Field
              name="gramsMonthlyLimit"
              component="input"
              ref={node => (this.inputGramsMonthlyLimit = node)}
              type="number"
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
        <div className="form__form-group">
          <span className="form__form-group-label">Opt for Marketing</span>
          <div className="form__form-group-field">
            <Field
              name="optMarketing"
              component={renderCheckBoxField}
              ref={node => (this.inputOptForMarkeitng = node)}
            />
          </div>
        </div>
        <div className="form_form-group">
          <ButtonToolbar className="form__button-toolbar">
            <Button color="primary" className="btn-block" type="submit">CREATE CLIENT</Button>
          </ButtonToolbar>
        </div>
      </form>
    );
  }
}
export default reduxForm({
  form: 'product_add_form', // a unique identifier for this form
})(EmployeeAddForm);
