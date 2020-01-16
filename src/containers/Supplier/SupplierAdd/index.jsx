import React from 'react';
import { Container, Row } from 'reactstrap';
import SupplierAddCard from './components/SupplierAddCard';

const SupplierAdd = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Add New Supplier</h3>
      </Col>
    </Row> */}
    <Row>
      <SupplierAddCard />
    </Row>
  </Container>
);

export default SupplierAdd;
