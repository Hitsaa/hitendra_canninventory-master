/* eslint-disable */
import React, { PureComponent } from 'react';
import { Row, Col, Label } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import HorizontalLine from './HorizontalLine';

class CheckoutOrderData extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <div className="checkout-order-head">
            <Row>
                <Col xs="5">
                <h5>Bid Bud * 1</h5>
                </Col>
                <Col xs="7">
                <h5>$2500</h5>
                </Col>
                <h6> Store </h6> <br/>
                <h6> Mason Farm LLC </h6>
                <HorizontalLine />
            </Row>
        </div>
    );
  }
}
export default withTranslation('common')(CheckoutOrderData);