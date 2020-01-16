import React from 'react';
import { Container, Row } from 'reactstrap';
import CustomerAddCard from './components/CustomerAddCard';

const CustomerAdd = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Add New Client</h3>
      </Col>
    </Row> */}
    <Row>
      <CustomerAddCard />
    </Row>
  </Container>
);

export default CustomerAdd;
