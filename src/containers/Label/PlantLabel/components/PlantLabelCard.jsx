import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import PlantLabelForm from './PlantLabelForm';

const PlantLabelCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Plant Label</h5>
        </div>
        <PlantLabelForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default PlantLabelCard;
