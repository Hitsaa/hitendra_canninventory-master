import React from 'react';
import { Container, Row } from 'reactstrap';
import POSPlantsListTable from './components/POSPlantsListTable';

const POSPlantsList = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Plants List</h3>
      </Col>
    </Row> */}
    <Row>
      <POSPlantsListTable />
    </Row>
  </Container>
);

export default POSPlantsList;
