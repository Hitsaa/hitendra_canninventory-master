/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';


class ForgotPasswordForm extends PureComponent {
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
    const email = this.inputEmail.value;
    if (email) {
    // eslint-disable-next-line no-console
      const bodyFormData = new FormData();
      bodyFormData.append('email', email);
      const urls = `${process.env.AUTH_ENDPOINT}/forgot`;
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
          history.push('/reset', { forceRefresh: true });
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
    const { error, msg } = this.state;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : null}
        <div className="form_form-group"><h4>Forgot Password Form</h4></div>
        <hr />
        <div className="form__form-group">
          <span className="form__form-group-label">Email Address</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Field
              name="email"
              component="input"
              required
              ref={node => (this.inputEmail = node)}
              type="text"
              placeholder="Email Address"
            />
          </div>
        </div>
        <div className="account__btns">
          <button className="btn btn-primary account__btn" type="submit">Submit Data</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'log_in_form', // a unique identifier for this form
})(ForgotPasswordForm);
