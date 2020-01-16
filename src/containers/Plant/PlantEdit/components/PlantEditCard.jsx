import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import PlantEditForm from './PlantEditForm';

const PlantEditCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Update Plant</h5>
        </div>
        <PlantEditForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default PlantEditCard;
