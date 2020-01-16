import React from 'react';
import { Container, Row } from 'reactstrap';
import ClientAddCard from './components/ClientAddCard';

const ClientAdd = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Add New Client</h3>
      </Col>
    </Row> */}
    <Row>
      <ClientAddCard />
    </Row>
  </Container>
);

export default ClientAdd;
