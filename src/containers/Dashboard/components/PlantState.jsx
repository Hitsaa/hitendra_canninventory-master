import React from 'react';
import { withTranslation } from 'react-i18next';
import axios from 'axios';
import RandomAnimatedBars from '../../Charts/ChartJs/components/RandomAnimatedBars';


class PlantState extends React.Component {
  constructor() {
    super();
    this.state = {
      productData: {},
    };
  }

  componentDidMount() {
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const urls = `${process.env.API_ENDPOINT_LOC}/plants-by-current-state`;
    axios({
      method: 'get',
      url: urls,
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
      && <RandomAnimatedBars title="Plant by Current State" productData={productData} label="Plants" />
    );
  }
}
export default withTranslation('common')(PlantState);
