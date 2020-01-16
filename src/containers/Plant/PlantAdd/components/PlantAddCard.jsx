import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import PlantAddForm from './PlantAddForm';

const PlantAddCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Add Plant(s)</h5>
        </div>
        <PlantAddForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default PlantAddCard;
