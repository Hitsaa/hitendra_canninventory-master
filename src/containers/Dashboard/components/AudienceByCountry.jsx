import React, { useState, useEffect } from 'react';
// import { Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { withTranslation } from 'react-i18next';
import axios from 'axios';
import PropTypes from 'prop-types';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import Panel from '../../../shared/components/Panel';

const AudienceByCountry = ({ t }) => {
  const options = {
    // pageStartIndex: 0,
    sizePerPage: 10,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };
  const [data, setData] = useState({ hits: [] });
  useEffect(() => {
    const fetchData = async () => {
      const tokenStr = localStorage.getItem('cannave_token');
      const token = JSON.parse(tokenStr);
      const url = `${process.env.API_ENDPOINT_LOC}/sales-by-city`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // const result = await axios.get(
      //   'http://cannlaravel.leagueofclicks.com/api/sales-by-city',
      // );
      const dataArray = [];
      result.data.forEach((element) => {
        const datas = {};
        datas.city = element.city;
        datas.sales = `$${(element.sales.toFixed(2)).toString()}`;
        dataArray.push(datas);
      });
      setData({ hits: dataArray });
    };
    fetchData();
  }, []);

  const columns = [{
    dataField: 'city',
    text: 'City',
  }, {
    dataField: 'sales',
    text: 'Sales',
  }];
  return (
    <>
      <Panel lg={12} xl={7} md={12} title={t('Sales By City')}>
        <BootstrapTable
          keyField="id"
          data={data.hits}
          classes="table--bordered table table-setting"
          filterPosition="top"
          columns={columns}
          pagination={paginationFactory(options)}
        />
      </Panel>
      {/* <Button onClick={salesReport}>Sales</Button>
      <Button onClick={purchaseReport}>Purchase</Button> */}

    </>
  );
};

AudienceByCountry.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(AudienceByCountry);
