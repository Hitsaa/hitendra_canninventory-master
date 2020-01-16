import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import BusinessAddCard from './components/BusinessAddCard';

const BusinessAdd = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Upload Business Data</h3>
      </Col>
    </Row>
    <Row>
      <BusinessAddCard />
    </Row>
  </Container>
);


export default BusinessAdd;
