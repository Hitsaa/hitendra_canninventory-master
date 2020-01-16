import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ProductEditCard from './components/ProductEditCard';

const ProductEdit = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Add Client</h3>
        <h3 className="page-subhead subhead">Create a new client.
        </h3>
      </Col>
    </Row>
    <Row>
      <ProductEditCard />
    </Row>
  </Container>
);

export default ProductEdit;
