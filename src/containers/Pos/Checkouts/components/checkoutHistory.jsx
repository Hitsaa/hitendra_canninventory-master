/* eslint-disable arrow-body-style */
/* eslint-disable react/no-unused-state */
/* eslint-disable max-len */
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
// import AddIcon from '@material-ui/icons/Add';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import DataPaginationTable2 from '../../../../shared/components/table/DataPaginationTable2';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
import createHashHistory from 'history/createHashHistory';
// const columns = ['Id', 'Business Name', 'Email Address', 'Address', 'Phone', 'Zip Code', 'City', 'State', 'POS'];
const columns = ['Cancel Checkout', 'Name', 'Payment Method', 'Total Amount', 'Discount', 'Date', 'Invoice'];


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
        {/* <Tooltip title="Add">
          <IconButton component={Link} to="/clients/add">
            <AddIcon />
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

export default class checkoutHistory extends PureComponent {
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

    this.handleClick = this.handleClick.bind(this);
  }


  async componentDidMount() {
    this.setState({ loader: 'LOADING' });
    const rows = await this.createRows();
    this.setState({ rows });
    this.setState({ loader: 'LOADED' });
  }

  async handleClick(id) {
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const urls = `${process.env.API_ENDPOINT}/pos/checkout/delete/${id}`;
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
        history.go('/pos/checkoutHistory', { forceRefresh: true });
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
    const url = `${process.env.API_ENDPOINT}/pos/checkouts`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response);
      if (!response.data.error) {
        if (response.data.checkouts.length > 0) {
          options.download = true;
        }
        for (let i = 0; i < response.data.checkouts.length; i += 1) {
          const iurl = `/pos/invoice/${response.data.checkouts[i].id}`;
          rows.push({
            id: response.data.checkouts[i].id,
            business_name: response.data.checkouts[i].firstName + " " + response.data.checkouts[i].lastName,
            sub_total: response.data.checkouts[i].sub_total,
            discount: response.data.checkouts[i].discount,
            total: response.data.checkouts[i].total,
            created_at: response.data.checkouts[i].created_at,
            payment_method: response.data.checkouts[i].payment_method,
            invoice: <div><Tooltip title="View Invoice"><IconButton component={Link} to={iurl}><DescriptionIcon /></IconButton></Tooltip></div>,
            pos: <Tooltip title="Cancel"><IconButton onClick={() => this.handleClick(response.data.checkouts[i].id)}><DeleteIcon /></IconButton></Tooltip>,
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
            title={error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : 'Checkout List'}
            // data={rows.map((item) => { return [item.id, item.business_name, item.email, item.address, item.phone, item.zip, item.city, item.state, item.pos]; })}
            data={rows.map((item) => { return [item.pos, item.business_name, item.payment_method, item.total, item.discount, item.created_at, item.invoice]; })}
            columns={columns}
            options={options}
          />
        </Col>
      );
    }
    return type;
  }
}
