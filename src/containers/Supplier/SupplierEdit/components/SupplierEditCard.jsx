import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import SupplierEditForm from './SupplierEditForm';

const SupplierEditCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Update Supplier</h5>
        </div>
        <SupplierEditForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default SupplierEditCard;
