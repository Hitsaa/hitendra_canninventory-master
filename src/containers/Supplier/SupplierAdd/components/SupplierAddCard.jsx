import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import SupplierAddForm from './SupplierAddForm';

const SupplierAddCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Create New Supplier</h5>
        </div>
        <SupplierAddForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default SupplierAddCard;
