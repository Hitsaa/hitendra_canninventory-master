/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
/* eslint-disable */
import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';
import renderCheckBoxField from '../../../../shared/components/form/CheckBox';


class LogInForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      loading: false,
      error: false,
      msg: '',
      isTermsChecked: false
    };

    this.showPassword = this.showPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }

   handleRegister = () => {
     
   }

  handleTermsButton(){
    this.setState({isTermsChecked: true});
    this.updateTerms();
  }   

   confirmTermsDialog(){
    let ref = this;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom_terms_dialog'>
              <h3>Accept Terms</h3>
              
                <div className='terms_row'>
                  <p>Before login please review and agree to our</p> 
                  <button onClick={() => { this.goToTerms(); onClose(); }}>Terms Of Services</button>
                </div> 
    
                <div className="btn_div">
                    <button onClick={() => { this.handleTermsButton(); onClose(); }}>
                      Yes
                    </button>
                </div>
          </div>
        );
      }
    });
  }

   // eslint-disable-next-line react/sort-comp
   showPassword(e) {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  }

   showMessage = (message, type) => {
    if(type == "error"){
      toast.error(message);
    }else if(type == "success"){
      toast.success(message);
    }
  }

  handleStatus = (status) => {
    this.state.loading = status;
  };

  onCheckboxChange = (ischecked) => {
    console.log(ischecked);
  }

  goToTerms(){
    const history = createHashHistory();
    history.push('/termsofservice', { forceRefresh: true });
  }

  updateTerms = () => {
    // eslint-disable-next-line no-console
    const bodyFormData = new FormData();
    bodyFormData.append('hasAcceptedTerms', "true");
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const urls = `${process.env.API_ENDPOINT}/terms`;
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
       // this.showMessage("Thanks for accepting Terms and Services", "success");
        localStorage.setItem('cannave_user', JSON.stringify(response.data.user));
        this.showMessage("Terms accepted successfully, Please login", "success");
      } else {
        this.showMessage("Something went wrong while accepting terms, Please try again", "error");
      }
    }).catch((error) => {
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const email = this.inputEmail.value;
    const password = this.inputPassword.value;
    if (email && password) {
    // eslint-disable-next-line no-console
      const bodyFormData = new FormData();
      bodyFormData.append('email', email);
      bodyFormData.append('password', password);

      const urls = `${process.env.AUTH_ENDPOINT}/login`;
      axios({
        method: 'post',
        url: urls,
        data: bodyFormData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((response) => {
        if (!response.data.error) {
            console.log(response.data);
            localStorage.setItem('cannave_user', JSON.stringify(response.data.user));
            localStorage.setItem('cannave_token', JSON.stringify(response.data.token));
            if((response.data.user.hasAcceptedTerms == "true" && this.state.isTermsChecked)){
              this.navToDashboard(response);
              // this.confirmTermsDialog();
            }else{
                this.confirmTermsDialog();
          }
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
      }).then((response) =>
      this.navToDashboard(response));
    }else{
      this.showMessage("Please enter username and password", "error");
    }
  }

  navToDashboard(response){
    const history = createHashHistory();
    history.push('/dashboard', { forceRefresh: true });
    history.go('/dashboard', { forceRefresh: true });
  }

  render() {
    const { showPassword, error, msg} = this.state;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : null}
        <div className="form__form-group">
          <span className="form__form-group-label">Username</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Field
              name="username"
              component="input"
              ref={node => (this.inputEmail = node)}
              type="text"
              placeholder="Name"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Password</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Field
              name="password"
              component="input"
              ref={node => (this.inputPassword = node)}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
            <button
              type="button"
              className={`form__form-group-button${showPassword ? ' active' : ''}`}
              onClick={e => this.showPassword(e)}
            ><EyeIcon />
            </button>
          </div>
          <div className="account__forgot-password">
            <Link to="/forgot">Forgot your password?</Link>
          </div>
        </div>
        <div className="form__form-group">
          <div className="form__form-group-field">
            <Field
              name="remember_me"
              component={renderCheckBoxField}
              label="Remember me"
            />
          </div>
        </div>
        <ToastContainer autoClose={3000} />
        <div className="account__btns">
          <button className="btn btn-primary account__btn" type="submit">Sign In</button>          
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'log_in_form', // a unique identifier for this form
})(LogInForm);
