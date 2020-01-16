/* eslint-disable */
import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import axios from 'axios';
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import DatePicker from 'react-datepicker';
const moment = extendMoment(originalMoment);

class ReportDownload extends React.Component {
  constructor() {
    super();
    this.state = {
      salesStartDate: new Date(),
      salesEndDate: new Date(),
      purchaseStartDate: new Date(),
      purchaseEndDate: new Date(),
    };
  }

  salesReportSDateChange = date => {
    this.setState({
      salesStartDate: date
    });
  };
  salesReportEDateChange = date => {
    this.setState({
      salesEndDate: date
    });
  };
  purchaseReportSDateChange = date => {
    this.setState({
      purchaseStartDate: date
    });
  };
  purchaseReportEDateChange = date => {
    this.setState({
      purchaseEndDate: date
    });
  };

  salesReport = () => {
    const fromDt = moment(this.state.salesStartDate).format("YYYY-MM-DD");
    const toDt = moment(this.state.salesEndDate).format("YYYY-MM-DD");
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const urls = `${process.env.API_ENDPOINT_LOC}/sales-report`;
    axios({
      method: 'post',
      url: urls,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        to: toDt, from: fromDt, sale: 1
      },
    })
      .then((res) => {
        window.location.assign(res.data.url);
      });
  };
  purchaseReport = () => {
    const fromDt = moment(this.state.purchaseStartDate).format("YYYY-MM-DD");
    const toDt = moment(this.state.purchaseEndDate).format("YYYY-MM-DD");
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const urls = `${process.env.API_ENDPOINT_LOC}/purchase-report`;
    axios({
      method: 'post',
      url: urls,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        to: toDt, from: fromDt, purchase: 1
      },
    })
      .then((res) => {
        window.location.assign(res.data.url);
      });
  };

  render() {
    return ([
    <Col md={12} xl={6} lg={6} xs={12}>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <h5 className="bold-text reports-sp-h">Sales Report</h5>
              <div className="sales-dates clearfix">
                <div className="wid50">
                  <label>Start date</label>
                  <DatePicker className="form-control" selected={this.state.salesStartDate} onChange={this.salesReportSDateChange} placeholderText="Start date" />
                </div>
                <div className="wid50">
                  <label>End date</label>
                  <DatePicker className="form-control" selected={this.state.salesEndDate} onChange={this.salesReportEDateChange} placeholderText="End date" />
                </div>
              </div>
              <Button onClick={this.salesReport} className="text-center reports-sp-b">Download Now</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>,
    <Col md={12} xl={6} lg={6} xs={12}>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <h5 className="bold-text reports-sp-h">Purchase Report</h5>
              <div className="sales-dates clearfix">
                <div className="wid50">
                  <label>Start date</label>
                  <DatePicker className="form-control" selected={this.state.purchaseStartDate} onChange={this.purchaseReportSDateChange} placeholderText="Start date" />
                </div>
                <div className="wid50">
                  <label>End date</label>
                  <DatePicker className="form-control" selected={this.state.purchaseEndDate} onChange={this.purchaseReportEDateChange} placeholderText="End date" />
                </div>
              </div>
              <Button onClick={this.purchaseReport} className="reports-sp-b">Download Now</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>,
  ]);
  }
}

export default withTranslation('common')(ReportDownload);
