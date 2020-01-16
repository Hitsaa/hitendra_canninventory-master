/* eslint-disable */
import React, { PureComponent } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { withTranslation } from 'react-i18next';

class PlaceOrderButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
  }

  render() {
    const {rows} = this.state;
    return (
        <div className="placeorder-btn-container">
            <Row>
                    <button>Confirm Order</button>
            </Row>
        </div>
    );
  }
}
export default withTranslation('common')(PlaceOrderButton);