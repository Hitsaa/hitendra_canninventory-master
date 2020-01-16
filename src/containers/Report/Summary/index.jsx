/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import ReportSummaryGrower from './components/ReportSummaryGrower';
import ReportSummaryRetailor from './components/ReportSummaryRetailor';
import ReportSummaryProcessor from './components/ReportSummaryProcessor';

export default class Summary extends PureComponent {
  getreport = () => {
    let page = null;
    const user = localStorage.getItem('cannave_user');
    if (user !== null && user !== '' && user !== undefined) {
      if (JSON.parse(user)) {
        const paresedUser = JSON.parse(user);
        if (paresedUser.role === 'PROCESSOR') {
          page = <ReportSummaryProcessor />;
        }
        if (paresedUser.role === 'RETAILER') {
          page = <ReportSummaryRetailor />;
        }
        if (paresedUser.role === 'GROWER') {
          page = <ReportSummaryGrower />;
        }
      }
    }
    return page;
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">Oklahoma Medical Marijuana Authority | OMMACompliance@ok.gov</h3>
            <h5>Licensee Information (as on file with the OMMA)</h5>
            <h5 className="page-note">Note -
              This report is only for viewing purpose.
              You can use this to fill the OMMA Compliance on their official website.
              We are not sending this data to anywhere for now.
            </h5>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {this.getreport()}
          </Col>
        </Row>
      </Container>
    );
  }
}
