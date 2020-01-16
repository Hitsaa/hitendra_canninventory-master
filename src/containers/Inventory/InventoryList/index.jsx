import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import InventoryListTable from './components/InventoryListTable';

const InventoryList = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">
          All Inventory
        </h3>
      </Col>
    </Row>
    <Row>
      <InventoryListTable />
    </Row>
  </Container>
);

export default withTranslation('common')(InventoryList);
