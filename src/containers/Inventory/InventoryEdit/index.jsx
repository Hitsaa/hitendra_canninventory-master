import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import InventoryEditCard from './components/InventoryEditCard';

const InventoryEdit = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">
          Edit Inventory
        </h3>
      </Col>
    </Row>
    <Row>
      <InventoryEditCard />
    </Row>
  </Container>
);

export default withTranslation('common')(InventoryEdit);
