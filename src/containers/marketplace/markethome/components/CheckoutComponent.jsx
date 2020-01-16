/* eslint-disable */
import React, { PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import HorizontalLine from './HorizontalLine';
import CheckoutOrderHeading from './CheckoutOrderHeading';
import CheckoutOrderData from './CheckoutOrderData';
import renderRadioButtonField from '../../../../shared/components/form/RadioButton';
import CheckoutButton from './CheckoutButton';
import { Field, reduxForm } from 'redux-form';
import PlaceOrderButton from './PlaceOrderButton';

class CheckoutComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state ={
      selectedOption: 'option1'
    }
  }

  render() {
    return (
        <div className="checkout-container">
            <Row>
                <Col xs="7">
                <form className="form" onSubmit={this.handleSubmit}>
                      {/* {error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : null} */}
                      
                      <Row>
                        <Col xs="6">
                          <div className="form__form-group">
                            <span className="form__form-group-label">First Name</span>
                            <div className="form__form-group-field user-info-form">
                              <Field
                                name="firstName"
                                component="input"
                                ref={node => (this.inputFirstName = node)}
                                type="text"
                                placeholder="First Name"
                              />
                            </div>
                          </div>
                        </Col>
                        <Col xs="6">
                          <div className="form__form-group">
                            <span className="form__form-group-label">Last Name</span>
                            <div className="form__form-group-field user-info-form">
                              <Field
                                name="lastName"
                                component="input"
                                ref={node => (this.inputLastName = node)}
                                type="text"
                                placeholder="Last Name"
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col xs="6">
                          <div className="form__form-group">
                            <span className="form__form-group-label">Company Name</span>
                            <div className="form__form-group-field user-info-form">
                              <Field
                                name="companyName"
                                component="input"
                                ref={node => (this.inputFirstName = node)}
                                type="text"
                                placeholder="Company Name"
                              />
                            </div>
                          </div>
                        </Col>
                        <Col xs="6">
                          <div className="form__form-group">
                            <span className="form__form-group-label">Country</span>
                            <div className="form__form-group-field ">
                              <span className="form__form-group-label">United States (US)</span>
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col xs="6">
                          <div className="form__form-group">
                            <span className="form__form-group-label">Street Address</span>
                            <div className="form__form-group-field user-info-form">
                              <Field
                                name="streedAddress"
                                component="input"
                                ref={node => (this.inputFirstName = node)}
                                type="text"
                                placeholder="Street Address"
                              />
                            </div>
                          </div>
                        </Col>
                        <Col xs="6">
                          <div className="form__form-group">
                            <span className="form__form-group-label">Address 2</span>
                            <div className="form__form-group-field user-info-form">
                              <Field
                                name="address2"
                                component="input"
                                ref={node => (this.inputFirstName = node)}
                                type="text"
                                placeholder="Address2"
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>


                      <Row>
                        <Col xs="6">
                          <div className="form__form-group">
                            <span className="form__form-group-label">Town or City</span>
                            <div className="form__form-group-field user-info-form">
                              <Field
                                name="city"
                                component="input"
                                ref={node => (this.inputFirstName = node)}
                                type="text"
                                placeholder="Town or City"
                              />
                            </div>
                          </div>
                        </Col>
                        <Col xs="6">
                          <div className="form__form-group">
                            <span className="form__form-group-label">State</span>
                            <div className="form__form-group-field user-info-form">
                              <Field
                                name="state"
                                component="input"
                                ref={node => (this.inputFirstName = node)}
                                type="text"
                                placeholder="state"
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>


                      <Row>
                        <Col xs="6">
                          <div className="form__form-group">
                            <span className="form__form-group-label">ZIP</span>
                            <div className="form__form-group-field user-info-form">
                              <Field
                                name="zip"
                                component="input"
                                ref={node => (this.inputFirstName = node)}
                                type="text"
                                placeholder="ZIP"
                              />
                            </div>
                          </div>
                        </Col>

                        <Col xs="6">
                          <div className="form__form-group">
                            <span className="form__form-group-label">Phone</span>
                            <div className="form__form-group-field user-info-form">
                              <Field
                                name="state"
                                component="input"
                                ref={node => (this.inputFirstName = node)}
                                type="text"
                                placeholder="Phone"
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col xs="6">
                          <div className="form__form-group">
                            <span className="form__form-group-label">Email Address</span>
                            <div className="form__form-group-field user-info-form">
                              <Field
                                name="email"
                                component="input"
                                ref={node => (this.inputFirstName = node)}
                                type="text"
                                placeholder="Email Address"
                              />
                            </div>
                          </div>
                        </Col>

                        <Col xs="6">
                          <div className="form__form-group">
                            <span className="form__form-group-label">Order Notes</span>
                            <div className="form__form-group-field user-info-form">
                            <textarea name="body"/>
                            </div>
                          </div>
                        </Col>
                      </Row>

                  </form>
                </Col>
                <Col xs="4">
                  <h3>Your Order</h3>
                  <HorizontalLine />
                  <CheckoutOrderHeading headetitleleft="Product" headtitleright="Total" />
                  <CheckoutOrderData />
                  <CheckoutOrderHeading headetitleleft="Subtotal" headtitleright="$2500" />
              
                  <div className="radio-cont">
                    <h5>Masson Farms LLC Shopping</h5>
                  <div className="radio">
                    <label>
                      <input type="radio" value="option1" checked={this.state.selectedOption === 'option1'} />
                        Flat Rate
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="option2" checked={this.state.selectedOption === 'option2'} />
                        Free Shipping
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="option3" checked={this.state.selectedOption === 'option3'} />
                        Local Pickup
                    </label>
                  </div>
                  </div>

                  <CheckoutOrderHeading headetitleleft="Tax" headtitleright="$0.0" />
                  <CheckoutOrderHeading headetitleleft="Total" headtitleright="$2500" />

                  <div className='checkout-warning-p'>
                    <p>
                      Your personal data will be used to process your order, support your experience throughout this website, 
                      and for other purposes described in our privacy policy.
                    </p>
                  </div>

                  <div>
                      <PlaceOrderButton/>
                  </div>
                
                </Col>
                <Col xs="1"></Col>
            </Row>
        </div>
    );
  }
}
export default reduxForm({
  form: 'register_form', // a unique identifier for this form
})(CheckoutComponent);
//export default withTranslation('common')(CheckoutComponent);