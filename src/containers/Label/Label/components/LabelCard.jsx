import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import LabelForm from './LabelForm';

const LabelCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Product Label</h5>
        </div>
        <LabelForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default LabelCard;
