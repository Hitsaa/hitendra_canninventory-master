import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CategoriesListTable from './components/CategoriesListTable';

const UsersList = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Categories List</h3>
      </Col>
    </Row>
    <Row>
      <CategoriesListTable />
    </Row>
  </Container>
);

export default UsersList;
