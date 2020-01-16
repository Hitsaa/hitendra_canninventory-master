import React from 'react';
import { Container, Row } from 'reactstrap';
import PlantsListTable from './components/PlantsListTable';

const PlantsList = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Plants List</h3>
      </Col>
    </Row> */}
    <Row>
      <PlantsListTable />
    </Row>
  </Container>
);

export default PlantsList;
