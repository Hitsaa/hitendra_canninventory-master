import React from 'react';
import { Container, Row } from 'reactstrap';
import ProductAddCard from './components/ProductAddCard';

const ProductAdd = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Add Product</h3>
      </Col>
    </Row> */}
    <Row>
      <ProductAddCard />
    </Row>
  </Container>
);

export default ProductAdd;
