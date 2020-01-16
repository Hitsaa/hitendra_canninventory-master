/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
import React, { PureComponent } from 'react';
import {
  Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import createHashHistory from 'history/createHashHistory';
import axios from 'axios';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import ViewIcon from '@material-ui/icons/Visibility';
// import UploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import DataPaginationTable2 from '../../../../shared/components/table/DataPaginationTable2';

const columns = ['Id', 'Strain Name', 'Weight IN', 'Weight', 'Price By Weight', 'Category', 'Batch Serial NO#', 'Edit', 'Labels', 'Delete'];

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
          <IconButton component={Link} to="/products/add">
            <AddIcon />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title="Upload">
          <IconButton component={Link} to="/products/upload">
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

export default class ProductsListTable extends PureComponent {
  // abortController = new AbortController();

  constructor() {
    super();
    this.state = {
      rows: [],
      pageOfItems: [],
      loaded: 'NOT_LOADED',
      error: false,
      msg: '',
      product: [],
    };
    this.handleClick = this.handleClick.bind(this);
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
    const url = `${process.env.API_ENDPOINT}/products`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.data.error) {
        this.setState({ product: response.data.products });
        if (response.data.products.length > 0) {
          options.download = true;
        }
        for (let i = 0; i < response.data.products.length; i += 1) {
          const durl = `/products/details/${response.data.products[i].id}`;
          const url = `/products/labels/${response.data.products[i].id}`;
          rows.push({
            id: response.data.products[i].id,
            strain_name: response.data.products[i].name,
            weight_type: response.data.products[i].weight_type,
            weight: response.data.products[i].weight,
            price: response.data.products[i].price,
            category: response.data.products[i].category_code,
            batch_no: (response.data.products[i].batch) ? response.data.products[i].batch.batch_no : 'N/A',
            edit: <div><Tooltip title="Edit"><IconButton component={Link} to={durl}><ViewIcon /></IconButton></Tooltip></div>,
            label: <div><Tooltip title="Label"><IconButton component={Link} to={lurl}><ViewIcon /></IconButton></Tooltip></div>,
            delete: <div><Tooltip title="Delete"><IconButton onClick={() => this.handleClick(response.data.products[i].id)}> <DeleteIcon /> </IconButton></Tooltip></div>,
            // details: <Button onClick={() => this.handleClick(response.data.products[i].id)} className="btn btn-primary products-list__btn-add">kyu</Button>,
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
    const { loader } = this.state;
    let type = null;
    if (loader === 'LOADING') {
      type = <div className="load__icon-wrap"><svg className="load__icon"><path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg> </div>;
    }
    if (loader === 'LOADED') {
      type = (
        <Col md={12} lg={12}>
          <DataPaginationTable2
            title={error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : 'Products List'}
            data={rows.map((item) => { return [item.id, item.strain_name, item.weight_type, item.weight, item.price, item.category, item.batch_no, item.edit, item.label, item.delete]; })}
            columns={columns}
            options={options}
          />
        </Col>
      );
    }
    return type;
  }
}
