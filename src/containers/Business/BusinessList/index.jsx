import React from 'react';
import { Container, Row } from 'reactstrap';
import BusinessListTable from './components/BusinessListTable';

const BusinessList = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Businesses</h3>
      </Col>
    </Row> */}
    <Row>
      <BusinessListTable />
    </Row>
  </Container>
);

export default BusinessList;
