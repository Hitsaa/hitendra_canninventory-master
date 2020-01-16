import React from 'react';
import { Container, Row } from 'reactstrap';
import ProductsListTable from './components/ProductsListTable';

const ProductsProssList = () => (
  <Container>
    <Row>
      <ProductsListTable />
    </Row>
  </Container>
);

export default ProductsProssList;
