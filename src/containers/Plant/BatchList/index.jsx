import React from 'react';
import { Container, Row } from 'reactstrap';
import BatchListTable from './components/BatchListTable';

const BatchList = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Batches</h3>
      </Col>
    </Row> */}
    <Row>
      <BatchListTable />
    </Row>
  </Container>
);

export default BatchList;
