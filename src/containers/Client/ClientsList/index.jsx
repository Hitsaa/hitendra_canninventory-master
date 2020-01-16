import React from 'react';
import { Container, Row } from 'reactstrap';
import ClientsListTable from './components/ClientsListTable';

const ClientsList = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Clients List</h3>
      </Col>
    </Row> */}
    <Row>
      <ClientsListTable />
    </Row>
  </Container>
);

export default ClientsList;
