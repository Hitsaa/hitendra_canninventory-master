import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import CategoryAddForm from './CategoryAddForm';

const CategoryAddCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Create New Category</h5>
        </div>
        <CategoryAddForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default CategoryAddCard;
