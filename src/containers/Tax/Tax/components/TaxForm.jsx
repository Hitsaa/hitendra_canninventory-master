/* eslint-disable */
import React, { PureComponent } from 'react';
import { Col, Row, Button, Container, ButtonToolbar } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import SaveAlt from '@material-ui/icons/SaveAlt';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Check from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import ViewIcon from '@material-ui/icons/Visibility';
import FilterList from '@material-ui/icons/FilterList';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Remove from '@material-ui/icons/Remove';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import MaterialTable from 'material-table';
import Modal from '@material-ui/core/Modal';
import {
  withStyles,
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import renderCheckBoxField from '../../../../shared/components/form/CheckBox';
import renderSelectField from '../../../../shared/components/form/Select';

import './styles.css';

const styles = {
  tabs: {
    width: '400px',
    display: 'inline-block',
    marginRight: '30px',
    verticalAlign: 'top',
  },
  links: {
    margin: 0,
    padding: 0,
  },
  tabLink: {
    height: '30px',
    lineHeight: '30px',
    padding: '0 15px',
    cursor: 'pointer',
    border: 'none',
    borderBottom: '2px solid transparent',
    display: 'inline-block',
  },
  activeLinkStyle: {
    borderBottom: '2px solid #333',
  },
  visibleTabStyle: {
    display: 'inline-block',
  },
  content: {
    padding: '0 15px',
  },
};
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const direction = 'ltr';
// direction = 'rtl';
const theme = createMuiTheme({
  direction: direction,
  palette: {
    type: 'light',
  },
});


class TaxForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      msg: '',
      tax: '',
    };
    this.handleExciseSubmit = this.handleExciseSubmit.bind(this);
    this.handleCountySubmit = this.handleCountySubmit.bind(this);
    this.handleStateSubmit = this.handleStateSubmit.bind(this);
    this.handleCitySubmit = this.handleCitySubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ loader: 'LOADING' });
    const tax = await this.getTax();
    this.setState({ tax });
    this.setState({ loader: 'LOADED' });
  }

    showMessage = (message, type) => {
    if (type == "error") {
      toast.error(message);
    } else if (type == "success") {
      toast.success(message);
    }
  }

  getTax = async () => {
    let tax = {};
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT}/settings/tax`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.data.error) {
        tax = response.data.tax;
        this.setState({ tax: response.data.tax });
        console.log(response);
      } else {
        this.setState({
          error: true,
          msg: response.data.message,
        });
        this.showMessage(response.data.message, "error");
      }
    }).catch((error) => {
      this.setState({
        error: true,
        msg: error.message,
      });
      this.showMessage(error.message, "error");
    });
    return tax;
  }

  async handleStateSubmit(e) {
    e.preventDefault();
    const flower = this.refs.stateForm.inputStateFlower.value;
    const shake = this.refs.stateForm.inputStateShake.value;
    const plant = this.refs.stateForm.inputStatePlant.value;
    const edible = this.refs.stateForm.inputStateEdible.value;
    const tincture = this.refs.stateForm.inputStateTincture.value;
    const tropical = this.refs.stateForm.inputStateTropical.value;
    const transdermal = this.refs.stateForm.inputStateTransdermal.value;
    const extract = this.refs.stateForm.inputStateExtract.value;
    const concentrate = this.refs.stateForm.inputStateConcentrate.value;

    const capsule = this.refs.stateForm.inputStateCapsule.value;
    const preroll = this.refs.stateForm.inputStatePreroll.value;
    const combined = this.refs.stateForm.inputStateCombined.value;
    const suppository = this.refs.stateForm.inputStateSuppository.value;
    const waste = this.refs.stateForm.inputStateWaste.value;
    const ancillary = this.refs.stateForm.inputStateAncillary.value;
    const other = this.refs.stateForm.inputStateOther.value;
    // eslint-disable-next-line no-console
    const bodyFormData = new FormData();
    bodyFormData.append('state_flower', flower);
    bodyFormData.append('state_shake', shake);
    bodyFormData.append('state_plant', plant);
    bodyFormData.append('state_edible', edible);
    bodyFormData.append('state_tincture', tincture);
    bodyFormData.append('state_tropical', tropical);
    bodyFormData.append('state_transdermal', transdermal);
    bodyFormData.append('state_extract', extract);
    bodyFormData.append('state_concentrate', concentrate);
    bodyFormData.append('state_capsule', capsule);
    bodyFormData.append('state_preroll', preroll);
    bodyFormData.append('state_combined', combined);
    bodyFormData.append('state_suppository', suppository);
    bodyFormData.append('state_ancillary', ancillary);
    bodyFormData.append('state_waste', waste);
    bodyFormData.append('state_other', other);

    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const urls = `${process.env.API_ENDPOINT}/settings/tax/update`;
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
        this.setState({
          error: false,
          msg: response.data.message,
        });
        this.showMessage(response.data.message, "success");
      } else {
        this.setState({
          error: true,
          msg: response.data.message,
        });
        this.showMessage(response.data.message, "error");
      }
    }).catch((error) => {
      this.setState({
        error: true,
        msg: error.message,
      });
      this.showMessage(error.message, "error");
    });
  }

  async handleCitySubmit(e) {
    e.preventDefault();
    const flower = this.refs.cityForm.inputCityFlower.value;
    const shake = this.refs.cityForm.inputCityShake.value;
    const plant = this.refs.cityForm.inputCityPlant.value;
    const edible = this.refs.cityForm.inputCityEdible.value;
    const tincture = this.refs.cityForm.inputCityTincture.value;
    const tropical = this.refs.cityForm.inputCityTropical.value;
    const transdermal = this.refs.cityForm.inputCityTransdermal.value;
    const extract = this.refs.cityForm.inputCityExtract.value;
    const concentrate = this.refs.cityForm.inputCityConcentrate.value;

    const capsule = this.refs.cityForm.inputCityCapsule.value;
    const preroll = this.refs.cityForm.inputCityPreroll.value;
    const combined = this.refs.cityForm.inputCityCombined.value;
    const suppository = this.refs.cityForm.inputCitySuppository.value;
    const waste = this.refs.cityForm.inputCityWaste.value;
    const ancillary = this.refs.cityForm.inputCityAncillary.value;
    const other = this.refs.cityForm.inputCityOther.value;
    // eslint-disable-next-line no-console
    const bodyFormData = new FormData();
    bodyFormData.append('city_flower', flower);
    bodyFormData.append('city_shake', shake);
    bodyFormData.append('city_plant', plant);
    bodyFormData.append('city_edible', edible);
    bodyFormData.append('city_tincture', tincture);
    bodyFormData.append('city_tropical', tropical);
    bodyFormData.append('city_transdermal', transdermal);
    bodyFormData.append('city_extract', extract);
    bodyFormData.append('city_concentrate', concentrate);
    bodyFormData.append('city_capsule', capsule);
    bodyFormData.append('city_preroll', preroll);
    bodyFormData.append('city_combined', combined);
    bodyFormData.append('city_suppository', suppository);
    bodyFormData.append('city_ancillary', ancillary);
    bodyFormData.append('city_waste', waste);
    bodyFormData.append('city_other', other);

    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const urls = `${process.env.API_ENDPOINT}/settings/tax/update`;
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
        this.setState({
          error: false,
          msg: response.data.message,
        });
        this.showMessage(response.data.message, "success");
      } else {
        this.setState({
          error: true,
          msg: response.data.message,
        });
        this.showMessage(response.data.message, "error");
      }
    }).catch((error) => {
      this.setState({
        error: true,
        msg: error.message,
      });
      this.showMessage(error.message, "error");
    });
  }
  async handleCountySubmit(e) {
    e.preventDefault();
    const flower = this.refs.countyForm.inputCountyFlower.value;
    const shake = this.refs.countyForm.inputCountyShake.value;
    const plant = this.refs.countyForm.inputCountyPlant.value;
    const edible = this.refs.countyForm.inputCountyEdible.value;
    const tincture = this.refs.countyForm.inputCountyTincture.value;
    const tropical = this.refs.countyForm.inputCountyTropical.value;
    const transdermal = this.refs.countyForm.inputCountyTransdermal.value;
    const extract = this.refs.countyForm.inputCountyExtract.value;
    const concentrate = this.refs.countyForm.inputCountyConcentrate.value;

    const capsule = this.refs.countyForm.inputCountyCapsule.value;
    const preroll = this.refs.countyForm.inputCountyPreroll.value;
    const combined = this.refs.countyForm.inputCountyCombined.value;
    const suppository = this.refs.countyForm.inputCountySuppository.value;
    const waste = this.refs.countyForm.inputCountyWaste.value;
    const ancillary = this.refs.countyForm.inputCountyAncillary.value;
    const other = this.refs.countyForm.inputCountyOther.value;
    // eslint-disable-next-line no-console
    const bodyFormData = new FormData();
    bodyFormData.append('county_flower', flower);
    bodyFormData.append('county_shake', shake);
    bodyFormData.append('county_plant', plant);
    bodyFormData.append('county_edible', edible);
    bodyFormData.append('county_tincture', tincture);
    bodyFormData.append('county_tropical', tropical);
    bodyFormData.append('county_transdermal', transdermal);
    bodyFormData.append('county_extract', extract);
    bodyFormData.append('county_concentrate', concentrate);
    bodyFormData.append('county_capsule', capsule);
    bodyFormData.append('county_preroll', preroll);
    bodyFormData.append('county_combined', combined);
    bodyFormData.append('county_suppository', suppository);
    bodyFormData.append('county_ancillary', ancillary);
    bodyFormData.append('county_waste', waste);
    bodyFormData.append('county_other', other);

    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const urls = `${process.env.API_ENDPOINT}/settings/tax/update`;
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
        this.setState({
          error: false,
          msg: response.data.message,
        });
        this.showMessage(response.data.message, "success");
      } else {
        this.setState({
          error: true,
          msg: response.data.message,
        });
        this.showMessage(response.data.message, "error");
      }
    }).catch((error) => {
      this.setState({
        error: true,
        msg: error.message,
      });
      this.showMessage(error.message, "error");
    });
  }
  async handleExciseSubmit(e) {
    e.preventDefault();
    const flower = this.refs.exciseForm.inputExciseFlower.value;
    const shake = this.refs.exciseForm.inputExciseShake.value;
    const plant = this.refs.exciseForm.inputExcisePlant.value;
    const edible = this.refs.exciseForm.inputExciseEdible.value;
    const tincture = this.refs.exciseForm.inputExciseTincture.value;
    const tropical = this.refs.exciseForm.inputExciseTropical.value;
    const transdermal = this.refs.exciseForm.inputExciseTransdermal.value;
    const extract = this.refs.exciseForm.inputExciseExtract.value;
    const concentrate = this.refs.exciseForm.inputExciseConcentrate.value;

    const capsule = this.refs.exciseForm.inputExciseCapsule.value;
    const preroll = this.refs.exciseForm.inputExcisePreroll.value;
    const combined = this.refs.exciseForm.inputExciseCombined.value;
    const suppository = this.refs.exciseForm.inputExciseSuppository.value;
    const waste = this.refs.exciseForm.inputExciseWaste.value;
    const ancillary = this.refs.exciseForm.inputExciseAncillary.value;
    const other = this.refs.exciseForm.inputExciseOther.value;
    // eslint-disable-next-line no-console
    const bodyFormData = new FormData();
    bodyFormData.append('excise_flower', flower);
    bodyFormData.append('excise_shake', shake);
    bodyFormData.append('excise_plant', plant);
    bodyFormData.append('excise_edible', edible);
    bodyFormData.append('excise_tincture', tincture);
    bodyFormData.append('excise_tropical', tropical);
    bodyFormData.append('excise_transdermal', transdermal);
    bodyFormData.append('excise_extract', extract);
    bodyFormData.append('excise_concentrate', concentrate);
    bodyFormData.append('excise_capsule', capsule);
    bodyFormData.append('excise_preroll', preroll);
    bodyFormData.append('excise_combined', combined);
    bodyFormData.append('excise_suppository', suppository);
    bodyFormData.append('excise_ancillary', ancillary);
    bodyFormData.append('excise_waste', waste);
    bodyFormData.append('excise_other', other);

    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const urls = `${process.env.API_ENDPOINT}/settings/tax/update`;
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
        this.setState({
          error: false,
          msg: response.data.message,
        });
        this.showMessage(response.data.message, "success");
      } else {
        this.setState({
          error: true,
          msg: response.data.message,
        });
        this.showMessage(response.data.message, "error");
      }
    }).catch((error) => {
      this.setState({
        error: true,
        msg: error.message,
      });
      this.showMessage(error.message, "error");
    });
  }

  render() {
    const { plants, plants2, columns, columns2, isInitialPage } = this.state;
    const { loader, msg, error, classes } = this.state;
    // console.log('rows1', this.state);
    let type = null;
    if (loader === 'LOADING') {
      type = <div className="load__icon-wrap"><svg className="load__icon"><path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg> </div>;
    }
    if (loader === 'LOADED') {
      type = (
        <div>
          <ToastContainer autoClose={3000} />
          {/* <h3>Test</h3> */}
          <div id="plain-react">
            <Tabs
              className="tabs tabs-1"
              onChange={tab => console.log(`Tab selected: ${tab}`)} // eslint-disable-line no-console
            >
              <div className="tab-links">
                <TabLink to="tab1">Excise Tax</TabLink>
                <TabLink to="tab2">State Tax</TabLink>
                <TabLink to="tab3">County Tax</TabLink>
                <TabLink to="tab4">City Tax</TabLink>
              </div>
              <Col md={12} lg={12}>
                <div className="content1">
                  <TabContent for="tab1">
                    <Col md={12} lg={12}>
                    <MuiThemeProvider theme={theme}>
                      <form className="form form form--horizontal" ref="exciseForm" onSubmit={this.handleExciseSubmit}>
                      <Col md={4} lg={4}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Flower</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.excise_flower}
                              name="inputExciseFlower"
                              type="text"
                              ref="inputExciseFlower"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Shake/Trim</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.excise_shake}
                              name="inputExciseShake"
                              type="text"
                              ref="inputExciseShake"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Plant</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.excise_plant}
                              name="inputExcisePlant"
                              type="text"
                              
                              ref="inputExcisePlant"
                            />
                          </div>
                           </div>
                          <div className="form__form-group">
                          <span className="form__form-group-label">Edible</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.excise_edible}
                              name="inputExciseEdible"
                              type="text"
                              
                              ref="inputExciseEdible"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Tincture</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.excise_tincture}
                              name="inputExciseTincture"
                              type="text"
                              
                              ref="inputExciseTincture"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Tropical</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.excise_tropical}
                              name="inputExciseTropical"
                              type="text"
                              
                              ref="inputExciseTropical"
                            />
                          </div>
                        </div>
                                               
                        </Col>
                        <Col md={4} lg={4}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Trans-Dermal</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.excise_transdermal}
                              name="inputExciseTransdermal"
                              type="text"
                              
                              ref="inputExciseTransdermal"
                              />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Extract</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.excise_extract}
                              name="inputExciseExtract"
                              type="text"
                              
                              ref="inputExciseExtract"
                            />
                          </div>
                        </div>

                        <div className="form__form-group">
                          <span className="form__form-group-label">Concentrate</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.excise_concentrate}
                              name="inputExciseConcentrate"
                              type="text"
                              
                              ref="inputExciseConcentrate"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Capsule</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.excise_capsule}
                              name="inputExciseCapsule"
                              type="text"
                              
                              ref="inputExciseCapsule"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Pre-Roll</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.excise_preroll}
                              name="inputExcisePreroll"
                              type="text"
                              
                              ref="inputExcisePreroll"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Combined Category</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.excise_combined}
                              name="inputExciseCombined"
                              type="text"
                              
                              ref="inputExciseCombined"
                            />
                          </div>
                        </div>
                                               
                        </Col>
                        <Col md={4} lg={4}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Suppository</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.excise_suppository}
                              name="inputExciseSuppository"
                              type="text"
                              
                              ref="inputExciseSuppository"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Waste</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.excise_waste}
                              name="inputExciseWaste"
                              type="text"
                              
                              ref="inputExciseWaste"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Ancillary</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.excise_ancillary}
                              name="inputExciseAncillary"
                              type="text"
                              
                              ref="inputExciseAncillary"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Other</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.excise_other}
                              name="inputExciseOther"
                              type="text"
                              
                              ref="inputExciseOther"
                            />
                          </div>
                        </div>
                         

                        <div className="form_form-group">
                          {/* <ButtonToolbar className="form__button-toolbar"> */}
                            <Button color="primary" className="btn-block" type="submit">UPDATE EXCISE TAX RATE</Button>
                          {/* </ButtonToolbar> */}
                        </div>
                        </Col>
                      
                      </form>
                      </MuiThemeProvider>
                    </Col>
                  </TabContent>
                  <TabContent for="tab2">
                    <Col md={12} lg={12}>
                    <MuiThemeProvider theme={theme}>
                      <form className="form form form--horizontal" ref="stateForm" onSubmit={this.handleStateSubmit}>
                      <Col md={4} lg={4}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Flower</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.state_flower}
                              name="inputStateFlower"
                              type="text"
                              
                              ref="inputStateFlower"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Shake/Trim</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.state_shake}
                              name="inputStateShake"
                              type="text"
                              
                              ref="inputStateShake"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Plant</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.state_plant}
                              name="inputStatePlant"
                              type="text"
                              
                              ref="inputStatePlant"
                            />
                          </div>
                           </div>
                          <div className="form__form-group">
                          <span className="form__form-group-label">Edible</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.state_edible}
                              name="inputStateEdible"
                              type="text"
                              
                              ref="inputStateEdible"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Tincture</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.state_tincture}
                              name="inputStateTincture"
                              type="text"
                              
                              ref="inputStateTincture"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Tropical</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.state_tropical}
                              name="inputStateTropical"
                              type="text"
                              
                              ref="inputStateTropical"
                            />
                          </div>
                        </div>
                                               
                        </Col>
                        <Col md={4} lg={4}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Trans-Dermal</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.state_transdermal}
                              name="inputStateTransdermal"
                              type="text"
                              
                              ref="inputStateTransdermal"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Extract</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.state_extract}
                              name="inputStateExtract"
                              type="text"
                              
                              ref="inputStateExtract"
                            />
                          </div>
                        </div>

                        <div className="form__form-group">
                          <span className="form__form-group-label">Concentrate</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.state_concentrate}
                              name="inputStateConcentrate"
                              type="text"
                              
                              ref="inputStateConcentrate"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Capsule</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.state_capsule}
                              name="inputStateCapsule"
                              type="text"
                              
                              ref="inputStateCapsule"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Pre-Roll</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.state_preroll}
                              name="inputStatePreroll"
                              type="text"
                              
                              ref="inputStatePreroll"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Combined Category</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.state_combined}
                              name="inputStateCombined"
                              type="text"
                              
                              ref="inputStateCombined"
                            />
                          </div>
                        </div>
                                               
                        </Col>
                        <Col md={4} lg={4}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Suppository</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.state_suppository}
                              name="inputStateSuppository"
                              type="text"
                              
                              ref="inputStateSuppository"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Waste</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.state_waste}
                              name="inputStateWaste"
                              type="text"
                              
                              ref="inputStateWaste"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Ancillary</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.state_ancillary}
                              name="inputStateAncillary"
                              type="text"
                              
                              ref="inputStateAncillary"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Other</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.state_other}
                              name="inputStateOther"
                              type="text"
                              
                              ref="inputStateOther"
                            />
                          </div>
                        </div>
                         

                        <div className="form_form-group">
                          {/* <ButtonToolbar className="form__button-toolbar"> */}
                            <Button color="primary" className="btn-block" type="submit">UPDATE STATE TAX RATE</Button>
                          {/* </ButtonToolbar> */}
                        </div>
                        </Col>
                      
                      </form>
                      </MuiThemeProvider>
                    </Col>
                  </TabContent>
                  <TabContent for="tab3">
                    <Col md={12} lg={12}>
                    <MuiThemeProvider theme={theme}>
                      <form className="form form form--horizontal" ref="countyForm" onSubmit={this.handleCountySubmit}>
                      <Col md={4} lg={4}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Flower</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.county_flower}
                              name="inputCountyFlower"
                              type="text"
                              ref="inputCountyFlower"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Shake/Trim</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.county_shake}
                              name="inputCountyShake"
                              type="text"
                              ref="inputCountyShake"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Plant</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.county_plant}
                              name="inputCountyPlant"
                              type="text"
                              
                              ref="inputCountyPlant"
                            />
                          </div>
                           </div>
                          <div className="form__form-group">
                          <span className="form__form-group-label">Edible</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.county_edible}
                              name="inputCountyEdible"
                              type="text"
                              
                              ref="inputCountyEdible"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Tincture</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.county_tincture}
                              name="inputCountyTincture"
                              type="text"
                              
                              ref="inputCountyTincture"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Tropical</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.county_tropical}
                              name="inputCountyTropical"
                              type="text"
                              
                              ref="inputCountyTropical"
                            />
                          </div>
                        </div>
                                               
                        </Col>
                        <Col md={4} lg={4}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Trans-Dermal</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.county_transdermal}
                              name="inputCountyTransdermal"
                              type="text"
                              
                              ref="inputCountyTransdermal"
                              />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Extract</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.county_extract}
                              name="inputCountyExtract"
                              type="text"
                              
                              ref="inputCountyExtract"
                            />
                          </div>
                        </div>

                        <div className="form__form-group">
                          <span className="form__form-group-label">Concentrate</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.county_concentrate}
                              name="inputCountyConcentrate"
                              type="text"
                              
                              ref="inputCountyConcentrate"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Capsule</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.county_capsule}
                              name="inputCountyCapsule"
                              type="text"
                              
                              ref="inputCountyCapsule"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Pre-Roll</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.county_preroll}
                              name="inputCountyPreroll"
                              type="text"
                              
                              ref="inputCountyPreroll"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Combined Category</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.county_combined}
                              name="inputCountyCombined"
                              type="text"
                              
                              ref="inputCountyCombined"
                            />
                          </div>
                        </div>
                                               
                        </Col>
                        <Col md={4} lg={4}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Suppository</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.county_suppository}
                              name="inputCountySuppository"
                              type="text"
                              
                              ref="inputCountySuppository"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Waste</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.county_waste}
                              name="inputCountyWaste"
                              type="text"
                              
                              ref="inputCountyWaste"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Ancillary</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.county_ancillary}
                              name="inputCountyAncillary"
                              type="text"
                              
                              ref="inputCountyAncillary"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Other</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.county_other}
                              name="inputCountyOther"
                              type="text"
                              
                              ref="inputCountyOther"
                            />
                          </div>
                        </div>
                         

                        <div className="form_form-group">
                          {/* <ButtonToolbar className="form__button-toolbar"> */}
                            <Button color="primary" className="btn-block" type="submit">UPDATE COUNTY TAX RATE</Button>
                          {/* </ButtonToolbar> */}
                        </div>
                        </Col>
                      
                      </form>
                      </MuiThemeProvider>
                    </Col>
                  </TabContent>
                    <TabContent for="tab4">
                    <Col md={12} lg={12}>
                      <MuiThemeProvider theme={theme}>
                      <form className="form form form--horizontal" ref="cityForm" onSubmit={this.handleCitySubmit}>
                      <Col md={4} lg={4}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Flower</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.city_flower}
                              name="inputCityFlower"
                              type="text"
                              
                              ref="inputCityFlower"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Shake/Trim</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.city_shake}
                              name="inputCityShake"
                              type="text"
                              
                              ref="inputCityShake"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Plant</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.city_plant}
                              name="inputCityPlant"
                              type="text"
                              
                              ref="inputCityPlant"
                            />
                          </div>
                           </div>
                          <div className="form__form-group">
                          <span className="form__form-group-label">Edible</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.city_edible}
                              name="inputCityEdible"
                              type="text"
                              
                              ref="inputCityEdible"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Tincture</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.city_tincture}
                              name="inputCityTincture"
                              type="text"
                              
                              ref="inputCityTincture"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Tropical</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.city_tropical}
                              name="inputCityTropical"
                              type="text"
                              
                              ref="inputCityTropical"
                            />
                          </div>
                        </div>
                                               
                        </Col>
                        <Col md={4} lg={4}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Trans-Dermal</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.city_transdermal}
                              name="inputCityTransdermal"
                              type="text"
                              
                              ref="inputCityTransdermal"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Extract</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.city_extract}
                              name="inputCityExtract"
                              type="text"
                              
                              ref="inputCityExtract"
                            />
                          </div>
                        </div>

                        <div className="form__form-group">
                          <span className="form__form-group-label">Concentrate</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.city_concentrate}
                              name="inputCityConcentrate"
                              type="text"
                              
                              ref="inputCityConcentrate"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Capsule</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.city_capsule}
                              name="inputCityCapsule"
                              type="text"
                              
                              ref="inputCityCapsule"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Pre-Roll</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.city_preroll}
                              name="inputCityPreroll"
                              type="text"
                              
                              ref="inputCityPreroll"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Combined Category</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.city_combined}
                              name="inputCityCombined"
                              type="text"
                              
                              ref="inputCityCombined"
                            />
                          </div>
                        </div>
                                               
                        </Col>
                        <Col md={4} lg={4}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Suppository</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.city_suppository}
                              name="inputCitySuppository"
                              type="text"
                              
                              ref="inputCitySuppository"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Waste</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.city_waste}
                              name="inputCityWaste"
                              type="text"
                              
                              ref="inputCityWaste"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Ancillary</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.city_ancillary}
                              name="inputCityAncillary"
                              type="text"
                              
                              ref="inputCityAncillary"
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Other</span>
                          <div className="form__form-group-field">
                          <Input defaultValue={this.state.tax.city_other}
                              name="inputCityOther"
                              type="text"
                              
                              ref="inputCityOther"
                            />
                          </div>
                        </div>
                         

                        <div className="form_form-group">
                          {/* <ButtonToolbar className="form__button-toolbar"> */}
                            <Button color="primary" className="btn-block" type="submit">UPDATE CITY TAX RATE</Button>
                          {/* </ButtonToolbar> */}
                        </div>
                        </Col>
                      
                      </form>
                      </MuiThemeProvider>
                    </Col>
                    </TabContent>
               
                </div>
              </Col>

            </Tabs>
          </div>
        </div>
      );
    }
    return type;
  }
}

export default reduxForm({
  form: 'plant_add_form',
  enableReinitialize: true,
})(TaxForm);
