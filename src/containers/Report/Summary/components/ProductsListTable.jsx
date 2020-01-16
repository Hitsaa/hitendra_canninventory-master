/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import {
  ButtonToolbar, Card, CardBody, Col, Button,
} from 'reactstrap';
import PropTypes from 'prop-types';
import createHashHistory from 'history/createHashHistory';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import DataPaginationTable from '../../../../shared/components/table/DataPaginationTable';
import fire from '../../../../fire';


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

export default class ProductsListTable extends PureComponent {
  // abortController = new AbortController();

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
        key: 'strain_name',
        name: 'Strain Name',
        sortable: true,
      },
      {
        key: 'user_name',
        name: 'Merchant Name',
        sortable: true,
      },
      {
        key: 'weight_type',
        name: 'Weight IN',
        sortable: true,
      },
      {
        key: 'weight',
        name: 'Weight',
        sortable: true,
      },
      {
        key: 'price',
        name: 'Price By Weight',
        sortable: true,
        formatter: MoneyFormatter,
      },
      {
        key: 'category',
        name: 'Category',
        sortable: true,
      },
      {
        key: 'sku',
        name: 'SKU',
        sortable: true,
      },
      {
        key: 'serial',
        name: 'Serial NO#',
        sortable: true,
      },
      {
        key: 'details',
        name: 'Details',
        width: 110,
      },
    ];

    this.state = {
      rows: [],
      pageOfItems: [],
      loaded: 'NOT_LOADED',
      error: false,
      msg: '',
      firedata: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }


  async componentDidMount() {
    this.setState({ loader: 'LOADING' });
    const rows = await this.createRows();
    this.setState({ rows });
    this.setState({ loader: 'LOADED' });

    const messagesRef = fire.database().ref().child('messages');
    console.log('opt', messagesRef);
    messagesRef.on('value', (snapshot) => {
      console.log('value', snapshot.value);
      this.setState({ firedata: snapshot.name });
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
    const url = `${process.env.API_ENDPOINT}/products`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.data.error) {
        for (let i = 0; i < response.data.products.length; i += 1) {
          rows.push({
            id: response.data.products[i].id,
            strain_name: response.data.products[i].plant.name,
            user_name: `${response.data.products[i].user.firstName} ${response.data.products[i].user.lastName}`,
            weight_type: response.data.products[i].weight_type,
            weight: response.data.products[i].weight,
            price: response.data.products[i].price,
            category: response.data.products[i].category.name,
            sku: response.data.products[i].sku,
            serial: response.data.products[i].serial,
            details: <Button onClick={() => this.handleClick(response.data.products[i].id)} className="btn btn-primary products-list__btn-add">DELETE</Button>,
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
    const urls = `${process.env.API_ENDPOINT}/products/delete/${id}`;
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
        history.go('/products/list', { forceRefresh: true });
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
    const { loader, firedata } = this.state;
    // console.log('rows1', this.state);
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
                <h5 className="bold-text">Products List</h5>
                <h3>{firedata}</h3>
                {error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : null}
                <ButtonToolbar className="products-list__btn-toolbar-top">
                  <form className="form">
                    <div className="form__form-group products-list__search">
                      <input placeholder="Search..." name="search" />
                      <MagnifyIcon />
                    </div>
                  </form>
                  <Link className="btn btn-primary products-list__btn-add" to="/products/add">Add new
                      product
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
