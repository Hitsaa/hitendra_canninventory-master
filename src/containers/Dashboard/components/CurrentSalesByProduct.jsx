import React from 'react';
import { withTranslation } from 'react-i18next';
import axios from 'axios';
import RandomAnimatedBars from '../../Charts/ChartJs/components/RandomAnimatedBars';


class CurrentSalesByProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      productData: {},
    };
  }

  componentDidMount() {
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT_LOC}/sale-by-category-product`;
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res && res.data && res.data[1] !== 'No data') {
          this.setState({
            productData: res.data[1],
          });
        }
      });
  }

  render() {
    const { productData } = this.state;
    return (
      Object.keys(productData).length > 0
      && <RandomAnimatedBars title="Current Sales by Product" productData={productData} label="Product" />
    );
  }
}
export default withTranslation('common')(CurrentSalesByProduct);
