import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CategoryAddCard from './components/CategoryAddCard';

const CategoryAdd = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Add Category</h3>
      </Col>
    </Row>
    <Row>
      <CategoryAddCard />
    </Row>
  </Container>
);

export default CategoryAdd;
