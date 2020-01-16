import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import InventoryAddForm from './InventoryAddForm';

const InventoryAddCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Create New Inventory</h5>
        </div>
        <InventoryAddForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default InventoryAddCard;
