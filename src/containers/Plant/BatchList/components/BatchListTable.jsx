/* eslint-disable react/no-unused-state */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-template */
import React, { PureComponent } from 'react';
import {
  Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import ViewIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import createHashHistory from 'history/createHashHistory';

import DataPaginationTable2 from '../../../../shared/components/table/DataPaginationTable2';

const columns = ['ID', 'Batch Name', 'Batch Serial No.', 'Created By', 'Date Created', 'View Plants', 'Edit', 'Delete'];

const options = {
  filter: false,
  sort: false,
  responsive: 'scroll',
  print: false,
  selectableRows: false,
  download: false,
  customToolbar: () => {
    return (
      <span>
        <Tooltip title="Add Batch">
          <IconButton component={Link} to="/batches/add">
            <AddIcon />
          </IconButton>
        </Tooltip>
      </span>
    );
  },
};


const PhotoFormatter = ({ value }) => (
  <div className="products-list__img-wrap">
    <img src={value} alt="" />
  </div>
);

const MoneyFormatter = ({ value }) => (
  <div>
    ${value}
  </div>
);

MoneyFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

PhotoFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

const StatusFormatter = ({ value }) => (
  value === 'View' ? <span className="badge badge-success">View</span>
    : <span className="badge badge-disabled">Disabled</span>
);

StatusFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

export default class BatchListTable extends PureComponent {
  abortController = new AbortController();

  constructor() {
    super();
    this.state = {
      rows: [],
      pageOfItems: [],
      loaded: 'NOT_LOADED',
      error: false,
      msg: '',
    };
  }


  async componentDidMount() {
    this.setState({ loader: 'LOADING' });
    const rows = await this.createRows();
    this.setState({ rows });
    this.setState({ loader: 'LOADED' });
  }


  onChangePage = (pageOfItems) => {
    // update state with new page of items
    this.setState({ pageOfItems });
  };

  getRandomDate = (start, end) => new Date(start.getTime() + (Math.random() * (end.getTime()
    - start.getTime()))).toLocaleDateString();

  createRows = async () => {
    const rows = [];
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT}/batches`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.data.error) {
        if (response.data.batches.length > 0) {
          options.download = true;
        }
        for (let i = 0; i < response.data.batches.length; i += 1) {
          const durl = `/batches/details/${response.data.batches[i].id}`;
          const eurl = `/batches/edit/${response.data.batches[i].id}`;
          rows.push({
            id: response.data.batches[i].id,
            name: response.data.batches[i].name,
            batch_no: response.data.batches[i].batch_no,
            user: response.data.batches[i].user.firstName + ' ' + response.data.batches[i].user.lastName,
            date_created: response.data.batches[i].created_at,
            details: <div><Tooltip title="Details"><IconButton component={Link} to={durl}><ViewIcon /></IconButton></Tooltip></div>,
            edit: <div><Tooltip title="Edit"><IconButton component={Link} to={eurl}><EditIcon /></IconButton></Tooltip></div>,
            delete: <div><Tooltip title="Delete"><IconButton onClick={() => this.handleClick(response.data.batches[i].id)}> <DeleteIcon /> </IconButton></Tooltip></div>,
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

  async handleClick(id) {
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const urls = `${process.env.API_ENDPOINT}/batches/delete/${id}`;
    await axios({
      method: 'post',
      url: urls,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      if (!response.data.error) {
        const history = createHashHistory();
        history.go('/batches/list', { forceRefresh: true });
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
    const { rows, error, msg } = this.state;
    const { loader } = this.state;
    // console.log('rows1', this.state);
    let type = null;
    if (loader === 'LOADING') {
      type = <div className="load__icon-wrap"><svg className="load__icon"><path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg> </div>;
    }
    if (loader === 'LOADED') {
      type = (
        <Col md={12} lg={12}>
          <DataPaginationTable2
            title={error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : 'Batch List'}
            data={rows.map((item) => { return [item.id, item.name, item.batch_no, item.user, item.date_created, item.details, item.edit, item.delete]; })}
            columns={columns}
            options={options}
          />
        </Col>
      );
    }
    return type;
  }
}
