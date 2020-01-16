import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import EmployeesListTable from './components/EmployeesListTable';

const EmployeesList = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Employees</h3>
      </Col>
    </Row>
    <Row>
      <EmployeesListTable />
    </Row>
  </Container>
);

export default EmployeesList;
