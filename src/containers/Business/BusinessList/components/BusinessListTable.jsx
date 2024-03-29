/* eslint-disable */
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

const columns = ['Id', 'Business Name', 'Email Address', 'Address', 'Phone', 'Zip Code', 'city','State', 'Edit'];

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
          <IconButton component={Link} to="/business/add">
            <AddIcon />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title="Upload">
          <IconButton component={Link} to="/business/upload">
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

export default class ClientsListTable extends PureComponent {
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
    const url = `${process.env.API_ENDPOINT}/business`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.data.error) {
        if (response.data.businesses.length > 0) {
          options.download = true;
        }
        for (let i = 0; i < response.data.businesses.length; i += 1) {
          const durl = `/clients/details/${response.data.businesses[i].client.id}`;
          rows.push({
            id: response.data.businesses[i].id,
            business_name: response.data.businesses[i].client.businessName,
            email: response.data.businesses[i].client.email,
            address: response.data.businesses[i].client.address,
            phone: response.data.businesses[i].client.phoneNumber,
            zip: response.data.businesses[i].client.zipCode,
            city: response.data.businesses[i].client.city,
            state: response.data.businesses[i].client.state,
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
    let type = null;
    if (loader === 'LOADING') {
      type = <div className="load__icon-wrap"><svg className="load__icon"><path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg> </div>;
    }
    if (loader === 'LOADED') {
      type = (
        <Col md={12} lg={12}>
          <DataPaginationTable2
            title={error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : 'Businesses List'}
            data={rows.map((item) => { return [item.id, item.business_name, item.email, item.address, item.phone, item.zip, item.city, item.state, item.edit]; })}
            columns={columns}
            options={options}
          />
        </Col>
      );
    }
    return type;
  }
}
