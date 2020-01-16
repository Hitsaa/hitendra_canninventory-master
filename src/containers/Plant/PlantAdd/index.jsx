import React from 'react';
import { Container, Row } from 'reactstrap';
import PlantAddCard from './components/PlantAddCard';

const PlantAdd = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Add Plant</h3>
      </Col>
    </Row> */}
    <Row>
      <PlantAddCard />
    </Row>
  </Container>
);


export default PlantAdd;
