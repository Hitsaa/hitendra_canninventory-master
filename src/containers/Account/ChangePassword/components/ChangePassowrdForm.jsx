/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import createHashHistory from 'history/createHashHistory';
import axios from 'axios';

class ProductAddForm extends PureComponent {
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
    const password = this.inputPassword.value;
    const confirmation = this.inputConfirm.value;
    if (password && confirmation) {
    // eslint-disable-next-line no-console
      const bodyFormData = new FormData();
      bodyFormData.append('password', password);
      bodyFormData.append('confirmation', confirmation);
      const tokenStr = localStorage.getItem('cannave_token');
      const token = JSON.parse(tokenStr);
      const urls = `${process.env.API_ENDPOINT}/changePassword`;
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
          history.push('/dashboard', { forceRefresh: true });
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
    const { msg, error } = this.state;
    return (
      <form className="form product-edit" onSubmit={this.handleSubmit}>
        {error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : null}
        <div className="form__form-group">
          <span className="form__form-group-label">New Password</span>
          <div className="form__form-group-field">
            <Field
              name="password"
              type="password"
              component="input"
              ref={node => (this.inputPassword = node)}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Confirm Password </span>
          <div className="form__form-group-field">
            <Field
              name="confirmation"
              component="input"
              ref={node => (this.inputConfirm = node)}
              type="password"
            />
          </div>
        </div>
        <div className="form_form-group">
          <ButtonToolbar className="form__button-toolbar">
            <Button color="primary" type="submit">Save</Button>
          </ButtonToolbar>
        </div>
      </form>
    );
  }
}
export default reduxForm({
  form: 'product_add_form', // a unique identifier for this form
})(ProductAddForm);
