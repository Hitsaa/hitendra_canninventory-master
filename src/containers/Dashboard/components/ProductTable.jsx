import React from 'react';
import { withTranslation } from 'react-i18next';
import axios from 'axios';
import BootTable from '../../Tables/BootstrapTables/BootTable';

class ProductTable extends React.Component {
  constructor() {
    super();
    this.state = {
      productData: [],
      dropdownData: [],
    };
  }

  componentDidMount() {
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT_LOC}/table-list`;
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    // axios.get('http://cannlaravel.leagueofclicks.com/api/table-list')
      .then((res) => {
        this.setState({
          productData: res.data[0],
          dropdownData: res.data[1],
        });
      });
  }

  render() {
    const { productData, dropdownData } = this.state;
    return (
      productData.length > 0
            && <BootTable productsData={productData} dropdownData={dropdownData} />
    );
  }
}
export default withTranslation('common')(ProductTable);
