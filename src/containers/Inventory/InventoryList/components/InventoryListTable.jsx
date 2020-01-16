/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */

import React, { PureComponent } from 'react';
import {
  Col,
} from 'reactstrap';
import createHashHistory from 'history/createHashHistory';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ViewIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import DataPaginationTable2 from '../../../../shared/components/table/DataPaginationTable2';
// import Check from '@material-ui/icons/Check';

const columns = ['Id', 'Product Name', 'Quantity', 'Weight Type', 'Category', 'Seller License #', 'Batch #', 'Serial #', 'Lot #', 'Edit', 'Delete'];

const options = {
  // filter: false,
  // sort: false,
  // responsive: 'scroll',
  print: false,
  selectableRows: false,
  download: false,
  customToolbar: () => {
    return (
      <span>
        <Tooltip title="Add">
          <IconButton component={Link} to="/inventory/add">
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

class InventoryListTable extends PureComponent {
  constructor() {
    super();
    this.state = {
      inventoryList: [],
      pageOfItems: [],
      loaded: 'NOT_LOADED',
      error: false,
      msg: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    this.setState({ loader: 'LOADING' });
    const inventoryList = await this.getInventory();
    this.setState({ inventoryList });
    this.setState({ loader: 'LOADED' });
  }

  onChangePage = (pageOfItems) => {
    // update state with new page of items
    this.setState({ pageOfItems });
  };

  getInventory = async () => {
    const inventoryList = [];
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT_LOC}/inventory`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      // console.log(response.data[0]);
      if (!response.data.error) {
        const inventoryListResponse = response.data[0];
        const categories = response.data[1];
        const weightTypes = response.data[2];
        // console.log(categories, weightTypes);
        // this.setState({ product: response.data.products });
        if (inventoryListResponse.length > 0) {
          options.download = true;
        }
        for (let i = 0; i < inventoryListResponse.length; i += 1) {
          const eUrl = `/inventory/details/${inventoryListResponse[i].id}`;
          const weightType = inventoryListResponse[i].weight_type;
          const category = inventoryListResponse[i].category_id;
          // const lurl = `/products/labels/${inventoryListResponse[i].id}`;
          /* eslint-disable space-infix-ops */
          inventoryList.push({
            id: inventoryListResponse[i].id,
            product_name: inventoryListResponse[i].product_name,
            quantity: inventoryListResponse[i].quantity,
            weight_type: (weightType!=null) ? weightTypes[weightType] : 'N/A',
            category: (category != null) ? categories[category] : 'N/A',
            seller_license: inventoryListResponse[i].seller_license,
            batch: (inventoryListResponse[i].batch) ? inventoryListResponse[i].batch : 'N/A',
            serial: (inventoryListResponse[i].serial) ? inventoryListResponse[i].serial : 'N/A',
            lot: (inventoryListResponse[i].lot) ? inventoryListResponse[i].lot : 'N/A',
            edit: <div><Tooltip title="Edit"><IconButton component={Link} to={eUrl}><ViewIcon /></IconButton></Tooltip></div>,
            // label: <div><Tooltip title="Label"><IconButton component={Link} to={lurl}><Check /></IconButton></Tooltip></div>,
            delete: <div><Tooltip title="Delete"><IconButton onClick={() => this.handleClick(inventoryListResponse[i].id)}> <DeleteIcon /> </IconButton></Tooltip></div>,
            // details: <Button onClick={() => this.handleClick(inventoryListResponse[i].id)} className="btn btn-primary products-list__btn-add">kyu</Button>,
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
    return inventoryList;
  }

  async handleClick(id) {
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const urls = `${process.env.API_ENDPOINT_LOC}/inventory-delete/${id}`;
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
        history.go('/inventory/list', { forceRefresh: true });
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
    const { inventoryList, error, msg } = this.state;
    // console.log(inventoryList);
    const { loader } = this.state;
    let type = null;
    if (loader === 'LOADING') {
      type = <div className="load__icon-wrap"><svg className="load__icon"><path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg> </div>;
    }
    if (loader === 'LOADED') {
      type = (
        <Col md={12} lg={12} xl={12}>
          <DataPaginationTable2
            title={error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : 'Inventory List'}
            data={inventoryList.map((item) => { return [item.id, item.product_name, item.quantity, item.weight_type, item.category, item.seller_license, item.batch, item.serial, item.lot, item.edit, item.delete]; })}
            columns={columns}
            options={options}
          />
        </Col>
      );
    }
    return type;
  }
}

export default withTranslation('common')(InventoryListTable);
