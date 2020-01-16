/* eslint-disable react/no-array-index-key */
/* eslint-disable */
import React, { PureComponent } from 'react';
import { 
  Card, 
  CardBody, 
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

class BuisinessCategories extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;

    return (
      <Col md={12} xl={3} lg={6} xs={12}>
        <Card>
        <CardBody className="dashboard__card-widget">
            <div className="card__title">
              <h3>BUISINESS NAME</h3>
              <h5 className="bold-text">{t('Transactions')}</h5>
            </div>
        </CardBody>
        </Card>
      </Col>
    );
  }
}

export default withTranslation('common')(BuisinessCategories);
