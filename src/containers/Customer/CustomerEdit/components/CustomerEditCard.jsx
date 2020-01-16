import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import CustomerEditForm from './CustomerEditForm';

const CustomerEditCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Update Patient</h5>
        </div>
        <CustomerEditForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default CustomerEditCard;
