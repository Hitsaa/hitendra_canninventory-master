/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
import React, { PureComponent } from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

export default class DataPaginationTable extends PureComponent {
    static propTypes = {
      title: PropTypes.arrayOf(PropTypes.shape()).isRequired,
      data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
      columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
      options: PropTypes.objectOf(PropTypes.shape()).isRequired,
    };

    getMuiTheme = () => createMuiTheme({
      overrides: {
        MUIDataTableToolbar: {
          icon: {
            '&:hover': {
              color: ' rgb(4, 115, 109)',
            },
            iconActive: {
              color: ' rgb(4, 115, 109)',
            },
          },
        },
      },
    })

    render() {
      const {
        title, data, columns, options,
      } = this.props;
      return (
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title={title}
            data={data}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      );
    }
}
