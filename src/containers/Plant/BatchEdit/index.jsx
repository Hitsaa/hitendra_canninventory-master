import React from 'react';
import { Container, Row } from 'reactstrap';
import BatchEditCard from './components/BatchEditCard';

const BatchEdit = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Edit Batch</h3>
      </Col>
    </Row> */}
    <Row>
      <BatchEditCard />
    </Row>
  </Container>
);


export default BatchEdit;
