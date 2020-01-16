/* eslint-disable react/no-children-prop */
import React, { PureComponent } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

class WizardFormOne extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  render() {
    const { handleSubmit } = this.props;
    // eslint-disable-next-line no-unused-vars
    const { showPassword } = this.state;

    return (
      <form className="form form--horizontal wizard__form" onSubmit={handleSubmit}>
        <h3 className="wizard__title">Labs Order Form</h3>
        <div className="form__form-group">
          <span className="form__form-group-label">Business Name</span>
          <div className="form__form-group-field">
            <Field
              name="username"
              component="input"
              type="text"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">City</span>
          <div className="form__form-group-field">
            <Field
              name="City"
              component="input"
              type="City"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">State</span>
          <div className="form__form-group-field">
            <Field
              name="State"
              component="input"
              type="State"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Zip Code</span>
          <div className="form__form-group-field">
            <Field
              name="Zip Code"
              component="input"
              type="Zip Code"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">OMMA License #</span>
          <div className="form__form-group-field">
            <Field
              name="OMMA License Number"
              component="input"
              type="OMMA License Number"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">E-mail</span>
          <div className="form__form-group-field">
            <Field
              name="email"
              component="input"
              type="email"
              placeholder="example@mail.com"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Name</span>
          <div className="form__form-group-field">
            <Field
              name="url"
              component="input"
              type="url"
              placeholder="John Smith"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Role</span>
          <div className="form__form-group-field">
            <Field
              name="url"
              component="input"
              type="url"
              placeholder=""
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Phone Number</span>
          <div className="form__form-group-field">
            <Field
              name="Phone Number"
              component="input"
              type="text"
              placeholder="555-555-5555"
            />
          </div>
        </div>
        <ButtonToolbar className="form__button-toolbar wizard__toolbar">
          <Button color="primary" type="button" disabled className="previous">Back</Button>
          <Button color="primary" type="submit" className="next">Next</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(WizardFormOne);
