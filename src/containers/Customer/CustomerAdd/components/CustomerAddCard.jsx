import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import CustomerAddForm from './CustomerAddForm';

const CustomerAddCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Create New Client</h5>
        </div>
        <CustomerAddForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default CustomerAddCard;
