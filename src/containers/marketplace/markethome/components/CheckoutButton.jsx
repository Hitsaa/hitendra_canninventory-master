/* eslint-disable */
import React, { PureComponent } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { withTranslation } from 'react-i18next';

class CheckoutButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
  }

  render() {
    const {rows} = this.state;
    return (
        <div className="checkout-btn-container">
            <Row>
                    <button>Proceed To Checkout</button>
            </Row>
        </div>
    );
  }
}
export default withTranslation('common')(CheckoutButton);