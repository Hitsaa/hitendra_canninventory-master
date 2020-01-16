/* eslint-disable react/no-unused-state */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import {
  ButtonToolbar, Card, CardBody, Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import DataPaginationTable from '../../../../shared/components/table/DataPaginationTable';


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
    this.heads = [
      {
        key: 'patient_id',
        name: 'Patient ID',
        width: 80,
        sortable: true,
      },
      {
        key: 'first_name',
        name: 'First Name',
        width: 80,
        sortable: true,
      },
      {
        key: 'last_name',
        name: 'Last Name',
        width: 80,
        sortable: true,
      },
      {
        key: 'license',
        name: 'License Number',
        sortable: true,
      },
      {
        key: 'email',
        name: 'Email Address',
        sortable: true,
      },
      {
        key: 'monthly_limit',
        name: 'MonthLy Limit(g)',
        sortable: true,
      },
      {
        key: 'phone',
        name: 'Phone Number',
        sortable: true,
      },
      {
        key: 'dob',
        name: 'Date of Birth',
        sortable: true,
      },
    ];

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
        for (let i = 0; i < response.data.clients.length; i += 1) {
          rows.push({
            patient_id: response.data.clients[i].id,
            first_name: response.data.clients[i].firstName,
            last_name: response.data.clients[i].lastName,
            license: response.data.clients[i].patientLicense,
            email: response.data.clients[i].email,
            monthly_limit: response.data.clients[i].gramsMonthlyLimit,
            phone: response.data.clients[i].phoneNumber,
            dob: response.data.clients[i].dob,
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
          <Card>
            <CardBody className="products-list">
              <div className="card__title">
                <h5 className="bold-text">Patients List</h5>
                {error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : null}
                <ButtonToolbar className="products-list__btn-toolbar-top">
                  <form className="form">
                    <div className="form__form-group products-list__search">
                      <input placeholder="Search..." name="search" />
                      <MagnifyIcon />
                    </div>
                  </form>
                  <Link className="btn btn-primary products-list__btn-add" to="/customers/add">Add new
                      Patient
                  </Link>
                </ButtonToolbar>
              </div>
              <p>Show
                <select className="select-options">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
                entries
              </p>
              <DataPaginationTable heads={this.heads} rows={rows} enableRowSelect />
            </CardBody>
          </Card>
        </Col>
      );
    }
    return type;
  }
}
