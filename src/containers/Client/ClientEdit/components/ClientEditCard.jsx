import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import ClientEditForm from './ClientEditForm';

const ClientEditCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Update Client</h5>
        </div>
        <ClientEditForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default ClientEditCard;
