import React from 'react';
import { Container, Row } from 'reactstrap';
import ClientEditCard from './components/ClientEditCard';

const ClientEdit = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Add New Client</h3>
      </Col>
    </Row> */}
    <Row>
      <ClientEditCard />
    </Row>
  </Container>
);

export default ClientEdit;
