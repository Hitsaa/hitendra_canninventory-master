import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import TaxForm from './TaxForm';

const TaxCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Product Tax Settings(%)</h5>
        </div>
        <TaxForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default TaxCard;
