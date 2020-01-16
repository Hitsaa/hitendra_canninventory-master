import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import InventoryEditForm from './InventoryEditForm';

const InventoryEditCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        { /* <div className="card__title">
          <h5 className="bold-text">Edit Inventory</h5>
        </div> */}
        <InventoryEditForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default InventoryEditCard;
