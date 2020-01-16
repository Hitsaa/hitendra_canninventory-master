import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import BatchEditForm from './BatchEditForm';

const BatchEditCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Update Batch</h5>
        </div>
        <BatchEditForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default BatchEditCard;
