import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import axios from 'axios';
import RandomAnimatedBars from '../../Charts/ChartJs/components/RandomAnimatedBars';

class BestSellingProducts extends PureComponent {
  constructor() {
    super();
    this.state = {
      productData: {},
    };
  }

  componentDidMount() {
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const urls = `${process.env.API_ENDPOINT_LOC}/best-worst-selling-product-plant`;
    axios({
      method: 'post',
      url: urls,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        to: '2019-09-28',
      },
    })
      .then((res) => {
        const data = [];
        const labels = [];
        const proddata = {};
        if (res && res.data && res.data.best && res.data.best.labels && res.data.best.data) {
          labels.push(res.data.best.labels);
          data.push(res.data.best.data);
        }
        if (res && res.data && res.data.worst && res.data.worst.labels && res.data.worst.data) {
          labels.push(res.data.worst.labels);
          data.push(res.data.worst.data);
        }
        proddata.labels = labels;
        proddata.data = data;

        if (proddata) {
          this.setState({
            productData: proddata,
          });
        }
      });
  }

  render() {
    const { productData } = this.state;
    return (
      Object.keys(productData).length > 0
      && <RandomAnimatedBars title="Best and Worst Selling Products" productData={productData} label="Product" />
    );
  }
}
export default withTranslation('common')(BestSellingProducts);
