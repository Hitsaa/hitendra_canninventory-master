/* eslint-disable */
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
// import Check from '@material-ui/icons/Check';
import DataPaginationTable2 from '../../../../shared/components/table/DataPaginationTable2';

const columns = ['Id', 'Strain Name', 'Weight Type', 'Quantity', 'Category', 'Batch Serial NO#', 'Edit', 'Delete'];

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
          <IconButton component={Link} to="/productsprocessor/add">
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
      categories: [],
      weightTypes: [],
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
    const url = `${process.env.API_ENDPOINT_LOC}/processor-product`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.data.error) {
        this.setState({ product: response.data[0], categories: response.data[1], weightTypes: response.data[2] });
        const productListResponse = response.data[0];
        const categories = response.data[1];
        const weightTypes = response.data[2];
        console.log(productListResponse);
        if (productListResponse.length > 0) {
          options.download = true;
        }
        for (let i = 0; i < productListResponse.length; i += 1) {
          const eUrl = `/productsprocessor/details/${productListResponse[i].id}`;
          const weightType = productListResponse[i].weight_type;
          const category = productListResponse[i].category_id;
          // console.log(weightTypes[weightType], categories[category]);
          // const lurl = `/productsprocessor/labels/${response.data.products[i].id}`;
          rows.push({
            id: productListResponse[i].id,
            strain_name: (productListResponse[i].product_name) ? productListResponse[i].product_name : productListResponse[i].name,
            weight_type: (weightType) ? weightTypes[weightType] : 'N/A',
            // weight_type: productListResponse[i].weight_type,
            weight: productListResponse[i].quantity,
            // price: productListResponse[i].price,
            category: (category != null) ? categories[category] : 'N/A',
            // category: productListResponse[i].category_code,
            batch_no: (productListResponse[i].batch_no) ? productListResponse[i].batch_no : 'N/A',
            edit: <div><Tooltip title="Edit"><IconButton component={Link} to={eUrl}><ViewIcon /></IconButton></Tooltip></div>,
            // label: <div><Tooltip title="Label"><IconButton component={Link} to={lurl}><Check /></IconButton></Tooltip></div>,
            delete: <div><Tooltip title="Delete"><IconButton onClick={() => this.handleClick(productListResponse[i].id)}> <DeleteIcon /> </IconButton></Tooltip></div>,
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
    const urls = `${process.env.API_ENDPOINT_LOC}/processor-product-delete/${id}`;
    await axios({
      method: 'get',
      url: urls,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      if (!response.data.error) {
        const history = createHashHistory();
        history.go('/productsprocessor/list', { forceRefresh: true });
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
            title={error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : 'Processor Products List'}
            data={rows.map((item) => { return [item.id, item.strain_name, item.weight_type, item.weight, item.category, item.batch_no, item.edit, item.delete]; })}
            columns={columns}
            options={options}
          />
        </Col>
      );
    }
    return type;
  }
}
