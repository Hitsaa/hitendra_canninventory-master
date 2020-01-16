/* eslint-disable react/no-unused-state */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
import React, { PureComponent } from 'react';
import {
  Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import ViewIcon from '@material-ui/icons/Visibility';
// import UploadIcon from '@material-ui/icons/CloudUpload';
import DataPaginationTable2 from '../../../../shared/components/table/DataPaginationTable2';

const columns = ['Id', 'First Name', 'Last Name', 'License Number', 'Email Address', 'Monthly Limit', 'Phone No.', 'DOB', 'Edit'];

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
        <Tooltip title="Add">
          <IconButton component={Link} to="/customers/add">
            <AddIcon />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title="Upload">
          <IconButton component={Link} to="/customers/upload">
            <UploadIcon />
          </IconButton>
        </Tooltip> */}
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

export default class CustomersListTable extends PureComponent {
  abortController = new AbortController();

  constructor() {
    super();

    this.state = {
      rows: [],
      pageOfItems: [],
      loaded: 'NOT_LOADED',
      authenticated: false,
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
    const url = `${process.env.API_ENDPOINT}/customers`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      if (!response.data.error) {
        if (response.data.clients.length > 0) {
          options.download = true;
        }
        for (let i = 0; i < response.data.clients.length; i += 1) {
          const durl = `/customers/details/${response.data.clients[i].client.id}`;
          rows.push({
            patient_id: response.data.clients[i].client.id,
            first_name: response.data.clients[i].client.firstName,
            last_name: response.data.clients[i].client.lastName,
            license: response.data.clients[i].client.patientLicense,
            email: response.data.clients[i].client.email,
            monthly_limit: response.data.clients[i].client.gramsMonthlyLimit,
            phone: response.data.clients[i].client.phoneNumber,
            dob: response.data.clients[i].client.dob,
            edit: <div><Tooltip title="Edit"><IconButton component={Link} to={durl}><ViewIcon /></IconButton></Tooltip></div>,
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
    const { authenticated } = this.state;
    if (authenticated) {
      return '<Redirect to="/login" />';
    }
    let type = null;
    if (loader === 'LOADING') {
      type = <div className="load__icon-wrap"><svg className="load__icon"><path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg> </div>;
    }
    if (loader === 'LOADED') {
      type = (
        <Col md={12} lg={12}>
          <DataPaginationTable2
            title={error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : 'Customers List'}
            data={rows.map((item) => { return [item.patient_id, item.first_name, item.last_name, item.license, item.email, item.monthly_limit, item.phone, item.dob, item.edit]; })}
            columns={columns}
            options={options}
          />
        </Col>
      );
    }
    return type;
  }
}
