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
import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Input } from 'reactstrap';
import { reduxForm } from 'redux-form';
// import { matchPath } from 'react-router';
// import PropTypes from 'prop-types';
// import axios from 'axios';
// import PropTypes from 'prop-types';
// import { PropTypes } from 'react';
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';


class PlantEditForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      msg: '',
      plant: '',
      plantID: '',
      batches: '',
      roomType: [
        'INDOOR',
        'OUTDOOR',
        'GREENHOUSE',
      ],
      plantStage: [
        'SEEDLING',
        'PRE-VEG',
        'VEG',
        'FLOWER',
        'DRYING',
        'DRIED',
        'SOLD',
        'DESTROYED',
        'MALE',
        'MOTHER',
      ],
      growMethod: [
        'SOIL',
        'HYDROPONIC',
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    const parts = window.location.hash.split('/');
    const lastSegment = parts.pop() || parts.pop();
    console.log('Param', lastSegment);
  }

  async componentDidMount() {
    this.setState({ loader: 'LOADING' });
    const parts = window.location.hash.split('/');
    const plantID = parts.pop() || parts.pop();
    this.setState({ plantID });
    const plant = await this.getPlant(plantID);
    console.log('planttt', plant);
    this.setState({ plant });
    this.setState({ loader: 'LOADED' });
  }

  getPlant = async (plantID) => {
    let plant = {};
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT}/plants/${plantID}`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.data.error) {
        plant = response.data.plant;
        this.setState({ plant: response.data.plant });
        this.setState({ batches: response.data.batches });
        console.log(response.data.plant);
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
    console.log('plant', plant);
    return plant;
  }

  async handleSubmit(e) {
    e.preventDefault();
    const name = this.refs.testForm.name.value;
    const batchID = this.refs.testForm.batchID.value;
    const componentTracking = this.refs.testForm.roomType.value;
    const plantStage = this.refs.testForm.plantStage.value;
    const description = this.refs.testForm.description.value;
    const growMethod = this.refs.testForm.growMethod.value;
    // eslint-disable-next-line no-console
    const bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('batch_id', batchID);
    bodyFormData.append('grow_method', growMethod);
    bodyFormData.append('component_tracking', componentTracking);
    bodyFormData.append('plant_stage', plantStage);
    bodyFormData.append('description', description);

    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const plantID = this.state.plantID;
    const urls = `${process.env.API_ENDPOINT}/plants/update/${plantID}`;
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
        history.push('/plants/list', { forceRefresh: true });
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
          {error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : null}
          <div className="form__form-group">
            <span className="form__form-group-label">Plant Name</span>
            <div className="form__form-group-field">
              {
                this.state.plant.name ? <Input defaultValue={this.state.plant.name} type="text" name="name" ref="name" /> : <Input type="text" name="name" ref="name" value="N/A" />
              }
            </div>
          </div>
          <div className="form__form-group form__form-group-id">
            <span className="form__form-group-label">Serial Number</span>
            <div className="form__form-group-field">
              {
                this.state.plant.serial ? <Input defaultValue={this.state.plant.serial} disabled type="text" ref={node => (this.inputSerial = node)} /> : <Input disabled value="N/A" />
              }
            </div>
          </div>
          <div className="form__form-group form__form-group-id">
            <span className="form__form-group-label">Batch Name</span>
            <div className="form__form-group-field">
              <Input type="select" ref="batchID" name="batchID">
                {
                  this.state.plant.batch ? <option value={this.state.plant.batch.id}>{this.state.plant.batch.batch_no}</option> : <option value="">NOT_ASSIGNED</option>
                }
                {
                  this.state.batches.map(Value => <option value={Value.id} key={Value.id}>{Value.name}</option>)
                }
              </Input>
            </div>
          </div>
          <div className="form__form-group form__form-group-id">
            <span className="form__form-group-label">Grow Method</span>
            <div className="form__form-group-field">
              <Input type="select" ref="growMethod" name="growMethod">
                <option value={this.state.plant.grow_method}>{this.state.plant.grow_method}</option>
                {
                  this.state.growMethod.map(Value => <option value={Value} key={Value}>{Value}</option>)
                }
              </Input>
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Room Type</span>
            <div className="form__form-group-field">
              <Input type="select" ref="roomType" name="roomType">
                <option value={this.state.plant.component_tracking}>{this.state.plant.component_tracking}</option>
                {
                  this.state.roomType.map(Value => <option value={Value} key={Value}>{Value}</option>)
                }
              </Input>
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Plant Stage</span>
            <div className="form__form-group-field">
              <Input type="select" ref="plantStage" name="plantStage">
                <option value={this.state.plant.plant_stage}>{this.state.plant.plant_stage}</option>
                {
                  this.state.plantStage.map(Value => <option value={Value} key={Value}>{Value}</option>)
                }
              </Input>
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Description</span>
            <div className="form__form-group-field">
              {
                this.state.plant.description ? <textarea defaultValue={this.state.plant.description} type="text" name="description" ref="description" /> : <Input disabled value="N/A" />
              }
            </div>
          </div>
          <div className="form_form-group">
            <ButtonToolbar className="form__button-toolbar">
              <Button color="primary" className="btn-block" type="submit">UPDATE PLANT</Button>
            </ButtonToolbar>
          </div>
        </form>
      );
    }
    return type;
  }
}

export default reduxForm({
  form: 'plant_add_form',
  enableReinitialize: true,
})(PlantEditForm);
