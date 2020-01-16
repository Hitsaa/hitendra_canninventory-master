/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
/* eslint-disable   react/no-unused-state */
/* eslint-disable object-curly-newline */

import React, { PureComponent } from 'react';
import { reduxForm } from 'redux-form';
// import axios from 'axios';
// import PropTypes from 'prop-types';
import { Button, ButtonToolbar } from 'reactstrap';
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';
import Dropzone from 'react-dropzone';
// import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
// import readXlsxFile from 'read-excel-file';

class PlantAddForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // serial: this.generateSerial(),
      gotFormat: false,
      error: false,
      msg: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    // const serial = await this.generateSerial();
    // this.setState({ serial });
  }

  // generateSerial() {
  //   const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  //   const serialLength = 10;
  //   let randomSerial = 'SN';
  //   let randomNumber = 0;
  //   for (let i = 0; i < serialLength; i += 1) {
  //     randomNumber = Math.floor(Math.random() * chars.length);
  //     randomSerial += chars.substring(randomNumber, randomNumber + 1);
  //   }
  //   console.log('serial', randomSerial);
  //   return randomSerial;
  // }

  onDrop = (acceptedFiles) => {
    console.log(acceptedFiles[0]);
    if (acceptedFiles) {
      // eslint-disable-next-line no-console
      const bodyFormData = new FormData();
      bodyFormData.append('name', 'products');
      bodyFormData.append('file', acceptedFiles[0]);

      const tokenStr = localStorage.getItem('cannave_token');
      const token = JSON.parse(tokenStr);
      const urls = `${process.env.API_ENDPOINT}/products/batches/import`;
      axios({
        method: 'post',
        url: urls,
        data: bodyFormData,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((response) => {
        if (!response.data.error) {
          const history = createHashHistory();
          history.push('/products/list', { forceRefresh: true });
        } else {
          this.setState({
            error: true,
            msg: response.data.message,
          });
        }
      }).catch((error) => {
        this.setState({
          error: true,
          msg: error.message,
        });
      });
    }
  }

  download() {
    const urls = `${process.env.API_FILE_ENDPOINT}/products/sample/download`;
    // fake server request, getting the file url as response
    setTimeout(() => {
      const response = {
        file: urls,
      };
      // server sent the url to the file!
      // now, let's download:
      window.open(response.file);
      // you could also do:
      // window.location.href = response.file;
    }, 100);
  }

  async handleSubmit(e) {
    e.preventDefault();
    console.log('event', e);
    const file = e.target.files[0];
    if (file) {
      // eslint-disable-next-line no-console
      const bodyFormData = new FormData();
      bodyFormData.append('name', 'products');
      bodyFormData.append('file', file);

      const tokenStr = localStorage.getItem('cannave_token');
      const token = JSON.parse(tokenStr);
      const urls = `${process.env.API_ENDPOINT}/products/batches/import`;
      axios({
        method: 'post',
        url: urls,
        data: bodyFormData,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((response) => {
        if (!response.data.error) {
          const history = createHashHistory();
          history.push('/plants/list', { forceRefresh: true });
        } else {
          this.setState({
            error: true,
            msg: response.data.message,
          });
        }
      }).catch((error) => {
        this.setState({
          error: true,
          msg: error.message,
        });
      });
    }
  }

  render() {
    const { serial, error, msg } = this.state;
    console.log('serialNo', serial);
    const maxSize = 1048576;
    return (
      <form className="form form form--horizontal">
        {error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : null}
        <ButtonToolbar className="products-list__btn-toolbar-top">
          <div className="form__form-group products-list__search">
            <Button
              color="primary"
              className="btn btn-primary products-list__btn-add sampleButton"
              type="submit"
              disabled={this.state.gotFormat}
              onClick={() => this.download()}
            >Download Format File
            </Button>
            <span />
          </div>
        </ButtonToolbar>
        <div className="dropzone">
          <Dropzone
            onDrop={this.onDrop}
            minSize={0}
            className="dropzone"
            maxSize={maxSize}
          >
            {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
              const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
              return (
                <section className="dropzone">
                  <div {...getRootProps()} className="dropBox">
                    <input {...getInputProps()} />
                    {!isDragActive && 'Click here or drop a file to upload!'}
                    {isDragActive && !isDragReject && 'Drop it here'}
                    {isDragReject && 'File type not accepted, sorry!'}
                    {isFileTooLarge && (
                      <div className="text-danger mt-2">
                        File is too large.
                      </div>
                    )}
                  </div>
                </section>
              );
            }
            }
          </Dropzone>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'plant_add_form',
  initialValues: {
    serial: `SN${Math.floor(Math.random() * 99999999) + 10000000}`,
  },
  enableReinitialize: true,
})(PlantAddForm);
