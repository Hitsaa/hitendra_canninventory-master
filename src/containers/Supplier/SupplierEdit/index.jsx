import React from 'react';
import { Container, Row } from 'reactstrap';
import SupplierEditCard from './components/SupplierEditCard';

const SupplierEdit = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Add New Supplier</h3>
      </Col>
    </Row> */}
    <Row>
      <SupplierEditCard />
    </Row>
  </Container>
);

export default SupplierEdit;
