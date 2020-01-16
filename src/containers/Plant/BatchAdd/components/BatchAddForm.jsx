/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
// import axios from 'axios';
// import PropTypes from 'prop-types';
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';

class BatchAddForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      msg: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const name = this.inputName.value;
    const description = this.inputDescription.value;
    if (name) {
      // eslint-disable-next-line no-console
      const bodyFormData = new FormData();
      bodyFormData.append('name', name);
      bodyFormData.append('description', description);

      const tokenStr = localStorage.getItem('cannave_token');
      const token = JSON.parse(tokenStr);
      const urls = `${process.env.API_ENDPOINT}/batches`;
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
          history.push('/batches/list', { forceRefresh: true });
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
          <span className="form__form-group-label">Batch Name</span>
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
          <span className="form__form-group-label">Description</span>
          <div className="form__form-group-field">
            <Field
              name="description"
              component="textarea"
              type="text"
              ref={node => (this.inputDescription = node)}
            />
          </div>
        </div>
        <div className="form_form-group">
          <ButtonToolbar className="form__button-toolbar">
            <Button color="primary" className="btn-block" type="submit">ADD NEW BATCH</Button>
          </ButtonToolbar>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'plant_add_form',
  enableReinitialize: true,
})(BatchAddForm);
