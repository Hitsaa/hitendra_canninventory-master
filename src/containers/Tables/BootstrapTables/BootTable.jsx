import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import filterFactory, { textFilter, selectFilter, dateFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import './BootTable.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import Panel from '../../../shared/components/Panel';

const BootTable = ({ productsData, dropdownData }) => {
  const selectCategoryOptions = [];
  const selectOptions = [
    { value: 'RETAILER', label: 'RETAILER' },
    { value: 'PROCESSOR', label: 'PROCESSOR' },
    { value: 'CUSTOMER', label: 'CUSTOMER' },
  ];
  const options = {
    // pageStartIndex: 0,
    sizePerPage: 10,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };
  dropdownData.map((element) => {
    let ele = '';
    let str = '';
    const categoryOptions = {};
    categoryOptions.label = element.category_code;
    ele = element.category_code.toLowerCase();
    str = ele.slice(0, 1).toUpperCase() + ele.slice(1, ele.length);
    categoryOptions.value = str;
    selectCategoryOptions.push(categoryOptions);
    return categoryOptions;
  });
  // const selectCategoryOptions = [
  //   { value: 'Flower', label: 'Flower' },
  //   { value: 'Trim', label: 'Trim' },
  //   { value: 'Shake', label: 'Shake' },
  //   { value: 'Ancillary', label: 'Ancillary' },
  //   { value: 'Oils', label: 'Oils' },
  //   { value: 'Concentrates', label: 'Concentrates' },
  //   { value: 'Pre-rolls', label: 'Pre-rolls' },
  //   { value: 'Waste', label: 'Waste' },
  //   { value: 'Edibles', label: 'Edibles' },
  //   { value: 'Other', label: 'Other' },
  //   { value: 'Plant', label: 'Plant' },
  // ];
  const columns = [{
    dataField: 'id',
    text: 'SR #',
  }, {
    dataField: 'name',
    text: 'Product Name',
    filter: textFilter(),
  }, {
    dataField: 'category.name',
    text: 'Category',
    filter: selectFilter({
      options: selectCategoryOptions,
    }),
    // formatter: cells => selectCategoryOptions.find(opt => opt.value === cells).label,
  }, {
    dataField: 'user.role',
    text: 'Role',
    filter: selectFilter({
      options: selectOptions,
    }),
    // formatter: cell => selectOptions.find(opt => opt.value === cell).label,
  }, {
    dataField: 'label.strainName',
    text: 'Strain',
    filter: textFilter(),
  }, {
    dataField: 'weight_type',
    text: 'Weight Type',
    filter: textFilter(),
  }, {
    dataField: 'weight',
    text: 'Weight',
    filter: textFilter(),
  }, {
    dataField: 'user.city',
    text: 'City',
    filter: textFilter(),
  }, {
    dataField: 'price',
    text: 'Price',
    filter: textFilter(),
  }, {
    dataField: 'quantity',
    text: 'Quantity',
    filter: textFilter(),
  }, {
    dataField: 'created_at',
    text: 'Date Range',
    filter: dateFilter(),
    formatter: (cell) => {
      let dateObj = cell;
      if (typeof cell !== 'object') {
        dateObj = new Date(cell);
        return dateObj.toLocaleDateString();
      }
      return dateObj;
    },
  },
  ];

  return (
    <Panel lg={12} xl={12} md={12} title="All Products">
      <BootstrapTable
        keyField="id"
        data={productsData}
        filterPosition="top"
        classes="table--bordered table table-setting"
        columns={columns}
        filter={filterFactory()}
        pagination={paginationFactory(options)}
      />
    </Panel>
  );
};
BootTable.propTypes = {
  productsData: PropTypes.arrayOf.isRequired,
  dropdownData: PropTypes.arrayOf.isRequired,
};
export default withTranslation('common')(BootTable);
