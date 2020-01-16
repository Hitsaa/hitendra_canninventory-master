import React from 'react';
import { Container, Row } from 'reactstrap';
import CustomersListTable from './components/CustomersListTable';

const CustomersList = () => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Patients</h3>
      </Col>
    </Row> */}
    <Row>
      <CustomersListTable />
    </Row>
  </Container>
);

export default CustomersList;
