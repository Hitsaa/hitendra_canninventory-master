/* eslint-disable react/no-unused-state */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import {
  ButtonToolbar, Card, CardBody, Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
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

export default class UsersListTable extends PureComponent {
  abortController = new AbortController();

  constructor() {
    super();
    this.heads = [
      {
        key: 'id',
        name: 'ID',
        width: 80,
        sortable: true,
      },
      {
        key: 'first_name',
        name: 'First Name',
        sortable: true,
      },
      {
        key: 'last_name',
        name: 'Last Name',
        sortable: true,
      },
      {
        key: 'email',
        name: 'Email Address',
        sortable: true,
      },
      {
        key: 'phone',
        name: 'Phone',
        sortable: true,
      },
      {
        key: 'zip',
        name: 'Zip Code',
        sortable: true,
      },
      {
        key: 'city',
        name: 'SKU',
        sortable: true,
      },
      {
        key: 'state',
        name: 'State',
        sortable: true,
      },
      {
        key: 'business_name',
        name: 'Business Name',
        sortable: true,
        width: 110,
      },
    ];

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
    const token = localStorage.getItem('cannave_token');
    const url = `${process.env.API_ENDPOINT}/users`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      if (!response.data.error) {
        for (let i = 0; i < response.data.users.length; i += 1) {
          rows.push({
            id: response.data.users[i].id,
            first_name: response.data.users[i].firstName,
            last_name: response.data.users[i].lastName,
            email: response.data.users[i].email,
            phone: response.data.users[i].phoneNumber,
            zip: response.data.users[i].zipCode,
            city: response.data.users[i].city,
            state: response.data.users[i].state,
            business_name: response.data.users[i].businessName,
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
          <Card>
            <CardBody className="products-list">
              <div className="card__title">
                <h5 className="bold-text">Users List</h5>
                {error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : null}
                <ButtonToolbar className="products-list__btn-toolbar-top">
                  <form className="form">
                    <div className="form__form-group products-list__search">
                      <input placeholder="Search..." name="search" />
                      <MagnifyIcon />
                    </div>
                  </form>
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
