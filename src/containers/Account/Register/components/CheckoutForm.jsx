/* eslint-disable */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import createHashHistory from 'history/createHashHistory';
import {
    CardElement,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    PaymentRequestButtonElement,
    IbanElement,
    IdealBankElement,
    StripeProvider,
    Elements,
    injectStripe,
} from 'react-stripe-elements';
import renderCheckBoxField from '../../../../shared/components/form/CheckBox';
import renderRadioButtonField from '../../../../shared/components/form/RadioButton';
import {
    Button, Input, Col, Row
} from 'reactstrap';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {
            showPassword: false,
            msg: '',
            error: false,
            isTermsChecked: false,
            bodyFormData: '',
            plan: '',
            btnStatus: false,
        };
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        // this.onPlanChanged = this.onPlanChanged.bind(this);
    }

    async submit(ev) {

        console.log('plan seletced', this.state.plan);

        if (!(this.state.isTermsChecked)) {
            this.showMessage("Please review and accept terms & conditions before SignUp", "error");
        } else {
            this.setState({
                btnStatus: true,
            });
            let { token } = await this.props.stripe.createToken({ name: "Name" }).then(({ token, error }) => {
                if (error) {
                    this.showMessage(error.message, "error");
                    this.setState({
                        btnStatus: false,
                    });
                } else {

                    console.log("props", this.props.formData);
                    console.log("token", token.id);

                    const data = this.props.formData;
                    const bodyFormData = new FormData();
                    bodyFormData.append('firstName', data.firstName);
                    bodyFormData.append('lastName', data.lastName);
                    bodyFormData.append('phone', data.phone);
                    bodyFormData.append('zip', data.zip);
                    bodyFormData.append('city', data.city);
                    bodyFormData.append('state', data.state);
                    bodyFormData.append('address', data.address);
                    bodyFormData.append('email', data.email);
                    bodyFormData.append('password', data.password);
                    bodyFormData.append('licenseNo', data.licenseNo);
                    bodyFormData.append('businessName', data.businessName);
                    bodyFormData.append('role', data.role);
                    bodyFormData.append('hasAcceptedTerms', "true");
                    bodyFormData.append('token', token.id);
                    bodyFormData.append('plan', this.state.plan);

                    const urls = `${process.env.AUTH_ENDPOINT}/register`;
                    axios({
                        method: 'post',
                        url: urls,
                        data: bodyFormData,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }).then((response) => {
                        if (!response.data.error) {
                            this.showMessage("Congratulations, the account has been created successfully", "success");
                            localStorage.setItem('cannave_user', JSON.stringify(response.data.user));
                            localStorage.setItem('cannave_token', JSON.stringify(response.data.token));
                            const history = createHashHistory();
                            history.push('/dashboard', { forceRefresh: true });
                            history.go('/dashboard', { forceRefresh: true });
                        } else {
                            this.showMessage(response.data.message, "error");
                            this.setState({
                                error: true,
                                msg: response.data.message,
                                btnStatus: false,
                            });
                        }
                    }).catch((error) => {
                        this.showMessage(response.data.message, "error");
                        this.setState({
                            error: true,
                            msg: error.message,
                            btnStatus: false,
                        });
                    });
                }
            });

        }
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
    onPlanChanged(event) {
        console.log('checked', event);
        this.state.plan = event;
    }

    render() {
        let { btnStatus } = this.state;
        return (
            <div className="checkout">
                <h4>Billing Details</h4>
                <br />
                <form className="form form form--horizontal">
                    <Row>
                        <Col md={6} lg={6}>
                            <div className="form__form-group">
                                <span className="form__form-group-label">$119/Mo* Pay one time annually <b>$1425</b></span>
                                <div className="form__form-group-field">
                                    <Field
                                        name="plan"
                                        component={renderRadioButtonField}
                                        label=""
                                        defaultChecked="true"
                                        ref={node => (this.inputPlan = node)}
                                        onChange={this.onPlanChanged.bind(this, 'yearly')}
                                        radioValue="yearly"
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col md={6} lg={6}>
                            <div className="form__form-group">
                                <span className="form__form-group-label">$129/Mo* Pay Monthly <b>$129</b></span>
                                <div className="form__form-group-field">
                                    <Field
                                        name="plan"
                                        component={renderRadioButtonField}
                                        label=""
                                        onChange={this.onPlanChanged.bind(this, 'monthly')}
                                        ref={node => (this.inputPlan = node)}
                                        value="monthly"
                                    />
                                    {/* <input type="radio" onChange={this.onPlanChanged.bind(this, 'maintain_licence', 'yes')} checked={this.state.plan === 'yearly'} value="yearly" name="plan" /><span>Yes</span> */}

                                </div>
                            </div>
                        </Col>
                    </Row>
                </form>
                <div>
                    <p>Enter credit card details</p>
                    {/* <CardElement /> */}
                    {/* <label> */}
                    {/* <div className="form__form-group">
            <span className="form__form-group-label">Last Name</span>
            <div className="form__form-group-field">
             
              <Field
                name="lastName"
                component={CardNumberElement}
                ref={node => (this.inputLastName = node)}
                type="text"
                placeholder="Last Name"
              />
              
            </div>
          </div> */}
                    <Col md={6} lg={6}>
                        Card Number
                </Col> <Col md={8} lg={8}>
                        <CardNumberElement className="card-element" placeholder="" style={{ base: { fontSize: '16px' } }} />
                    </Col>
                    <Col md={6} lg={6}>
                        Card Expiry
                </Col> <Col md={8} lg={8}>
                        <CardExpiryElement className="card-element" placeholder="" style={{ base: { fontSize: '16px' } }} />
                    </Col>
                    <Col md={6} lg={6}>
                        Card CVC
                </Col> <Col md={8} lg={8}>
                        <CardCvcElement className="card-element" placeholder="" style={{ base: { fontSize: '16px' } }} />
                    </Col>
                    <br />
                </div>
                <div className="form__form-group">
                    <div className="form__form-group-field">
                        <Field
                            name="toc"
                            component={renderCheckBoxField}
                            label=""
                            selected
                            onChange={this.onCheckboxChange}
                        />
                        <div>
                            <p>By clicking Sign Up, you agree to our <Link to="/termsofservice">Terms Of Services</Link></p>
                        </div>
                    </div>
                </div>
                <ToastContainer autoClose={3000} />
                <br />
                <button disabled={btnStatus} className="btn btn-primary account__btn btn-block" onClick={this.submit}>Pay Now and Create Account</button>

            </div>
            // <
            // PaymentRequestButtonElement className = "PaymentRequestButton"
            // onBlur = { handleBlur }
            // onClick = { handleClick }
            // onFocus = { handleFocus }
            // onReady = { handleReady }
            // // paymentRequest = { this.state.paymentRequest }
            // style = {
            //     {
            //         paymentRequestButton: {
            //             theme: 'dark',
            //             height: '64px',
            //             type: 'donate',
            //         },
            //     }
            // }
            // />
        );
    }
}

export default injectStripe(CheckoutForm);