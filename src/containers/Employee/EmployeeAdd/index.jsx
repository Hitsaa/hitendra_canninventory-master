import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import EmployeeAddCard from './components/EmployeeAddCard';

const EmployeeAdd = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">New Employee</h3>
      </Col>
    </Row>
    <Row>
      <EmployeeAddCard />
    </Row>
  </Container>
);

export default EmployeeAdd;
