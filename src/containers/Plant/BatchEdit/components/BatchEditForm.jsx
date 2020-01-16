/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-unused-state */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-unised-vars */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable quote-props */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-unused-expression */
/* eslint-disable no-unused-expressions */
import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Input } from 'reactstrap';
import { reduxForm } from 'redux-form';
// import { matchPath } from 'react-router';
// import PropTypes from 'prop-types';
// import axios from 'axios';
// import PropTypes from 'prop-types';
// import { PropTypes } from 'react';
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';


class BatchEditForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      msg: '',
      batch: '',
      batchID: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ loader: 'LOADING' });
    const parts = window.location.hash.split('/');
    const batchID = parts.pop() || parts.pop();
    this.setState({ batchID });
    const batch = await this.getBatch(batchID);
    this.setState({ batch });
    this.setState({ loader: 'LOADED' });
  }

  getBatch = async (batchID) => {
    let batch = {};
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT}/batches/${batchID}`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.data.error) {
        batch = response.data.batch;
        this.setState({ batch: response.data.batch });
        console.log(response.data.batch);
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
    return batch;
  }

  async handleSubmit(e) {
    e.preventDefault();
    const name = this.refs.testForm.name.value;
    const description = this.refs.testForm.description.value;
    // eslint-disable-next-line no-console
    const bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('description', description);

    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const batchID = this.state.batchID;
    const urls = `${process.env.API_ENDPOINT}/batches/update/${batchID}`;
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
            <span className="form__form-group-label">Batch Name</span>
            <div className="form__form-group-field">
              <Input defaultValue={this.state.batch.name} type="text" name="name" ref="name" />
            </div>
          </div>
          <div className="form__form-group form__form-group-id">
            <span className="form__form-group-label">Batch Serial Number</span>
            <div className="form__form-group-field">
              <Input defaultValue={this.state.batch.batch_no} disabled type="text" ref={node => (this.inputSerial = node)} />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Description</span>
            <div className="form__form-group-field">
             <textarea defaultValue={this.state.batch.description} type="text" name="description" ref="description" />
            </div>
          </div>
          <div className="form_form-group">
            <ButtonToolbar className="form__button-toolbar">
              <Button color="primary" className="btn-block" type="submit">UPDATE BATCH</Button>
            </ButtonToolbar>
          </div>
        </form>
      );
    }
    return type;
  }
}

export default reduxForm({
  form: 'plant_add_form',
  enableReinitialize: true,
})(BatchEditForm);
