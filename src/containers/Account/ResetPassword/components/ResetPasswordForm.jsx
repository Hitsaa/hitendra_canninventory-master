/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';

class ResetPasswordForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      loading: false,
      error: false,
      msg: '',
    };

    this.showPassword = this.showPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

   handleRegister = () => {
   }

   // eslint-disable-next-line react/sort-comp
   showPassword() {
     this.state.showPassword = !this.showPassword;
   }

  handleStatus = (status) => {
    this.state.loading = status;
  };

  async handleSubmit(e) {
    e.preventDefault();
    const code = this.inputCode.value;
    const email = this.inputEmail.value;
    const password = this.inputPassword.value;
    const passwordConfirmation = this.inputPasswordConfirmation.value;
    if (code && password) {
    // eslint-disable-next-line no-console
      const bodyFormData = new FormData();
      bodyFormData.append('code', code);
      bodyFormData.append('email', email);
      bodyFormData.append('password', password);
      bodyFormData.append('password_confirmation', passwordConfirmation);

      const urls = `${process.env.AUTH_ENDPOINT}/reset`;
      axios({
        method: 'post',
        url: urls,
        data: bodyFormData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((response) => {
        if (!response.data.error) {
          const history = createHashHistory();
          history.push('/login', { forceRefresh: true });
        } else {
          this.setState({
            error: true,
            msg: response.data.message,
          });
        }
      }).catch((error) => {
        this.setState({
          error: true,
          msg: `An Error has occured.${error.message}`,
        });
      });
    }
  }

  render() {
    const { showPassword, error, msg } = this.state;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : null}
        <div className="form_form-group">Reset Code sent to your Email.</div>
        <div className="form__form-group">
          <span className="form__form-group-label">Enter Code</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Field
              name="code"
              component="input"
              required
              ref={node => (this.inputCode = node)}
              type="text"
              placeholder="Code"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Email</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Field
              name="email"
              component="input"
              required
              ref={node => (this.inputEmail = node)}
              type="text"
              placeholder="Email"
            />
          </div>
          <span className="form__form-group-label">New Password</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Field
              name="password"
              component="input"
              required
              ref={node => (this.inputPassword = node)}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
          </div>
          <span className="form__form-group-label">Re-enter Password</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Field
              name="password_confirmation"
              component="input"
              required
              ref={node => (this.inputPasswordConfirmation = node)}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password Confirmation"
            />
          </div>
          <div className="account__forgot-password">
            <a href="/login">Or Go to Login?</a>
          </div>
        </div>
        <div className="account__btns">
          <button className="btn btn-primary account__btn" type="submit">Reset Password</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'log_in_form', // a unique identifier for this form
})(ResetPasswordForm);
