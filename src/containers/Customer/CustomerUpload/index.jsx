import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CustomerAddCard from './components/CustomerAddCard';

const CustomerAdd = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Upload Customer Data</h3>
      </Col>
    </Row>
    <Row>
      <CustomerAddCard />
    </Row>
  </Container>
);


export default CustomerAdd;
