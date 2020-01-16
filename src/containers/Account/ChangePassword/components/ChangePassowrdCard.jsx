import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import ChangePassowrdForm from './ChangePassowrdForm';

const ChangePassowrdCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Account Management</h5>
        </div>
        <ChangePassowrdForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default ChangePassowrdCard;
