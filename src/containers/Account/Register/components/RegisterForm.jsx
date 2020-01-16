/* eslint-disable */
import React, { PureComponent } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { CardElement } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import MailRuIcon from 'mdi-react/MailRuIcon';
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneIcon from 'mdi-react/PhoneIcon';
import renderSelectField from '../../../../shared/components/form/Select';
import renderCheckBoxField from '../../../../shared/components/form/CheckBox';

class RegisterForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      msg: '',
      error: false,
      isTermsChecked: false,
      bodyFormData: '',
      registerDetails: true,
      btnStatus: false,
      select: [{
        value: 'GROWER',
        label: 'GROWER',
      }, {
        value: 'PROCESSOR',
        label: 'PROCESSOR',
      }, {
        value: 'RETAILER',
        label: 'RETAILER',
      },
      ],
    };

    this.showPassword = this.showPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }

  showPassword(e) {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  }

  showMessage = (message, type) => {
    if (type == "error") {
      toast.error(message);
    } else if (type == "success") {
      toast.success(message);
    }
  }

  onCheckboxChange = (ischecked) => {
    this.setState({ isTermsChecked: ischecked })
  }

  async handleSubmit(e) {
    e.preventDefault();
    const firstName = this.inputFirstName.value;
    const lastName = this.inputLastName.value;
    const phone = this.inputPhone.value;
    const zip = this.inputZip.value;
    const city = this.inputCity.value;
    const state = this.inputState.value;
    const address = this.inputAddress.value;
    const email = this.inputEmail.value;
    const password = this.inputPassword.value;
    const licenseNo = this.inputLicenseNo.value;
    const businessName = this.inputBusinessName.value;
    const role = this.inputRole.value;

    if (!(firstName && lastName && phone && zip && city && state
      && address && email && password && licenseNo && businessName && role)) {
      this.showMessage("All fields are required", "error");
    }
    //  else if (!(this.state.isTermsChecked)) {
    //   this.showMessage("Please review and accept terms & conditions before SignUp", "error");
    // } 
    else {
      console.log(this);
      // eslint-disable-next-line no-console
      const bodyFormData = new FormData();
      bodyFormData.append('firstName', firstName);
      bodyFormData.append('lastName', lastName);
      bodyFormData.append('phone', phone);
      bodyFormData.append('zip', zip);
      bodyFormData.append('city', city);
      bodyFormData.append('state', state);
      bodyFormData.append('address', address);
      bodyFormData.append('email', email);
      bodyFormData.append('password', password);
      bodyFormData.append('licenseNo', licenseNo);
      bodyFormData.append('businessName', businessName);
      bodyFormData.append('role', role.value);
      // bodyFormData.append('hasAcceptedTerms', "true");
      let data = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        zip: zip,
        city: city,
        state: state,
        address: address,
        email: email,
        password: password,
        licenseNo: licenseNo,
        businessName: businessName,
        role: role.value,
      }
      this.state.bodyFormData = data;
      console.log('data to be passed', this.state.bodyFormData);
      this.setState({ registerDetails: false });

      // const urls = `${process.env.AUTH_ENDPOINT}/register`;
      // axios({
      //   method: 'post',
      //   url: urls,
      //   data: bodyFormData,
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      // }).then((response) => {
      //   if (!response.data.error) {
      //     localStorage.setItem('cannave_user', JSON.stringify(response.data.user));
      //     localStorage.setItem('cannave_token', JSON.stringify(response.data.token));
      //     const history = createHashHistory();
      //     history.push('/dashboard', { forceRefresh: true });
      //     history.go('/dashboard', { forceRefresh: true });
      //   } else {
      //     this.setState({
      //       error: true,
      //       msg: response.data.message,
      //     });
      //   }
      // }).catch((error) => {
      //   this.setState({
      //     error: true,
      //     msg: error.message,
      //   });
      // });
    }
  }

  renderTypes() {
    const values = [];
    for (let i = 0; i < this.state.select.length; i += 1) {
      values.push({
        label: this.state.select[i].label,
        value: this.state.select[i].value,
      });
    }
    return values;
  }

  render() {
    const { showPassword, error, msg } = this.state;
    let { bodyFormData, registerDetails, btnStatus } = this.state;

    let type = null;

    // <div>
    if (registerDetails) {
      type = (
        <form className="form" onSubmit={this.handleSubmit}>
          {error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : null}
          <div className="form__form-group">
            <span className="form__form-group-label">First Name</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <AccountOutlineIcon />
              </div>
              <Field
                name="firstName"
                component="input"
                ref={node => (this.inputFirstName = node)}
                type="text"
                placeholder="First Name"
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Last Name</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <AccountOutlineIcon />
              </div>
              <Field
                name="lastName"
                component="input"
                ref={node => (this.inputLastName = node)}
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Phone</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <PhoneIcon />
              </div>
              <Field
                name="phone"
                component="input"
                ref={node => (this.inputPhone = node)}
                type="text"
                placeholder="phone"
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Zip Code</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <KeyVariantIcon />
              </div>
              <Field
                name="zip"
                component="input"
                ref={node => (this.inputZip = node)}
                type="text"
                placeholder="zip"
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">City</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <AccountOutlineIcon />
              </div>
              <Field
                name="city"
                component="input"
                ref={node => (this.inputCity = node)}
                type="text"
                placeholder="City"
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">State</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <AccountOutlineIcon />
              </div>
              <Field
                name="state"
                component="input"
                ref={node => (this.inputState = node)}
                type="text"
                placeholder="State"
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Address</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <MailRuIcon />
              </div>
              <Field
                name="address"
                component="input"
                ref={node => (this.inputAddress = node)}
                type="text"
                placeholder="address"
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Business License No</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <AccountOutlineIcon />
              </div>
              <Field
                name="licenseNo"
                component="input"
                ref={node => (this.inputLicenseNo = node)}
                type="text"
                placeholder="Licence No"
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Business Name</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <AccountOutlineIcon />
              </div>
              <Field
                name="businessName"
                component="input"
                ref={node => (this.inputBusinessName = node)}
                type="text"
                placeholder="Business Name"
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">User Type(Role)</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <AccountOutlineIcon />
              </div>
              <Field
                name="role"
                component={renderSelectField}
                type="text"
                ref={node => (this.inputRole = node)}
                options={this.renderTypes()}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">E-mail</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <MailRuIcon />
              </div>
              <Field
                name="email"
                component="input"
                ref={node => (this.inputEmail = node)}
                type="email"
                placeholder="example@mail.com"
              />
            </div>
          </div>
          <div className="form__form-group form__form-group--forgot">
            <span className="form__form-group-label">Password</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <KeyVariantIcon />
              </div>
              <Field
                name="password"
                component="input"
                ref={node => (this.inputPassword = node)}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
              />
              <button
                type="button"
                className={`form__form-group-button${showPassword ? ' active' : ''}`}
                onClick={e => this.showPassword(e)}
              ><EyeIcon />
              </button>
            </div>
          </div>

          <ToastContainer autoClose={3000} />
          <div className="account__btns">
            <button className="btn btn-primary account__btn" type="submit">Next(Payment Details)</button>
          </div>

        </form>
      );
    } else {
      type = (
        <StripeProvider apiKey="pk_test_G7rgflswzxrIOTgg7XJoLOtI00snYSGLU8">
         {/* <StripeProvider apiKey="pk_live_hq4Gcf7TAnpBHmPUeSaWySER00ecXO7Zwv"> */}
          <div className="example">
            {/* <h1>React Stripe Elements Example</h1> */}
            <Elements>
              <CheckoutForm formData={bodyFormData} />
            </Elements>

          </div>
        </StripeProvider>
      );
    }
    // </div>

    // );
    return type;
  }
}

export default reduxForm({
  form: 'register_form', // a unique identifier for this form
})(RegisterForm);
