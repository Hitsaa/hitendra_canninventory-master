/* eslint-disable */
import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Col } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
// import axios from 'axios';
// import PropTypes from 'prop-types';
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';
import renderSelectField from '../../../../shared/components/form/Select';

class PlantAddForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      serial: this.generateSerial(),
      error: false,
      msg: '',
      batchID: '',
      btnStatus: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const serial = await this.generateSerial();
    const parts = window.location.hash.split('/');
    const batchID = parts.pop() || parts.pop();
    this.setState({ batchID });
    this.setState({ serial });
  }

  generateSerial() {
    const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const serialLength = 10;
    let randomSerial = 'SN';
    let randomNumber = 0;
    for (let i = 0; i < serialLength; i += 1) {
      randomNumber = Math.floor(Math.random() * chars.length);
      randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }
    // console.log('serial', randomSerial);
    return randomSerial;
  }

  async handleSubmit(e) {
    e.preventDefault();
    const name = this.inputName.value;
    const noOfPlants = this.inputNumber.value;
    const componentTracking = this.inputComponentTracking.value;
    const plantStage = this.inputPlantStage.value;
    const description = this.inputDescription.value;
    const growMethod = this.inputGrowMethod.value;
    if (name && noOfPlants && componentTracking && plantStage) {
      this.setState({btnStatus: true});
      // eslint-disable-next-line no-console
      const bodyFormData = new FormData();
      bodyFormData.append('name', name);
      bodyFormData.append('number_of_plants', noOfPlants);
      bodyFormData.append('batch_id', this.state.batchID);
      bodyFormData.append('grow_method', growMethod.value);
      bodyFormData.append('component_tracking', componentTracking.value);
      bodyFormData.append('plant_stage', plantStage.value);
      bodyFormData.append('description', description);

      const tokenStr = localStorage.getItem('cannave_token');
      const token = JSON.parse(tokenStr);
      const urls = `${process.env.API_ENDPOINT}/plants`;
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
          history.push(`/batches/details/${this.state.batchID}`, { forceRefresh: true });
        } else {
          this.setState({
            error: true,
            msg: response.data.message,
            btnStatus: false,
          });
        }
      }).catch((error) => {
        this.setState({
          error: true,
          msg: error.message,
        });
      });
    }
  }

  render() {
    const { serial, error, msg } = this.state;
    console.log('serialNo', serial);
    return (
      <form className="form form form--horizontal" onSubmit={this.handleSubmit}>
        {error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : null}
        <Col md={6} lg={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">Plant Name</span>
            <div className="form__form-group-field">
              <Field
                name="name"
                type="text"
                component="input"
                ref={node => (this.inputName = node)}
              />
            </div>
          </div>
          <div className="form__form-group form__form-group-id">
            <span className="form__form-group-label">Number of Plant(s)</span>
            <div className="form__form-group-field">
              <Field
                name="no"
                type="number"
                component="input"
                ref={node => (this.inputNumber = node)}
              />
            </div>
          </div>
          <div className="form__form-group form__form-group-id">
            <span className="form__form-group-label">Grow Method</span>
            <div className="form__form-group-field">
              <Field
                name="grow_method"
                type="text"
                component={renderSelectField}
                ref={node => (this.inputGrowMethod = node)}
                options={[
                  { value: 'SOIL', label: 'SOIL' },
                  { value: 'HYDROPONIC', label: 'HYDROPONIC' },
                ]}
              />
            </div>
          </div>
        </Col>
        <Col md={6} lg={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">Room Type</span>
            <div className="form__form-group-field">
              <Field
                name="component_tracking"
                component={renderSelectField}
                type="text"
                required
                ref={node => (this.inputComponentTracking = node)}
                options={[
                  { value: 'INDOOR', label: 'Indoor' },
                  { value: 'OUTDOOR', label: 'Outdoor' },
                  { value: 'GREENHOUSE', label: 'Greenhouse' },
                ]}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Plant Stage</span>
            <div className="form__form-group-field">
              <Field
                name="plant_stage"
                component={renderSelectField}
                type="text"
                required
                ref={node => (this.inputPlantStage = node)}
                options={[
                  { value: 'SEEDLING', label: 'Seedling' },
                  { value: 'PRE-VEG', label: 'Pre-Veg' },
                  { value: 'VEG', label: 'Veg' },
                  { value: 'FLOWER', label: 'Flower' },
                  { value: 'DRYING', label: 'Drying' },
                  { value: 'DRIED', label: 'Dried' },
                  { value: 'SOLD', label: 'Sold' },
                  { value: 'DESTROYED', label: 'Destroyed' },
                ]}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Description</span>
            <div className="form__form-group-field">
              <Field
                name="description"
                component="textarea"
                type="text"
                ref={node => (this.inputDescription = node)}
              />
            </div>
          </div>

        </Col>
        <Col md={4} lg={4}>
          <div className="form_form-group">
            <Button color="primary" disabled = {this.state.btnStatus} className="btn-block" type="submit">ADD PLANT(S)</Button>
          </div>
        </Col>
      </form>
    );
  }
}

export default reduxForm({
  form: 'plant_add_form',
  initialValues: {
    serial: `SN${Math.floor(Math.random() * 99999999) + 10000000}`,
  },
  enableReinitialize: true,
})(PlantAddForm);
