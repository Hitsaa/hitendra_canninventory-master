import React from 'react';
import { Container, Row } from 'reactstrap';
import PlantEditCard from './components/PlantEditCard';

const PlantEdit = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Edit Plant</h3>
      </Col>
    </Row> */}
    <Row>
      <PlantEditCard />
    </Row>
  </Container>
);


export default PlantEdit;
