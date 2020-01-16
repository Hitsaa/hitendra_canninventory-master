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
          <span className="form__form-group-label">Lab ID </span>
          <div className="form__form-group-field">
            <Field
              name="username"
              component="input"
              type="text"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Referred By</span>
          <div className="form__form-group-field">
            <Field
              name="City"
              component="input"
              type="CannAvenue"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Batch Number</span>
          <div className="form__form-group-field">
            <Field
              name="State"
              component="input"
              type="State"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Strain/Product Name</span>
          <div className="form__form-group-field">
            <Field
              name="Zip Code"
              component="input"
              type="Zip Code"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Sample Quantity</span>
          <div className="form__form-group-field">
            <Field
              name="Weight"
              component="input"
              type="Weight"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Sample Weight Type</span>
          <div className="form__form-group-field">
            <Field
              name="email"
              component="input"
              type="email"
              placeholder=""
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Category</span>
          <div className="form__form-group-field">
            <Field
              name="url"
              component="input"
              type="url"
              placeholder="Flower, Edibles, Tincture, Topical, etc."
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Classification</span>
          <div className="form__form-group-field">
            <Field
              name="url"
              component="input"
              type="url"
              placeholder="Sativa, Indica, Hybrid, etc."
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Production Method</span>
          <div className="form__form-group-field">
            <Field
              name="Phone Number"
              component="input"
              type="text"
              placeholder="Indoor/Outdoor, GH, Co2, Infused, etc."
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Batch Size/Weight</span>
          <div className="form__form-group-field">
            <Field
              name="Phone Number"
              component="input"
              type="text"
              placeholder="555-555-5555"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Amount Per Serving Total</span>
          <div className="form__form-group-field">
            <Field
              name="Phone Number"
              component="input"
              type="text"
              placeholder="mgs per Serving"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Servings Per Container</span>
          <div className="form__form-group-field">
            <Field
              name="Phone Number"
              component="input"
              type="text"
              placeholder="(Total mgs per Container)"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Material Description</span>
          <div className="form__form-group-field">
            <Field
              name="Phone Number"
              component="input"
              type="text"
              placeholder="Candy, Chocolate, Liquid, etc."
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Container Description</span>
          <div className="form__form-group-field">
            <Field
              name="Phone Number"
              component="input"
              type="text"
              placeholder="Vac Sealed, Jar, Glass, etc."
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Test Type Requested</span>
          <div className="form__form-group-field">
            <Field
              name="Phone Number"
              component="input"
              type="text"
              placeholder="Full Spectrum, Mini Pkg, etc."
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
