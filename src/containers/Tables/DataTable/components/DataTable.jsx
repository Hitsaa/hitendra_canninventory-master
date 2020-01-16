/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import DataPaginationTable from '../../../../shared/components/table/DataPaginationTable';
import Pagination from '../../../../shared/components/pagination/Pagination';

export default class DataTable extends PureComponent {
  constructor() {
    super();
    this.heads = [
      {
        key: 'id',
        name: 'No.',
        width: 80,
      },
      {
        key: 'first',
        name: 'Strain',
        sortable: false,
      },
      {
        key: 'last',
        name: 'Location',
        sortable: false,
      },
      {
        key: 'user',
        name: 'Sales',
        sortable: true,
      },
      {
        key: 'age',
        name: 'Avg Age',
        sortable: false,
      },
      {
        key: 'location',
        name: 'Harvest',
        sortable: false,
      },
      {
        key: 'work',
        name: 'Business',
        sortable: false,
      },
    ];

    const initialPageNumber = 1;
    const initialRowsCount = 10;

    const minRows = 20;
    const maxRows = 41;
    const rowsCount = Math.random() * (maxRows - minRows);

    const originalRows = this.createRows(rowsCount + minRows);
    const currentPageRows = this.filterRows(originalRows, initialPageNumber, initialRowsCount);

    this.state = {
      rows: originalRows,
      rowsToShow: currentPageRows,
      pageOfItems: initialPageNumber,
      itemsToShow: initialRowsCount,
    };
  }

  onChangePage = (pageOfItems) => {
    const { rows, itemsToShow } = this.state;
    if (pageOfItems) {
      const rowsToShow = this.filterRows(rows, pageOfItems, itemsToShow);
      this.setState({ rowsToShow, pageOfItems });
    }
  };

  getRandomDate = (start, end) => new Date(start.getTime() + (Math.random() * (end.getTime()
    - start.getTime()))).toLocaleDateString();

  createRows = (numberOfRows) => {
    const rows = [];
    for (let i = 1; i < numberOfRows + 1; i += 1) {
      rows.push({
        id: i,
        first: ['Gorilla', 'Northern', 'Widow'][Math.floor((Math.random() * 3))],
        last: ['Tulsa', 'Norman  ', 'OK City'][Math.floor((Math.random() * 3))],
        user: ['482', '582', '184'][Math.floor((Math.random() * 3))],
        age: Math.min(100, Math.round(Math.random() * 30) + 20),
        location: ['OK City', 'Norman', 'Tulsa', 'Stillwater'][Math.floor((Math.random() * 4))],
        work: ['Green Shop', 'Smokin Aces', 'AspireGrow', 'CountryBoyz', 'StarGro'][Math.floor((Math.random() * 5))],
      });
    }
    return rows;
  };

  filterRows = (originalRows, pageNumber, rowsOnPage) => {
    const rowsFrom = rowsOnPage * (pageNumber - 1);
    const rowsTo = rowsFrom + rowsOnPage;
    return originalRows.slice(rowsFrom, rowsTo);
  };

  render() {
    const {
      rows, itemsToShow, pageOfItems, rowsToShow,
    } = this.state;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">data table</h5>
              <h5 className="subhead">Use table with column's option <span className="red-text">sortable</span></h5>
            </div>
            <DataPaginationTable
              heads={this.heads}
              rows={rowsToShow}
            />
            <Pagination
              itemsCount={rows.length}
              itemsToShow={itemsToShow}
              pageOfItems={pageOfItems}
              onChangePage={this.onChangePage}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}
