import React from 'react';
import { Container, Row } from 'reactstrap';
import BatchAddCard from './components/BatchAddCard';

const BatchAdd = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Add Plant</h3>
      </Col>
    </Row> */}
    <Row>
      <BatchAddCard />
    </Row>
  </Container>
);


export default BatchAdd;
