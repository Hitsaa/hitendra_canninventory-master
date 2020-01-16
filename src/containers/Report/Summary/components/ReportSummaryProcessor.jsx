/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable */
import React, { PureComponent } from 'react';
import Notification from 'rc-notification';
import {
  Col,
  Row,
  Label,
  Input,
  Container,
  Table,
  Jumbotron,
  InputGroupText,
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
    this.setState({ userID: '' });
    JsonUserData = await JSON.parse(userData);
    if (JsonUserData) {
      this.setState({ userID: JsonUserData.id });
      // const licanceObj = await todosRef.child(`/${this.state.userID}`);
      const licanceObj = await todosRef;
      let data = {};
      let data2 = {};
      let _self = this;
      licanceObj.once('value', (snapshot) => {
        data = snapshot.val();
        if (data != null) {
          data.forEach(element => {
            console.log(element);
            let userFbData = element[_self.state.userID];
            if(userFbData){
              data2 = userFbData.years;
              _self.setState({ firebaseData: data2, listofYears: Object.keys(data2), userData: userFbData.user_info });
            }
          });
        } else {
          showNotification('👋 No Data!', 'Sorry! I did not find data for current user.');
        }
      });
    } else {
      showNotification('👋 Not Logged in!', 'Please! Login Again and Retry.');
    }
  }

  getRequiredInfo(event) {
    this.getUser();
    if (event.target.value === '0') {
      this.setState({ filteredData: undefined, selected_month: undefined });
    } else {
      this.setState({ selected_month: event.target.value });
      // console.log('required info fetcher');
      let data = {};
      data = this.state.firebaseData;
      let dataofyear = {};
      dataofyear = data[this.state.selected_year];
      let setData = {};
      setData = dataofyear[event.target.value];
      console.log(setData);
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
                    this.state.userData ? (<Input value={this.state.userData.OMMAlicenseNumber} />) : <Input disabled value="0" />
                  }
                </Col>
              </Tooltip>
            </Row>
            <Row>
              <Col md={12}>
                <Label>OBNDD Registration Number</Label>
                {
                  this.state.userData ? (<Input value={this.state.userData.obddnRegNumber} />) : <Input disabled value="0" />
                }

              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label>Tax ID Number</Label>
                {
                  this.state.userData ? <Input value={this.state.userData.taxID} /> : <Input disabled value="0" />
                }
              </Col>
              <Col md={6}>
                <Label>Food License Number</Label>
                {
                  this.state.userData ? <Input value={this.state.userData.foodLicenceNumber} /> : <Input disabled value="0" />
                }
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label>License Type</Label>
                {
                  this.state.userData ? <Input value={this.state.userData.licenceType} /> : <Input disabled value="0" />
                }
              </Col>
              <Col md={6}>
                <Label>Entity Name</Label>
                {
                  this.state.userData ? <Input value={this.state.userData.entityName} /> : <Input disabled value="0" />
                }

              </Col>
            </Row>
            <Jumbotron className="jumbotron-heading">
              <Label>Person submitting the monthly report.</Label>
            </Jumbotron>
            <Row>
              <Col md={4}>
                <Label>First Name</Label>
                {
                  this.state.userData ? <Input value={this.state.userData.firstName} /> : <Input disabled value="0" />
                }
              </Col>
              <Col md={4}>
                <Label>Last Name</Label>
                {
                  this.state.userData ? <Input value={this.state.userData.lastNAme} /> : <Input disabled value="0" />
                }
              </Col>
              <Col md={4}>
                <Label>Role</Label>
                {
                  this.state.userData ? <Input value={this.state.userData.Role} /> : <Input disabled value="0" />
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
            <br />
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
            <br />
            <Jumbotron className="jumbotron-heading">
              <Label>The amount of marijuana on hand at the beginning of the reporting period.</Label>
            </Jumbotron>
            <Row>
              <Col md={12}>
                <Table>
                  <thead>
                    <tr>
                      <th />
                      <th className="form-card-th-center">Weight (lb 0.000) </th>
                      <th className="form-card-th-center">Count (smallest unit sold)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.filteredData && this.state.filteredData.data.on_hand_at_beginning.map((val) => {
                      return (
                        <tr key={val.name}>
                          <th scope="row">{val.name}</th>
                          <td>{val.weight}</td>
                          <td>{val.Count}</td>
                        </tr>
                      );
                    })
                    }
                  </tbody>
                  {/* <tbody>
                    <tr>
                      <th scope="row">Edible - weight AND count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Tincture - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        Topical - weight or count
                      </th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Trans-dermal Patch - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Extract - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Concentrate - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Capsule - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Suppository - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Combined category - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Immature Plant (seedling) - count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Flower/Bud - weight</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Shake/Trim - weight</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Mature Plant - count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Waste - weight</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                */}
                </Table>
              </Col>
            </Row>
            <br />
            <Jumbotron className="jumbotron-heading">
              <Label>The amount of marijuana purchased from grower licensees.</Label>
            </Jumbotron>
            <Row>
              <Col md={12}>
                <Table>
                  <thead>
                    <tr>
                      <th />
                      <th className="form-card-th-center">Weight (lb 0.000) </th>
                      <th className="form-card-th-center">Count (smallest unit sold)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.filteredData && this.state.filteredData.data.purchased_from_grower.map((val) => {
                      return (
                        <tr key={val.name}>
                          <th scope="row">{val.name}</th>
                          <td>{val.weight}</td>
                          <td>{val.Count}</td>
                        </tr>
                      );
                    })
                    }
                  </tbody>
                  {/* <tbody>
                    <tr>
                      <th scope="row">Flower/Bud - weight</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Shake/Trim - weight</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Waste - weight</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Immature Plant (seedling) - count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Mature Plant - count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                 */}
                </Table>
              </Col>
            </Row>
            <br />
            <Jumbotron className="jumbotron-heading">
              <Label>The amount of marijuana purchased from processor licensees.</Label>
            </Jumbotron>
            <Row>
              <Col md={12}>
                <Table>
                  <thead>
                    <tr>
                      <th />
                      <th className="form-card-th-center">Weight (lb 0.000) </th>
                      <th className="form-card-th-center">Count (smallest unit sold)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.filteredData && this.state.filteredData.data.amount_purchased_from_licensed_processor.map((val) => {
                      return (
                        <tr key={val.name}>
                          <th scope="row">{val.name}</th>
                          <td>{val.weight}</td>
                          <td>{val.Count}</td>
                        </tr>
                      );
                    })
                    }
                  </tbody>
                  {/* <tbody>
                    <tr>
                      <th scope="row">Edible - weight AND count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Tincture - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        Topical - weight or count
                      </th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Trans-dermal Patch - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Extract - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Concentrate - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Capsule - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Suppository - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Combined category - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Immature Plant (seedling) - count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Flower/Bud - weight</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Shake/Trim - weight</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Mature Plant - count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Waste - weight</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                 */}
                </Table>
              </Col>
            </Row>
            <br />
            <Jumbotron className="jumbotron-heading">
              <Label>The amount of medical marijuana manufactured or processed</Label>
            </Jumbotron>
            <Row>
              <Col md={12}>
                <Table>
                  <thead>
                    <tr>
                      <th />
                      <th className="form-card-th-center">Weight (lb 0.000) </th>
                      <th className="form-card-th-center">Count (smallest unit sold)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.filteredData && this.state.filteredData.data.manufactured_or_processed.map((val) => {
                      return (
                        <tr key={val.name}>
                          <th scope="row">{val.name}</th>
                          <td>{val.weight}</td>
                          <td>{val.Count}</td>
                        </tr>
                      );
                    })
                    }
                  </tbody>
                  {/* <tbody>
                    <tr>
                      <th scope="row">Edible - weight AND count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Tincture - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        Topical - weight or count
                      </th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Trans-dermal Patch - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Extract - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Concentrate - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Capsule - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Suppository - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Combined category - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Immature Plant (seedling) - count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Flower/Bud - weight</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Shake/Trim - weight</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Mature Plant - count</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Waste - weight</th>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                 */}
                </Table>
              </Col>
            </Row>
            <br />
            <Jumbotron className="jumbotron-heading">
              <Label>The amount of marijuana sold to dispensary, processor, and researcher licensees</Label>
            </Jumbotron>
            <Row>
              <Col md={12}>
                <Table>
                  <thead>
                    <tr>
                      <th />
                      <th className="form-card-th-center">DISPENSARY Weight (lb0.000)</th>
                      <th className="form-card-th-center">DISPENSARY Count (smallest unit sold)</th>
                      <th className="form-card-th-center">Processor Weight (lb 0.000)</th>
                      <th className="form-card-th-center">Processor Count (smallest unit sold)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.filteredData && this.state.filteredData.data.sold.dispensary.map((val) => {
                      return (
                        <tr key={val.name}>
                          <th scope="row">{val.name}</th>
                          <td>{val.dispensory_weight}</td>
                          <td>{val.dispensory_count}</td>
                          <td>{val.processor_weight}</td>
                          <td>{val.processor_count}</td>
                        </tr>
                      );
                    })
                    }
                  </tbody>
                  {/* <tbody>
                    <tr>
                      <th scope="row">Edible - weight AND count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Tincture - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        Topical - weight or count
                      </th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Trans-dermal Patch - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Extract - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Concentrate - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Capsule - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Suppository - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Combined category - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Immature Plant (seedling) - count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Flower/Bud - weight</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Shake/Trim - weight</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Mature Plant - count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                 */}
                </Table>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={12}>
                <Table>
                  <thead>
                    <tr>
                      <th />
                      <th className="form-card-th-center">RSEARCHER Weight (lb0.000)</th>
                      <th className="form-card-th-center">RSEARCHER Count (smallest unit sold)</th>
                      <th className="form-card-th-center">TOTAL Weight (lb 0.000)</th>
                      <th className="form-card-th-center">TOTAL Count (smallest unit sold)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.filteredData && this.state.filteredData.data.sold.researcher.map((val) => {
                      return (
                        <tr key={val.name}>
                          <th scope="row">{val.name}</th>
                          <td>{val.researcher_weight}</td>
                          <td>{val.researcher_count}</td>
                          <td>{val.total_weight}</td>
                          <td>{val.total_count}</td>
                        </tr>
                      );
                    })
                    }
                  </tbody>
                  {/* <tbody>
                    <tr>
                      <th scope="row">Edible - weight AND count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Tincture - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        Topical - weight or count
                      </th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Trans-dermal Patch - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Extract - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Concentrate - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Capsule - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Suppository - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Combined category - weight or count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Immature Plant (seedling) - count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Flower/Bud - weight</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Shake/Trim - weight</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th scope="row">Mature Plant - count</th>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                 */}
                </Table>
              </Col>
            </Row>
            <br />
            <Jumbotron className="jumbotron-heading">
              <Label>The amount of marijuana waste in pounds</Label>
            </Jumbotron>
            <Row>
              <Col md={12}>
                {
                  this.state.filteredData ? <InputGroupText>$ &nbsp;&nbsp;<Input value={this.state.filteredData.data.waste_in_pounds} /></InputGroupText> : <InputGroupText>$ &nbsp;&nbsp;<Input value={0} /> Total &nbsp;&nbsp;</InputGroupText>
                }
              </Col>
            </Row>
            <br />
            <Jumbotron className="jumbotron-heading">
              <Label>The amount of marijuana transported to other licensed locations during this reporting month.</Label>
            </Jumbotron>
            <Row>
              <Col md={12}>
                <Table>
                  <thead>
                    <tr>
                      <th />
                      <th className="form-card-th-center">Weight (lb 0.000) </th>
                      <th className="form-card-th-center">Count (smallest unit sold)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.filteredData && this.state.filteredData.data.transported_to_other_locations.map((val) => {
                      return (
                        <tr key={val.name}>
                          <th scope="row">{val.name}</th>
                          <td>{val.weight}</td>
                          <td>{val.Count}</td>
                        </tr>
                      );
                    })
                    }
                  </tbody>
                </Table>
              </Col>
            </Row>
            <br />
            <Jumbotron className="jumbotron-heading">
              <Label>The amount of marijuana transported to your business during this reporting month.</Label>
            </Jumbotron>
            <Row>
              <Col md={12}>
                <Table>
                  <thead>
                    <tr>
                      <th />
                      <th className="form-card-th-center">Weight (lb 0.000) </th>
                      <th className="form-card-th-center">Count (smallest unit sold)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.filteredData && this.state.filteredData.data.transported_to_business.map((val) => {
                      return (
                        <tr key={val.name}>
                          <th scope="row">{val.name}</th>
                          <td>{val.weight}</td>
                          <td>{val.Count}</td>
                        </tr>
                      );
                    })
                    }
                  </tbody>
                </Table>
              </Col>
            </Row>
            <br />
            <Jumbotron className="jumbotron-heading">
              <Label>The amount of marijuana on hand at the end of the reporting period</Label>
            </Jumbotron>
            <Row>
              <Col md={12}>
                <Table>
                  <thead>
                    <tr>
                      <th />
                      <th className="form-card-th-center">Weight (lb 0.000) </th>
                      <th className="form-card-th-center">Count (smallest unit sold)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.filteredData && this.state.filteredData.data.on_hand_at_end.map((val) => {
                      return (
                        <tr key={val.name}>
                          <th scope="row">{val.name}</th>
                          <td>{val.weight}</td>
                          <td>{val.Count}</td>
                        </tr>
                      );
                    })
                    }
                  </tbody>
                </Table>
              </Col>
            </Row>
            <br />
          </Col>
        </Row>
      </Container>
    );
  }
}
