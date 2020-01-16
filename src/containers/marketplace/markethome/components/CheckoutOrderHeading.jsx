/* eslint-disable */
import React, { PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import HorizontalLine from './HorizontalLine';
import PropTypes from 'prop-types';
class CheckoutOrderHeading extends PureComponent {
  static propTypes = {
    headetitleleft: PropTypes.string,
    headtitleright: PropTypes.string,
  };
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <div className="checkout-order-head">
            <Row>
                <Col xs="5">
                  <h4>{this.props.headetitleleft}</h4>
                </Col>
                <Col xs="7">
                  <h4>{this.props.headtitleright}</h4>
                </Col>
                <HorizontalLine />
            </Row>
        </div>
    );
  }
}
export default withTranslation('common')(CheckoutOrderHeading);