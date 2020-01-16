import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import PlantAddCard from './components/PlantAddCard';

const PlantAdd = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Upload Plant Data</h3>
      </Col>
    </Row>
    <Row>
      <PlantAddCard />
    </Row>
  </Container>
);


export default PlantAdd;
