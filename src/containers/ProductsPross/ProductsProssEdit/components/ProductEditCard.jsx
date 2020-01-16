import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import ProductEditForm from './ProductEditForm';

const ProductEditCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Edit Processor Product</h5>
        </div>
        <ProductEditForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default ProductEditCard;
