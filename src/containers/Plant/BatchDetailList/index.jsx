import React from 'react';
import { Container, Row } from 'reactstrap';
import BatchDetailListTable from './components/BatchDetailListTable';

const BatchDetailList = () => (
  <Container>
    <Row>
      <BatchDetailListTable />
    </Row>
  </Container>
);

export default BatchDetailList;
