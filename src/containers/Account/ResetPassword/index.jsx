import React from 'react';
import { Link } from 'react-router-dom';
import ResetPasswordForm from './components/ResetPasswordForm';

const ResetPassword = () => (
  <div className="account">
    <div className="account__wrapper">
      <div className="account__card">
        <div className="account__head">
          <h3 className="account__title">Welcome to
            <span className="account__logo"> Cann
              <span className="account__logo-accent">Inventory</span>
            </span>
          </h3>
          <h4 className="account__subhead subhead">Start your business easily</h4>
        </div>
        <ResetPasswordForm onSubmit />
        <div className="account__have-account">
          <p>Dont have an account yet? <Link to="/register">Create Account</Link></p>
        </div>
      </div>
    </div>
  </div>
);

export default ResetPassword;
