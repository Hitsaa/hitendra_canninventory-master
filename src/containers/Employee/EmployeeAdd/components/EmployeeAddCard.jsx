import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import EmployeeAddForm from './EmployeeAddForm';

const EmployeeAddCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Create New Employee</h5>
        </div>
        <EmployeeAddForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default EmployeeAddCard;
