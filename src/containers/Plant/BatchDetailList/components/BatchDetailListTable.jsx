/* eslint-disable */
import React, { PureComponent } from 'react';
import { Col, Row, Button, Container, ButtonToolbar } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import createHashHistory from 'history/createHashHistory';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
// import AddIcon from '@material-ui/icons/Add';
// import ViewIcon from '@material-ui/icons/Visibility';
// import UploadIcon from '@material-ui/icons/CloudUpload';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';

// import IconButton from '@material-ui/core/IconButton';
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
// import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import ViewIcon from '@material-ui/icons/Visibility';
import FilterList from '@material-ui/icons/FilterList';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Remove from '@material-ui/icons/Remove';
// import UploadIcon from '@material-ui/icons/CloudUpload';
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

class BatchDetailListTable extends PureComponent {
  constructor() {
    super();
    this.state = {
      rows: [],
      classes: useStyles,
      pageOfItems: [],
      loaded: 'NOT_LOADED',
      authenticated: false,
      editing: false,
      selectedCount: 0,
      msg: '',
      isOpen: false,
      error: false,
      selectedRow: [],
      isInitialPage: true,
      plants: [],
      plants2: [],
      batchID: '',
      // columns: ['Strain Name', 'Serial', 'Stage', 'Room Type', 'Grow Method'],
      columns: [
        { title: 'Id', field: 'id', editable: 'never' },
        { title: 'Strain Name', field: 'name' },
        { title: 'Serial', field: 'serial', editable: 'never' },
        {
          title: 'Stage',
          field: 'stage',
          lookup: { 'SEEDLING': 'SEEDLING', 'PRE-VEG': 'PRE-VEG', 'VEG': 'VEG', 'FLOWER': 'FLOWER', 'DRYING': 'DRYING', 'DRIED': 'DRIED', 'DESTROYED': 'DESTROYED', 'MALE': 'MALE', 'MOTHER': 'MOTHER', 'SOLD': 'SOLD' },
        },
        {
          title: 'Room Type',
          field: 'room_type',
          lookup: { 'INDOOR': 'INDOOR', 'OUTDOOR': 'OUTDOOR', 'GREENHOUSE': 'GREENHOUSE', 'MALE': 'MALE' },
        },
        {
          title: 'Grow Method',
          field: 'grow_method',
          lookup: { 'SOIL': 'SOIL', 'HYDROPONIC': 'HYDROPONIC' },
        },
        { title: 'Label', field: 'label' },
      ],
      columns2: [
        { title: 'Id', field: 'id', editable: 'never' },
        { title: 'Flower/Bud W/Weight', field: 'fbwweight' },
        { title: 'Shake/Trim W/Weight', field: 'stwweight' },
        { title: 'Waste W/Weight', field: 'wastewweight' },
        { title: 'Flower/Bud D/Weight', field: 'fbdweight' },
        { title: 'Shake/Trim D/Weight', field: 'stdweight' },
        { title: 'Waste D/Weight', field: 'wastedweight' },
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLabelSubmit = this.handleLabelSubmit.bind(this);
    this.handleStageSubmit = this.handleStageSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ selectedRow: [] });
    this.setState({ loader: 'LOADING' });
    const parts = window.location.hash.split('/');
    const batchID = parts.pop() || parts.pop();
    this.setState({ batchID });
    const plants = await this.getBatches(batchID);
    console.log('batchid', plants);
    this.setState({ plants });
    this.setState({ loader: 'LOADED' });
  }

  getBatches = async (batchID) => {
    const rows = [];
    const plants2 = [];
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT}/batches/plants/${batchID}`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.data.error) {
        this.setState({ plants: response.data.plants });
        for (let i = 0; i < response.data.plants.length; i += 1) {
          const lurl = `/plants/labels/${response.data.plants[i].id}`;
          const lbel = <Tooltip title="Label"><IconButton component={Link} to={lurl}><Check /></IconButton></Tooltip>;
          rows.push({
            id: response.data.plants[i].id,
            name: response.data.plants[i].name,
            serial: response.data.plants[i].serial,
            stage: response.data.plants[i].plant_stage,
            room_type: response.data.plants[i].component_tracking,
            grow_method: response.data.plants[i].grow_method,
            label: lbel,
          });
        }
        for (let i = 0; i < response.data.batch.length; i += 1) {
          plants2.push({
            id: response.data.batch[i].id,
            fbwweight: response.data.batch[i].fbwweight,
            stwweight: response.data.batch[i].stwweight,
            wastewweight: response.data.batch[i].wastewweight,
            fbdweight: response.data.batch[i].fbdweight,
            stdweight: response.data.batch[i].stdweight,
            wastedweight: response.data.batch[i].wastedweight,
          });
        }
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
    this.setState({ plants2 });
    return rows;
  }

  showMessage = (message, type) => {
    if (type == "error") {
        toast.error(message);
    } else if (type == "success") {
        toast.success(message);
    }
}


  async handleSubmit(e) {
    e.preventDefault();
    const plantStage = this.inputPlantStage.value;
    const pricePerWeight = this.inputPricePerWeight.value;
    if (plantStage) {
      // eslint-disable-next-line no-console
      const bodyFormData = new FormData();
      bodyFormData.append('plant_stage', plantStage.value);

      const urls = `${process.env.API_ENDPOINT}/batches/update/${this.state.batchID}`;

      const tokenStr = localStorage.getItem('cannave_token');
      const token = JSON.parse(tokenStr);
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
          // const history = createHashHistory();
          // history.push('/products/list', { forceRefresh: true });
          this.showMessage(response.data.message, "success");
        } else {
          this.setState({
            error: true,
            msg: response.data.message,
          });
        }
        this.showMessage(response.data.message, "error");
      }).catch((error) => {
        this.setState({
          error: true,
          msg: error.message,
        });
      });
      this.showMessage(response.data.message, "error");
    }
  }

  // async handleLabelSubmit(e) {
  //   e.preventDefault();
  //   const date = this.inputDate.value;
  //   if (date) {
  //     // eslint-disable-next-line no-console
  //     const bodyFormData = new FormData();
  //     bodyFormData.append('date', date);

  //     const urls = `${process.env.API_ENDPOINT}/batches/labels/download/${this.state.batchID}`;

  //     const tokenStr = localStorage.getItem('cannave_token');
  //     const token = JSON.parse(tokenStr);
  //     axios({
  //       method: 'post',
  //       url: urls,
  //       data: bodyFormData,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //     }).then((response) => {
  //       if (!response.data.error) {
  //         // const history = createHashHistory();
  //         // history.push('/products/list', { forceRefresh: true });
  //         window.open(response);
  //         this.showMessage(response.data.message, "success");

  //       } else {
  //         this.setState({
  //           error: true,
  //           msg: response.data.message,
  //         });
  //         this.showMessage(response.data.message, "error");
  //       }
  //     }).catch((error) => {
  //       this.setState({
  //         error: true,
  //         msg: error.message,
  //       });
  //       this.showMessage(error.message, "error");
  //     });
  //   }
  // }

    handleLabelSubmit(e) {
    e.preventDefault();
    const date = this.inputDate.value;
    const number = this.inputSizeType.value;
    const printerType = this.inputPrinterType.value;
    let urls = '';
    if (date && number) {
    // const urls = `${process.env.API_FILE_ENDPOINT}/products/labels/download/${this.state.productID}`;
    if(printerType.value=='thermal'){
      urls = `${process.env.API_FILE_ENDPOINT}/batches/labels/thermal/${this.state.batchID}/${number.value}/${date}`;
    
    }else{
      urls = `${process.env.API_FILE_ENDPOINT}/batches/labels/download/${this.state.batchID}/${number.value}/${date}`;
    }
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
}

  async handleStageSubmit(e) {
    e.preventDefault();
    const plantStage = this.inputPlantStage.value;
    const serials = this.inputSerials.value;
    if (plantStage) {
      // eslint-disable-next-line no-console
      const bodyFormData = new FormData();
      bodyFormData.append('plant_stage', plantStage.value);
      bodyFormData.append('serials', serials);

      const urls = `${process.env.API_ENDPOINT}/batches/stage/update/${this.state.batchID}`;

      const tokenStr = localStorage.getItem('cannave_token');
      const token = JSON.parse(tokenStr);
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
          history.go(`/batches/details/${this.state.batchID}`, { forceRefresh: true });
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
  }

  async checkContains(tableData) {
    console.log('abount to check' + tableData);
    console.log('abount to checkee' + this.state.selectedRow);

    if (this.state.selectedRow.includes(tableData)) {
      return true;
    }
    return false;
  }

  addToState(selectedRowID) {
    const prevArray = this.state.selectedRow;
    prevArray.push(selectedRowID);
    this.setState({ selectedRow: prevArray });
    console.log('selected', selectedRowID);
    console.log('state so far', this.state.selectedRow);
  }

  handleClick(id) {
    const history = createHashHistory();
    history.push(`/plants/labels/${id}`, { forceRefresh: true });
  }

  handleClickOpen() {
    this.setState({ isOpen: true });
  }

  handleClose() {
    this.setState({ isOpen: false });
  }

  openBulkUpload() {
    const history = createHashHistory();
    history.push(`/plants/upload/${this.state.batchID}`, { forceRefresh: true });
  }

  openAddPlant() {
    const history = createHashHistory();
    history.push(`/plants/add/${this.state.batchID}`, { forceRefresh: true });
    history.go(`/plants/add/${this.state.batchID}`, { forceRefresh: true });
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
                <TabLink to="tab1">Batch Plants</TabLink>
                <TabLink to="tab2">Batch Weight Summary</TabLink>
                <TabLink to="tab3">Bulk Stage Update</TabLink>
                <TabLink to="tab4">Print Labels</TabLink>
              </div>
              <Col md={12} lg={12}>
                <div className="content1">
                  <TabContent for="tab1">
                    <Col md={12} lg={12}>
                      <MuiThemeProvider theme={theme}>
                        <MaterialTable
                          icons={{
                            Check: Check,
                            DetailPanel: ChevronRight,
                            Export: SaveAlt,
                            Filter: FilterList,
                            FirstPage: FirstPage,
                            LastPage: LastPage,
                            NextPage: ChevronRight,
                            PreviousPage: ChevronLeft,
                            Search: Search,
                            ThirdStateCheck: Remove,
                            Upload: '', // UploadIcon,
                          }}
                          title="Batch#"
                          columns={columns}
                          data={this.state.plants}
                          editable={{
                            onRowUpdate: (newData, oldData) =>
                              new Promise(resolve => {
                                console.log('olddata', oldData);
                                console.log('newdata', newData);
                                const bodyFormData = new FormData();
                                bodyFormData.append('name', newData.name);
                                bodyFormData.append('grow_method', newData.grow_method);
                                bodyFormData.append('component_tracking', newData.room_type);
                                bodyFormData.append('plant_stage', newData.stage);
                                const labelUrl = oldData.label;
                                const tokenStr = localStorage.getItem('cannave_token');
                                const token = JSON.parse(tokenStr);
                                const plantID = this.state.plantID;
                                const urls = `${process.env.API_ENDPOINT}/plants/update/${newData.id}`;
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
                                    resolve({});
                                    const data1 = this.state.plants;
                                    console.log('unupdated', data1);
                                    const nFinalData = newData;
                                    nFinalData.label = oldData.label;
                                    data1[data1.indexOf(oldData)] = nFinalData;
                                    console.log('updated', data1);
                                    this.setState({ plants: data1 });
                                    this.setState({ state: this.state });
                                  } else {
                                    resolve();
                                  }
                                }).catch((error1) => {
                                  this.setState({
                                    error: true,
                                    msg: error1.message,
                                  });
                                  resolve();
                                });
                              }),
                            onRowDelete: oldData =>
                              new Promise(resolve => {
                                const tokenStr = localStorage.getItem('cannave_token');
                                const token = JSON.parse(tokenStr);
                                const urls = `${process.env.API_ENDPOINT}/plants/delete/${oldData.id}`;
                                axios({
                                  method: 'post',
                                  url: urls,
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                  },
                                }).then((response) => {
                                  if (!response.data.error) {
                                    resolve({});
                                    const data1 = this.state.plants;
                                    console.log('deleted', data1);
                                    data1.splice(data1.indexOf(oldData), 1);
                                    console.log('deleted', data1);
                                    this.setState({ plants: data1 });
                                    this.setState({ state: this.state });
                                  } else {
                                    resolve();
                                  }
                                }).catch((error1) => {
                                  resolve();
                                });
                              }),
                          }}
                          options={{
                            actionsColumnIndex: -1,
                          }}
                          actions={[
                            {
                              icon: 'add',
                              tooltip: 'New Plant',
                              isFreeAction: true,
                              onClick: (event) => this.openAddPlant(),
                            },
                            // {
                            //   icon: 'Upload',
                            //   tooltip: 'Upload Plants',
                            //   isFreeAction: true,
                            //   onClick: (event) => this.openBulkUpload(),
                            // },
                          ]}
                        />
                      </MuiThemeProvider>
                    </Col>
                  </TabContent>
                  <TabContent for="tab2">
                    <Col md={12} lg={12}>
                      <MaterialTable
                        icons={{
                          Check: Check,
                          DetailPanel: ChevronRight,
                          Export: SaveAlt,
                          Filter: FilterList,
                          FirstPage: FirstPage,
                          LastPage: LastPage,
                          NextPage: ChevronRight,
                          PreviousPage: ChevronLeft,
                          Search: Search,
                          ThirdStateCheck: Remove,
                        }}
                        title="Batch#"
                        columns={columns2}
                        data={plants2}
                        editable={{
                          onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                              console.log('olddata', oldData);
                              console.log('newdata', newData);
                              const bodyFormData = new FormData();
                              bodyFormData.append('fbwweight', newData.fbwweight);
                              bodyFormData.append('stwweight', newData.stwweight);
                              bodyFormData.append('wastewweight', newData.wastewweight);
                              bodyFormData.append('fbdweight', newData.fbdweight);
                              bodyFormData.append('stdweight', newData.stdweight);
                              bodyFormData.append('wastedweight', newData.wastedweight);
                              const tokenStr = localStorage.getItem('cannave_token');
                              const token = JSON.parse(tokenStr);
                              const plantID = this.state.plantID;
                              const urls = `${process.env.API_ENDPOINT}/batches/weight/update/${newData.id}`;
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
                                  resolve({});
                                  // const history = createHashHistory();
                                  // history.go('/batches/details/1', { forceRefresh: true });
                                  const data1 = this.state.plants2;
                                  console.log('unupdated', data1);
                                  data1[data1.indexOf(oldData)] = newData;
                                  console.log('updated', data1);
                                  this.setState({ plants2: data1 });
                                  this.setState({ state: this.state });
                                } else {
                                  resolve();
                                }
                              }).catch((error1) => {
                                this.setState({
                                  error: true,
                                  msg: error1.message,
                                });
                                resolve();
                              });
                            }),
                        }}
                        // onRowClick={((evt, selectedRow) =>  this.setState({ selectedRow }))}
                        options={{
                          actionsColumnIndex: -1,
                        }}
                      />
                    </Col>
                  </TabContent>
                  <TabContent for="tab3">
                    <Col md={12} lg={12}>
                      <form className="form form form--horizontal" onSubmit={this.handleStageSubmit}>
                        {/* <Col md={6} lg={6}> */}
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
                        <div className="form__form-group form__form-group-id">
                      <span className="form__form-group-label">Excluded Serial Numbers</span>
                      <Tooltip disableFocusListener title="Please type serial Numbers to be Excluded in comma separated format, i.e SN44545464,SN35454,TR653636636.">
                        <IconButton aria-label="help">
                          <HelpIcon />
                        </IconButton>
                      </Tooltip>
                      <div className="form__form-group-field">
                        <Field
                          name="serial"
                          type="text"
                          component="input"
                          placeholder="e.g SN2345,SN344657,S446464"
                          ref={node => (this.inputSerials = node)}
                        />
                      </div>
                    </div>
                        {/* </Col>
                      <Col md={6} lg={6}> */}


                        <div className="form_form-group">
                          <ButtonToolbar className="form__button-toolbar">
                            <Button color="primary" className="btn-block" type="submit">UPDATE PLANTS STAGE</Button>
                          </ButtonToolbar>
                        </div>
                        {/* </Col> */}

                      </form>
                    </Col>
                  </TabContent>
                  <Col md={12} lg={12}>
                    <TabContent for="tab4">

                      <form className="form form form--horizontal" onSubmit={this.handleLabelSubmit}>
                        {/* <Col md={6} lg={6}> */}
                        <div className="form__form-group">
                          <span className="form__form-group-label">Date</span>
                          <div className="form__form-group-field">
                            <Field
                              name="name"
                              type="date"
                              required
                              component="input"
                              ref={node => (this.inputDate = node)}
                            />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Printer Type</span>
                          <div className="form__form-group-field">
                            <Field
                              name="printerType"
                              component={renderSelectField}
                              type="text"
                              required
                              ref={node => (this.inputPrinterType = node)}
                              options={[
                                { value: 'nonThermal', label: 'Non Thermal Printer' },
                                { value: 'thermal', label: 'Thermal Printer' }
                              ]}
                            />
                          </div>
                        </div>
                        {/* </Col>
                      <Col md={6} lg={6}> */}
                        <div className="form__form-group">
                          <span className="form__form-group-label">Select Label Size</span>
                          <div className="form__form-group-field">
                            <Field
                              name="size_type"
                              component={renderSelectField}
                              type="text"
                              required
                              ref={node => (this.inputSizeType = node)}
                              options={[
                                // { value: '4', label: '4*5 inch/Label (4 labels)' },
                                // { value: '10', label: '2*4 inch/Label (10 labels)' },
                                { value: '16', label: '1*4 inch/Label (16 labels)' },
                              ]}
                            />
                          </div>
                        </div>
                        {/* <div className="form__form-group">
                          <span className="form__form-group-label">Paper Size</span>
                          <div className="form__form-group-field">
                            <Field
                              name="size_type"
                              component={renderSelectField}
                              type="text"
                              required
                              ref={node => (this.inputSizeType = node)}
                              options={[
                                { value: 'a4', label: 'A4 Paper size' },
                              ]}
                            />
                          </div>
                        </div> */}

                        <div className="form_form-group">
                          <ButtonToolbar className="form__button-toolbar">
                            <Button color="primary" className="btn-block" type="submit">GENERATE LABELS</Button>
                          </ButtonToolbar>
                        </div>
                        {/* </Col> */}

                      </form>

                    </TabContent>
                  </Col>
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
  form: 'product_add_form', // a unique identifier for this form
  enableReinitialize: true,
})(BatchDetailListTable);
