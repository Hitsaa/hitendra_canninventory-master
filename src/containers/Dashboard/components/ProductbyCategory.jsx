import React from 'react';
import { withTranslation } from 'react-i18next';
import axios from 'axios';
import RandomAnimatedBars from '../../Charts/ChartJs/components/RandomAnimatedBars';


class ProductbyCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      productData: {},
    };
  }

  componentDidMount() {
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT_LOC}/product-by-category`;
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        this.setState({
          productData: res.data,
        });
      });
  }

  render() {
    const { productData } = this.state;
    return (
      Object.keys(productData).length > 0
      && <RandomAnimatedBars title="Product by Category" productData={productData} label="Category" />
    );
  }
}
export default withTranslation('common')(ProductbyCategory);
