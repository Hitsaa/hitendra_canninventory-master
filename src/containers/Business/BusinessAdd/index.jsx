import React from 'react';
import { Container, Row } from 'reactstrap';
import BusinessAddCard from './components/BusinessAddCard';

const BusinessAdd = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Add New Client</h3>
      </Col>
    </Row> */}
    <Row>
      <BusinessAddCard />
    </Row>
  </Container>
);

export default BusinessAdd;
