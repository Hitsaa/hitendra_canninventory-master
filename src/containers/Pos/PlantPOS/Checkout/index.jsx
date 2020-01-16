import React from 'react';
import { Container, Row } from 'reactstrap';
import PlantCheckout from './components/PlantCheckout';

const Checkout = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Plants List</h3>
      </Col>
    </Row> */}
    <Row>
      <PlantCheckout />
    </Row>
  </Container>
);

export default Checkout;
