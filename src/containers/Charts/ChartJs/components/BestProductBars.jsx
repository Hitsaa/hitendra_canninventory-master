/* eslint-disable no-underscore-dangle,react/no-did-mount-set-state */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const initialState = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: '#FF6384',
      borderColor: '#FF6384',
      borderWidth: 1,
      hoverBackgroundColor: '#FF6384',
      hoverBorderColor: '#FF6384',
      data: [65, 59, 80, 81, 56, 55, 45],
    },
  ],
};

const options = {
  legend: {
    position: 'bottom',
  },
  scales: {
    xAxes: [
      {
        stacked: false,
        gridLines: {
          color: 'rgb(204, 204, 204)',
          borderDash: [3, 3],
        },
        ticks: {
          fontColor: 'rgb(204, 204, 204)',
        },
      },
    ],
    yAxes: [
      {
        stacked: false,
        gridLines: {
          color: 'rgb(204, 204, 204)',
          borderDash: [3, 3],
        },
        ticks: {
          fontColor: 'rgb(204, 204, 204)',
        },
      },
    ],
  },
};

class BestProductBars extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    productData: PropTypes.shape({
      lables: PropTypes.arrayOf(PropTypes.string).isRequired,
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      data: initialState,
      // intervalId: null,
    };
  }

  componentDidMount() {
    const _this = this;

    const { productData } = this.props;

    // const intervalId = setInterval(() => {
    const oldDataSet = _this.state.data.datasets[0];
    // const newData = [];

    //   for (let x = 0; x < _this.state.data.labels.length; x += 1) {
    //     newData.push(Math.floor(Math.random() * 100));
    //   }

    const newDataSet = {
      ...oldDataSet,
    };

    newDataSet.data = productData.data;

    const newState = {
      ...initialState,
      data: {
        datasets: [newDataSet],
        labels: productData.lables ? productData.lables : productData.labels,
      },
    };

    _this.setState(newState);
    // }, 4000);

    // this.setState({ intervalId });
  }

  // componentWillUnmount() {
  //   const { intervalId } = this.state;
  //   clearInterval(intervalId);
  // }

  render() {
    const { t, title } = this.props;
    const { data } = this.state;

    return (
      <Col md={12} lg={12} xl={6}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">{t(title)}</h5>
            </div>
            <Bar data={data} options={options} />
          </CardBody>
        </Card>
      </Col>
    );
  }
}


export default withTranslation('common')(BestProductBars);
