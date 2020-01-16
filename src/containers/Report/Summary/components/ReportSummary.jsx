/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import Notification from 'rc-notification';
import {
  Col,
  Row,
  Label,
  Input,
  Container,
  Table,
} from 'reactstrap';
import Tooltip from '@material-ui/core/Tooltip';
import { BasicNotification } from '../../../../shared/components/Notification';
import todosRef from '../../../../fire';

let notification = null;
Notification.newInstance({}, n => notification = n);

const showNotification = (title, message) => {
  notification.notice({
    content: <BasicNotification
      title={title}
      message={message}
    />,
    duration: 10,
    closable: true,
    style: { top: 0, left: 'calc(100vw - 100%)' },
    className: 'right-up',
  });
};

export default class ReportSummary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userID: undefined,
      listofYears: undefined,
      listofMonths: undefined,
      selected_month: undefined,
      firebaseData: undefined,
      selected_year: undefined,
      userData: undefined,
      filteredData: undefined,
    };
    this.getUser();
  }

  getUser = async () => {
    let userData = {};
    userData = await localStorage.getItem('cannave_user');
    let JsonUserData = {};
    JsonUserData = await JSON.parse(userData);
    if (JsonUserData) {
      this.setState({ userID: JsonUserData.id });
      const licanceObj = await todosRef.child(`/${this.state.userID}`);
      let data = {};
      let data2 = {};
      licanceObj.on('value', (snapshot) => {
        data = snapshot.val();
        if (data != null) {
          data2 = data.years;
          this.setState({ firebaseData: data2, listofYears: Object.keys(data2), userData: data.user_info });
        } else {
          showNotification('👋 No Data!', 'Sorry! I did not found data for current user.');
        }
      });
    } else {
      showNotification('👋 Not Logged in!', 'Please! Login Again and Retry.');
    }
  }

  getRequiredInfo(event) {
    if (event.target.value === '0') {
      this.setState({ filteredData: undefined, selected_month: undefined });
    } else {
      this.setState({ selected_month: event.target.value });
      // console.log('required info fetcher');
      let data = {};
      data = this.state.firebaseData;
      let dataofyear = {};
      dataofyear = data[this.state.selected_year];
      // console.log(event.target.value);
      let setData = {};
      setData = dataofyear[event.target.value];
      this.setState({ filteredData: setData });
    }
  }

  handelYear(event) {
    if (event.target.value === '0') {
      this.setState({
        selected_year: undefined, selected_month: undefined, listofMonths: undefined, filteredData: undefined,
      });
    } else {
      this.setState({
        selected_year: undefined, selected_month: undefined, listofMonths: undefined, filteredData: undefined,
      });
      // console.log('handel year', event.target.value);
      this.setState({ selected_year: event.target.value });
      let selectedYearData = {};
      selectedYearData = this.state.firebaseData[event.target.value];
      // console.log('firebase data', this.state.firebaseData[event.target.value]);
      // console.log(Object.keys(selectedYearData));
      this.setState({
        listofMonths: Object.keys(selectedYearData),
      });
    }
  }

  render() {
    return (
      <Container className="form-card">
        <Row className="bottom-inner">
          <Col md={{ size: 8, offset: 2 }}>
            <Row>
              <Tooltip title="example GAAA-ZZZZ-ZZZZ; must include hyphens">
                <Col md={12}>
                  <Label>OMMA License ID/Number</Label>
                  {
                    this.state.userData ? (<Input value={this.state.userData.registration} />) : <Input disabled value="0" />
                  }
                </Col>
              </Tooltip>
            </Row>
            <Row>
              <Col md={12}>
                <Label>OBNDD Registration Number</Label>
                {
                  this.state.userData ? (<Input value={this.state.userData.registration} />) : <Input disabled value="0" />
                }

              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label>License Type</Label>
                {
                  this.state.userData ? <Input value={this.state.userData.type} /> : <Input disabled value="0" />
                }
              </Col>
              <Col md={6}>
                <Label>Entity Name</Label>
                {
                  this.state.userData ? (<Input value="Mason Farms LLC" />) : <Input disabled value="0" />
                }

              </Col>
            </Row>
            <hr />
            <Label>Person submitting the monthly report.</Label>
            <Row>
              <Col md={6}>
                <Label>Name</Label>
                {
                  this.state.userData ? <Input value={this.state.userData.name} /> : <Input disabled value="0" />
                }
              </Col>
              <Col md={6}>
                <Label>Role</Label>
                {
                  this.state.userData ? <Input value={this.state.userData.role} /> : <Input disabled value="0" />
                }
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label>Email</Label>
                {
                  this.state.userData ? <Input value={this.state.userData.email} /> : <Input disabled value="0" />
                }
              </Col>
              <Col md={6}>
                <Label>Phone Number</Label>
                {
                  this.state.userData ? <Input value={this.state.userData.phoneNumber} /> : <Input disabled value="0" />
                }
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={6}>
                <Label>Reporting Year</Label>
                <Input type="select" value={this.state.selected_year} onChange={event => this.handelYear(event)}>
                  <option value="0">Select a Year</option>
                  {
                    this.state.listofYears && this.state.listofYears.map(Value => <option value={Value} key={Value}>{Value}</option>)
                  }
                </Input>
              </Col>
              <Tooltip title="Month preceding submission due date">
                <Col md={6}>
                  <Label>Reporting Month</Label>
                  <Input type="select" value={this.state.selected_month} onChange={event => this.getRequiredInfo(event)} disabled={!this.state.selected_year}>
                    <option value="0">Select a Month</option>
                    {
                      this.state.listofMonths && this.state.listofMonths.map(Value => <option value={Value} key={Value}>{Value}</option>)
                    }
                  </Input>
                </Col>
              </Tooltip>
            </Row>
            <Label>The number of plants on hand at the beginning of the reporting period.</Label>
            <Row>
              <Col md={6}>
                <Label>Immature plant (seedling)</Label>
                {
                  this.state.filteredData ? <Input value={this.state.filteredData.data.stock.plants_at_hand.immature} /> : <Input disabled value="0" />
                }
              </Col>
              <Col md={6}>
                <Label>Mature plant</Label>
                {
                  this.state.filteredData ? <Input value={this.state.filteredData.data.stock.plants_at_hand.mature} /> : <Input disabled value="0" />
                }
              </Col>
            </Row>
            <hr />
            <Label>The amount of marijuana harvested in pounds.</Label>
            <Row>
              <Col md={6}>
                <Label>Flower/Bud</Label>
                {
                  this.state.filteredData ? <Input value={this.state.filteredData.data.stock.marijuana_harvested_pounds.flower_bud} /> : <Input disabled value="0" />
                }
              </Col>
              <Col md={6}>
                <Label>Shake/Trim</Label>
                {
                  this.state.filteredData ? <Input value={this.state.filteredData.data.stock.marijuana_harvested_pounds.share_trim} /> : <Input disabled value="0" />
                }
              </Col>
            </Row>
            <hr />
            <Label>The amount of marijuana sold to researcher, dispensary, and processor licenseesin pounds.</Label>
            <Row>
              <Col md={12}>
                <Table>
                  <thead>
                    <tr>
                      <th />
                      <th>Flower/Bud</th>
                      <th>Shake/Trim</th>
                      <th>Waste</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Processor</th>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.sold.marijuana_sold_pounds.to_processor.flower) : ('0')}</td>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.sold.marijuana_sold_pounds.to_processor.shake) : ('0')}</td>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.sold.marijuana_sold_pounds.to_processor.waste) : ('0')}</td>
                    </tr>
                    <tr>
                      <th scope="row">Dispensary</th>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.sold.marijuana_sold_pounds.to_dispensary.flower) : ('0')}</td>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.sold.marijuana_sold_pounds.to_dispensary.shake) : ('0')}</td>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.sold.marijuana_sold_pounds.to_dispensary.waste) : ('0')}</td>
                    </tr>
                    <tr>
                      <th scope="row">Researcher</th>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.sold.marijuana_sold_pounds.to_researcher.flower) : ('0')}</td>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.sold.marijuana_sold_pounds.to_researcher.shake) : ('0')}</td>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.sold.marijuana_sold_pounds.to_researcher.waste) : ('0')}</td>
                    </tr>
                    <tr>
                      <th scope="row">Total</th>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.sold.marijuana_sold_pounds.to_researcher.flower + this.state.filteredData.data.sold.marijuana_sold_pounds.to_dispensary.flower + this.state.filteredData.data.sold.marijuana_sold_pounds.to_processor.flower) : ('0')}</td>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.sold.marijuana_sold_pounds.to_researcher.shake + this.state.filteredData.data.sold.marijuana_sold_pounds.to_dispensary.shake + this.state.filteredData.data.sold.marijuana_sold_pounds.to_dispensary.shake) : ('0')}</td>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.sold.marijuana_sold_pounds.to_researcher.waste + this.state.filteredData.data.sold.marijuana_sold_pounds.to_dispensary.waste + this.state.filteredData.data.sold.marijuana_sold_pounds.to_processor.waste) : ('0')}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <hr />
            <Label>The amount of drying or dried marijuana on hand.</Label>
            <Row>
              <Col md={12}>
                <Table>
                  <thead>
                    <tr>
                      <th />
                      <th>Flower/Bud</th>
                      <th>Shake/Trim</th>
                      <th>Waste</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Drying</th>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.drying.drying.flower) : ('0')}</td>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.drying.drying.shake) : ('0')}</td>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.drying.drying.waste) : ('0')}</td>
                    </tr>
                    <tr>
                      <th scope="row">Dried</th>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.drying.dried.flower) : ('0')}</td>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.drying.dried.shake) : ('0')}</td>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.drying.dried.waste) : ('0')}</td>
                    </tr>
                    <tr>
                      <th scope="row">Total</th>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.drying.drying.flower + this.state.filteredData.data.drying.dried.flower) : ('0')}</td>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.drying.drying.shake + this.state.filteredData.data.drying.dried.shake) : ('0')}</td>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.drying.drying.waste + this.state.filteredData.data.drying.dried.waste) : ('0')}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <hr />
            <Label>The number of plants sold during the reporting period.</Label>
            <Row>
              <Col md={12}>
                <Table>
                  <thead>
                    <tr>
                      <th />
                      <th>Processor</th>
                      <th>Dispensary</th>
                      <th>Researcher</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Immature plant(seedling)</th>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.number_plants_sold_reporting.immature.processor) : ('0')}</td>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.number_plants_sold_reporting.immature.dispensary) : ('0')}</td>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.number_plants_sold_reporting.immature.researcher) : ('0')}</td>
                    </tr>
                    <tr>
                      <th scope="row">Mature plant</th>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.number_plants_sold_reporting.mature.processor) : ('0')}</td>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.number_plants_sold_reporting.mature.processor) : ('0')}</td>
                      <td>{this.state.filteredData ? (this.state.filteredData.data.number_plants_sold_reporting.mature.processor) : ('0')}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <Label>The amount of marijuana waste in pounds</Label>
                {
                 this.state.filteredData ? <Input value={this.state.filteredData.data.waste_in_pounds} /> : <Input disabled value="0" />
                }
              </Col>
            </Row>
            <hr />
            <Label>Total dollar amount of all sales to processor, dispensary, and researcher licensees.</Label>
            <Row>
              <Col md={4}>
                <Label>Processor</Label>
                {
                 this.state.filteredData ? <Input value={this.state.filteredData.data.total_sales.to_processor} /> : <Input disabled value="0" />
                }
              </Col>
              <Col md={4}>
                <Label>Researcher</Label>
                {
                 this.state.filteredData ? <Input value={this.state.filteredData.data.total_sales.to_researcher} /> : <Input disabled value="0" />
                }
              </Col>
              <Col md={4}>
                <Label>Dispensary</Label>
                {
                 this.state.filteredData ? <Input value={this.state.filteredData.data.total_sales.to_dispensary} /> : <Input disabled value="0" />
                }
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Label>Total</Label>
                {
                 this.state.filteredData ? <Input value={this.state.filteredData.data.total_sales.to_dispensary + this.state.filteredData.data.total_sales.to_researcher + this.state.filteredData.data.total_sales.to_processor} /> : <Input disabled value="0" />
                }
              </Col>
            </Row>
            <hr />
            <Label>The number of plants on hand at the end of the reporting period.</Label>
            <Row>
              <Col md={6}>
                <Label>Immature plant (seedling)</Label>
                {
                 this.state.filteredData ? <Input value={this.state.filteredData.data.stock.plants_notat_hand.immature} /> : <Input disabled value="0" />
                }
              </Col>
              <Col md={6}>
                <Label>Mature plant</Label>
                {
                 this.state.filteredData ? <Input value={this.state.filteredData.data.stock.plants_notat_hand.mature} /> : <Input disabled value="0" />
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
