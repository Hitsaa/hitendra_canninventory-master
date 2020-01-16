import React from 'react';
import { Container, Row } from 'reactstrap';
import CustomerEditCard from './components/CustomerEditCard';

const CustomerEdit = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Add New Client</h3>
      </Col>
    </Row> */}
    <Row>
      <CustomerEditCard />
    </Row>
  </Container>
);

export default CustomerEdit;
