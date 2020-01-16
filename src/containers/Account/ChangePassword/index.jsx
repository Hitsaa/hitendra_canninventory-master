import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ChangePassowrdCard from './components/ChangePassowrdCard';

const ChangePassword = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Change Password</h3>
      </Col>
    </Row>
    <Row>
      <ChangePassowrdCard />
    </Row>
  </Container>
);

export default ChangePassword;
