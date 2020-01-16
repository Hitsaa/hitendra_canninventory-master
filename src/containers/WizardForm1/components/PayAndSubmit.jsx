/* eslint-disable react/no-children-prop */
import React, { PureComponent } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

class WizardFormOne extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    previousPage: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
    this.showResults = this.showResults.bind(this);
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  showResults = (values) => {
    (JSON.stringify(values, null, 2));
  }

  render() {
    const { handleSubmit, previousPage } = this.props;
    // eslint-disable-next-line no-unused-vars
    const { showPassword } = this.state;

    return (
      <form onSubmit={handleSubmit}>
        <h3 className="wizard__title">CheckOut Screen</h3>
        <br />
        <h4>Step 1</h4>
        <div className="form__form-group">
          <span className="form__form-group-label">Business Name</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">City</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">State</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Zip Code</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">OMMA License #</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">E-mail</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Name</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Role</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Phone Number</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <h4>Step 2</h4>
        <div className="form__form-group">
          <span className="form__form-group-label">Lab ID </span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Referred By</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Batch Number</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Strain/Product Name</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Sample Quantity</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Sample Weight Type</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Category</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Classification</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Production Method</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Batch Size/Weight</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Amount Per Serving Total</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Servings Per Container</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Material Description</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Container Description</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Test Type Requested</span>
          <div className="form__form-group-field">
            <Field
              component="input"
            />
          </div>
        </div>
        <div>
          <ButtonToolbar className="form__button-toolbar wizard__toolbar">
            <Button color="primary" type="button" className="previous" onClick={previousPage}>Back</Button>
            <Button color="primary" type="submit" className="next">Next</Button>
          </ButtonToolbar>
        </div>
        <div>
          <p>
            {this.showResults}
          </p>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(WizardFormOne);
