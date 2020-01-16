import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import BatchAddForm from './BatchAddForm';

const BatchAddCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Create New Batch</h5>
        </div>
        <BatchAddForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default BatchAddCard;
