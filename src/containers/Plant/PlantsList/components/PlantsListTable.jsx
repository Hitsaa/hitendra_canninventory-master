/* eslint-disable react/no-unused-state */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable  no-unused-vars */
import React, { PureComponent } from 'react';
import { Col } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UploadIcon from '@material-ui/icons/CloudUpload';
import DataPaginationTable2 from '../../../../shared/components/table/DataPaginationTable2';

const columns = ['Id', 'Strain Name', 'Serial', 'Stage', 'Room Type', 'Grow Method', 'Action'];

const options = {
  filter: false,
  sort: false,
  responsive: 'scroll',
  print: false,
  selectableRows: false,
  download: false,
};

export default class PlantsListTable extends PureComponent {
  abortController = new AbortController();

  constructor() {
    super();
    this.state = {
      rows: [],
      pageOfItems: [],
      loaded: 'NOT_LOADED',
      error: false,
      msg: '',
      Number_of_Rows: 10,
      plants: null,
    };
  }

  async componentDidMount() {
    this.setState({ loader: 'LOADING' });
    const rows = await this.createRows();
    this.setState({ rows });
    this.setState({ loader: 'LOADED' });
  }

  createRows = async () => {
    const rows = [];
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT}/plants`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.data.error) {
        this.setState({ plants: response.data.plants });
        if (response.data.plants.length > 0) {
          options.download = false;
        }
        for (let i = 0; i < response.data.plants.length; i += 1) {
          const durl = `/plants/details/${response.data.plants[i].id}`;
          rows.push({
            id: response.data.plants[i].id,
            name: response.data.plants[i].name,
            serial: response.data.plants[i].serial,
            stage: response.data.plants[i].plant_stage,
            room_type: response.data.plants[i].component_tracking,
            grow_method: response.data.plants[i].grow_method,
            edit: <div><Tooltip title="Edit"><IconButton component={Link} to={durl}><EditIcon /></IconButton></Tooltip></div>,
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
    return rows;
  }

  render() {
    const { rows, error, msg } = this.state;
    const { loader } = this.state;
    console.log('rows', JSON.stringify(rows));
    let type = null;
    if (loader === 'LOADING') {
      type = <div className="load__icon-wrap"><svg className="load__icon"><path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg> </div>;
    }
    if (loader === 'LOADED') {
      type = (
        <Col md={12} lg={12}>
          <DataPaginationTable2
            title={error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : 'PLANTS LIST'}
            data={rows.map((item) => { return [item.id, item.name, item.serial, item.stage, item.room_type, item.grow_method, item.edit]; })}
            columns={columns}
            options={options}
          />
        </Col>
      );
    }
    return type;
  }
}
