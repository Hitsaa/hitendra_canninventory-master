import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import UsersListTable from './components/UsersListTable';

const UsersList = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Users List</h3>
      </Col>
    </Row>
    <Row>
      <UsersListTable />
    </Row>
  </Container>
);

export default UsersList;
