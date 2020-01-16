/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-unused-state */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-unised-vars */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable quote-props */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-unused-expression */
/* eslint-disable no-unused-expressions */
/* eslint-disable  no-object-curly-newline */
import React, { PureComponent } from 'react';
import {
  Button, Input, Col,
} from 'reactstrap';
import { reduxForm } from 'redux-form';
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';
import Barcode from 'react-barcode';
// import { PDFViewer } from 'react-pdf';


class PlantLabelForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      serial: '',
      error: false,
      msg: '',
      plant: '',
      plantID: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generatePdf = this.generatePdf.bind(this);
  }

  async componentDidMount() {
    this.setState({ loader: 'LOADING' });
    const parts = window.location.hash.split('/');
    const plantID = parts.pop() || parts.pop();
    this.setState({ plantID });
    const plant = await this.getProduct(plantID);
    this.setState({ plant });
    this.setState({ loader: 'LOADED' });
  }

  getProduct = async (plantID) => {
    let plant = {};
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT}/plants/labels/${plantID}`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.data.error) {
        plant = response.data.label;
        this.setState({ plant: response.data.label });
        console.log(response);
      } else {
        this.setState({
          error: true,
          msg: response.data.message,
        });
      }
    }).catch((error) => {
      this.setState({
        error: true,
        msg: error.message,
      });
    });
    return plant;
  }

  generatePdf() {
    const urls = `${process.env.API_FILE_ENDPOINT}/plants/labels/download/${this.state.plantID}`;
    // fake server request, getting the file url as response
    setTimeout(() => {
      const response = {
        file: urls,
      };
      // server sent the url to the file!
      // now, let's download:
      window.open(response.file);
      // you could also do:
      // window.location.href = response.file;
    }, 100);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const strainName = this.refs.testForm.strainName.value;
    const productName = this.refs.testForm.productName.value;
    const serialNumber = this.refs.testForm.serialNumber.value;
    const batchNumber = this.refs.testForm.batchNumber.value;
    const startDate = this.refs.testForm.startDate.value;
    // eslint-disable-next-line no-console
    const bodyFormData = new FormData();
    bodyFormData.append('strainName', strainName);
    bodyFormData.append('productName', productName);
    bodyFormData.append('serialNumber', serialNumber);
    bodyFormData.append('batchNumber', batchNumber);
    bodyFormData.append('startDate', startDate);

    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const plantID = this.state.plantID;
    const urls = `${process.env.API_ENDPOINT}/plants/labels/${plantID}`;
    axios({
      method: 'post',
      url: urls,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      if (!response.data.error) {
        const history = createHashHistory();
        history.push(`/plants/labels/${this.state.plantID}`, { forceRefresh: true });
      } else {
        this.setState({
          error: true,
          msg: response.data.message,
        });
      }
    }).catch((error) => {
      this.setState({
        error: true,
        msg: error.message,
      });
    });
  }

  render() {
    const { error, msg } = this.state;
    const { loader } = this.state;
    let type = null;
    if (loader === 'LOADING') {
      type = <div className="load__icon-wrap"><svg className="load__icon"><path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg> </div>;
    }
    if (loader === 'LOADED') {
      type = (
        <form className="form form form--horizontal" ref="testForm" onSubmit={this.handleSubmit}>
          <Col md={6} lg={6}>
            {error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : null}
            <div className="form__form-group">
              <span className="form__form-group-label">Strain Name</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.plant.strainName} type="text" name="strainName" ref="strainName" />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Product Name</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.plant.productName} type="text" name="productName" ref="productName" />
              </div>
            </div>
            <div className="form__form-group form__form-group-id">
              <span className="form__form-group-label">Serial Number</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.plant.serialNumber} type="text" name="serialNumber" ref="serialNumber" />

              </div>
            </div>
          </Col>
          <Col md={6} lg={6}>
            <div className="form__form-group form__form-group-id">
              <span className="form__form-group-label">Batch Number</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.plant.batchNumber} type="text" name="batchNumber" ref="batchNumber" />

              </div>
            </div>
            <div className="form__form-group form__form-group-id">
              <span className="form__form-group-label">Start Date</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.plant.startDate} type="date" ref="startDate" name="startDate" />
              </div>
            </div>
          </Col>
          <Col md={4} lg={4}>
            <div className="form__form-group">
              <Barcode value={this.state.plant.serialNumber} />
            </div>
          </Col>
          <Col md={4} lg={4}>
            <div className="form__form-group">
              <Barcode value={this.state.plant.batchNumber} />
            </div>
          </Col>
          <Col md={4} lg={4}>
            <div className="form_form-group">
              {/* <ButtonToolbar className="form__button-toolbar"> */}
              <Button color="primary" className="btn-block" type="submit">UPDATE LABEL DETAILS</Button>
              <Button color="primary" onClick={() => this.generatePdf()} className="btn-block">DOWNLOAD LABEL</Button>
              {/* </ButtonToolbar> */}
            </div>
          </Col>
        </form >
      );
    }
    return type;
  }
}

export default reduxForm({
  form: 'plant_add_form',
  enableReinitialize: true,
})(PlantLabelForm);
