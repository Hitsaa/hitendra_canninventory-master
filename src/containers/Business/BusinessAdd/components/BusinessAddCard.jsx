import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import BusinessAddForm from './BusinessAddForm';

const BusinessAddCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Create New Client</h5>
        </div>
        <BusinessAddForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default BusinessAddCard;
