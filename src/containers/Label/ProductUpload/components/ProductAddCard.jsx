import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import PlantAddForm from './ProductAddForm';

const PlantAddCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Upload .xlsx or .csv files</h5>
        </div>
        <PlantAddForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default PlantAddCard;
