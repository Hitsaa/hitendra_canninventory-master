/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable  react/no-access-state-in-setstate */
import React, { PureComponent } from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import Products from './components/addProducts';
import ProductList from './components/productList';
// import SideCart from './components/sideCart';

class POS extends PureComponent {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      hascart: false,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    if (!location.state) {
      this.setState({ redirect: true });
    } else {
      console.log(location.state.manage, location.state.selectedCartID);
      if (location.state.manage) {
        if (location.state.selectedCartID) {
          this.setState({ hascart: true });
        } else {
          this.setState({ redirect: true });
        }
      }
    }
  }

  handleSubmit = () => {
  };

  render() {
    const { redirect, hascart } = this.state;
    // console.log('rows1', this.state);
    let type = null;
    if (redirect) {
      return <Redirect to="/dashboard" />;
    }
    type = (
      <Container className="dashboard">
        <Row>
          <Col>
            <ProductList editable={hascart} />
          </Col>
        </Row>
      </Container>
    );
    return type;
  }
}


const mapStateToProps = state => ({
  newOrder: state.newOrder,
});

export default connect(mapStateToProps)(POS);
