import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import ClientAddForm from './ClientAddForm';

const ClientAddCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Upload .xlsx or .csv files</h5>
        </div>
        <ClientAddForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default ClientAddCard;
