import React from 'react';
import { Container, Row } from 'reactstrap';
import SuppliersListTable from './components/SuppliersListTable';

const SuppliersList = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Suppliers List</h3>
      </Col>
    </Row> */}
    <Row>
      <SuppliersListTable />
    </Row>
  </Container>
);

export default SuppliersList;
