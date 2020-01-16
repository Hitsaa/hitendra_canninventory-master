import React from 'react';
import { Container, Row } from 'reactstrap';
import ProductEditCard from './components/ProductEditCard';

const ProductEdit = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Edit Product</h3>
      </Col>
    </Row> */}
    <Row>
      <ProductEditCard />
    </Row>
  </Container>
);


export default ProductEdit;
