/* eslint-disable */
import React, { PureComponent } from 'react';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BuisinessCategories from './components/BuisinessCategories';
import BuisinessTitle from './components/BuisinessTitle';
import Cities from './components/Cities';
import SearchBar from './components/SearchBar';
import ProductMarketplace from './components/ProductMarketplace';
import Banner from './components/Banner';
import CheckoutComponent from './components/CheckoutComponent';

class POS extends PureComponent {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
  }

  handleSubmit = () => {
  };

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/dashboard" />;
    }

    return (
             <ProductMarketplace />
           // <CheckoutComponent />
    );
  }
}

const mapStateToProps = state => ({
  newOrder: state.newOrder,
});

export default connect(mapStateToProps)(POS);
