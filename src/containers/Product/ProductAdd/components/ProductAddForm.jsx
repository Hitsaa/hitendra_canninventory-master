/* eslint-disable */
import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Col } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import HelpIcon from '@material-ui/icons/Help';
import createHashHistory from 'history/createHashHistory';
import renderSelectField from '../../../../shared/components/form/Select';

class ProductAddForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      loaded: 'NOT_LOADED',
      categories: [],
      plantsObj: [],
      error: false,
      msg: '',
      shouldSearch: false,
      shouldShow: true,
      isRetailer: false,
      isProcessor: false,
      isGrower: false,
      batchID: '',
      serial: '',
      randomSerial: this.generateSerial(),
      clientID: '',
      shouldCreateClient: false,
      categoryID: '',
      serialFound: false,
      isOtherProduct: false,
      isPlant: false,
      showCheckCategory: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSubmitGrowProc = this.handleSubmitGrowProc.bind(this);
    this.handleCategorySubmit = this.handleCategorySubmit.bind(this);
    this.handleSubmitOtherProduct = this.handleSubmitOtherProduct.bind(this);
  }

  async componentDidMount() {
    const randomSerial = await this.generateSerial();
    this.setState({ randomSerial });
    const user = localStorage.getItem('cannave_user');
    if (user !== null && user !== '' && user !== undefined) {
      if (JSON.parse(user)) {
        const paresedUser = JSON.parse(user);
        if (paresedUser.role === 'RETAILER') {
          this.setState({ loaded: 'LOADED' });
          this.setState({ isRetailer: true });
        }
        if (paresedUser.role === 'PROCESSOR') {
          this.setState({ loaded: 'LOADED' });
          this.setState({ isProcessor: true });
          this.setState({ shouldSearch: true });
        }
        if (paresedUser.role === 'GROWER') {
          this.setState({ loaded: 'LOADING' });
          this.state.isGrower = true;
          this.setState({ loaded: 'LOADED' });
        }
        console.log('adminStatus', paresedUser.isAdmin);
        if (paresedUser.isAdmin === 1) {
          this.state.isAdmin = true;
          console.log(this.state.isAdmin);
        }
      }
    }
  }

  handleChange(plant) {
    const originalPlants = this.state.plantsObj;
    const cats = originalPlants.filter(obj => obj.id === plant.value)[0];
    console.log(cats);
    const values = [];
    for (let i = 0; i < cats.categories.length; i += 1) {
      values.push({
        value: cats.categories[i].id,
        label: cats.categories[i].name,
      });
    }
    console.log(values);
    this.setState({ categories: values });
  }

  async handleSubmitOtherProduct(e) {
    e.preventDefault();
    const title = this.inputProductTitle.value;
    const quantity = this.inputQuantity.value;
    const price = this.inputPrice.value;
    const description = this.inputDescription.value;
    const categoryID = this.state.categoryID;
    let plantStage = '';
    if (this.state.isPlant) {
      plantStage = this.inputPlantStage.value;
    }
    if (title && quantity && price && description) {
      // eslint-disable-next-line no-console
      const bodyFormData = new FormData();
      bodyFormData.append('title', title);
      bodyFormData.append('quantity', quantity);
      bodyFormData.append('price', price);
      bodyFormData.append('decription', description);
      bodyFormData.append('category_id', categoryID);
      if (this.state.isPlant) {
        bodyFormData.append('plant_stage', plantStage.value);
      }

      const urls = `${process.env.API_ENDPOINT}/products/others`;

      const tokenStr = localStorage.getItem('cannave_token');
      const token = JSON.parse(tokenStr);
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

  async handleSubmitGrowProc(e) {
    e.preventDefault();
    let strainName = '';
    let shouldCreatePlant = false;
    let businessName = '';
    let phoneNumber = '';
    let zip = '';
    let city = '';
    let state = '';
    let address = '';
    let emailAddress = '';
    let businessLicense = '';
    let role = '';
    let serial = '';
    let batchNo = '';
    let componentTracking = '';
    let plantStage = '';
    const description = '';
    let growMethod = '';
    let weight = '';
    let weightType = '';
    let quantity = '';
    if (!this.state.shouldShow) {
      batchNo = this.state.batchID;
      strainName = this.inputPlantName.value;
      serial = this.inputSerial.value;
      plantStage = (this.inputPlantStage && this.inputPlantStage.value) ? this.inputPlantStage.value : '';
    } else {
      strainName = this.inputPlantName.value;
      serial = this.inputSerial.value;
      componentTracking = this.inputComponentTracking.value;
      plantStage = this.inputPlantStage.value;
      batchNo = (this.inputBatchNo && this.inputBatchNo.value) ? this.inputBatchNo.value : '';
      growMethod = this.inputGrowMethod.value;
      shouldCreatePlant = true;
    }
    if (this.state.shouldCreateClient) {
      businessName = this.inputBusinessName.value;
      phoneNumber = this.inputPhoneNumber.value;
      zip = this.inputZip.value;
      city = this.inputCity.value;
      state = this.inputState.value;
      address = this.inputAddress.value;
      emailAddress = this.inputEmailAddress.value;
      businessLicense = this.inputBusinessLicense.value;
      role = this.inputRole.value;
    }
    if (this.state.isPlant) {
      quantity = this.inputQuantity.value;
    } else {
      weight = this.inputWeight.value;
      weightType = this.inputWeightType.value;

    }


    const categoryID = this.inputCategoryID.value;
    const pricePerWeight = this.inputPricePerWeight.value;
    // eslint-disable-next-line no-console
    const bodyFormData = new FormData();
    bodyFormData.append('should_create_plant', shouldCreatePlant);
    bodyFormData.append('name', strainName);
    bodyFormData.append('serial', serial);
    bodyFormData.append('batch_id', batchNo);
    bodyFormData.append('batch_no', batchNo);
    bodyFormData.append('grow_method', growMethod.value);
    bodyFormData.append('component_tracking', componentTracking.value);
    bodyFormData.append('plant_stage', plantStage.value);
    bodyFormData.append('description', description);
    bodyFormData.append('quantity', quantity);
    bodyFormData.append('weight_type', weightType.value);
    bodyFormData.append('weight', weight);
    bodyFormData.append('category_id', categoryID.value);
    bodyFormData.append('price_per_weight', pricePerWeight);
    bodyFormData.append('should_create_client', this.state.shouldCreateClient);
    if (this.state.shouldCreateClient) {
      bodyFormData.append('businessName', businessName);
      bodyFormData.append('phone', phoneNumber);
      bodyFormData.append('zip', zip);
      bodyFormData.append('city', city);
      bodyFormData.append('state', state);
      bodyFormData.append('email', emailAddress);
      bodyFormData.append('address', address);
      bodyFormData.append('businessLicenseNumber', businessLicense);
      bodyFormData.append('role', role.value);
    } else {
      bodyFormData.append('clientID', this.state.clientID);
    }

    const urls = `${process.env.API_ENDPOINT}/products`;

    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
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

  generateSerial() {
    const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const serialLength = 10;
    let randomSerial = 'SN';
    let randomNumber = 0;
    for (let i = 0; i < serialLength; i += 1) {
      randomNumber = Math.floor(Math.random() * chars.length);
      randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }
    console.log('serial', randomSerial);
    return randomSerial;
  }

  async handleSearchSubmit(e) {
    e.preventDefault();
    const serial = this.inputSerial.value;
    const licenseNo = this.inputLicenseNo.value;
    // eslint-disable-next-line no-console
    const bodyFormData = new FormData();
    bodyFormData.append('serial', serial);
    bodyFormData.append('license', licenseNo);
    const urls = `${process.env.API_ENDPOINT}/products/search`;

    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
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
        this.setState({ shouldShow: false });
        this.setState({ shouldSearch: false });
        this.setState({ error: false });
        this.setState({ msg: response.data.message });
        this.setState({ batchID: response.data.batch.id });
        this.setState({ shouldCreateClient: response.data.shouldCreateClient });
        this.state.clientID = response.data.client.id;
        // this.setState({ clientID: response.data.client.id });
      } else {
        this.setState({
          error: true,
          msg: response.data.message,
          shouldSearch: false,
          shouldShow: true,
          clientID: response.data.client.id,
          shouldCreateClient: response.data.shouldCreateClient,
        });
      }
    }).catch((error) => {
      this.setState({
        error: true,
        msg: error.message,
      });
    });
  }

  async handleCategorySubmit(e) {
    e.preventDefault();
    const categoryID = this.inputCategoryID.value;
    if (categoryID.value === 'ANCILLARY' || categoryID.value === 'OTHER') {

      this.setState({ shouldSearch: false });
      this.setState({ isOtherProduct: true });
      this.setState({ categoryID: categoryID.value });
      this.setState({ showCheckCategory: false });
    } else {
      if (categoryID.value === 'PLANT') {
        this.setState({ isPlant: true });
      }
      this.setState({ shouldSearch: true });
      this.setState({ showCheckCategory: false });
    }
  }

  async renderCats(plant) {
    const originalPlants = this.state.plantsObj;
    const cats = originalPlants.filter(obj => obj.value === plant.id)[0];
    const values = [];
    for (let i = 0; i < cats.categories.length; i += 1) {
      values.push({
        value: plant.categories[i].id,
        label: plant.categories[i].name,
      });
    }
    this.setState({ categories: values });
  }


  render() {
    const { error, msg, isPlant } = this.state;
    const { loaded, shouldShow, isOtherProduct } = this.state;
    // const { isRetailer, isProcessor, isGrower } = this.state;
    const { shouldCreateClient, shouldSearch, showCheckCategory } = this.state;
    let type = null;
    if (loaded === 'LOADING') {
      type = <div className="load__icon-wrap"><svg className="load__icon"><path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg> </div>;
    }
    if (loaded === 'LOADED') {
      if (shouldSearch) {
        type = (
          <form className="form form form--horizontal" onSubmit={this.handleSearchSubmit}>
            {error ? <div className="form__form-group"><strong>{msg}</strong></div> : null}
            <div className="form__form-group">
              <span className="form__form-group-label">Batch Serial Number</span>
              <div className="form__form-group-field">
                <Field
                  name="plant_id"
                  component="input"
                  placeholder="Batch Number"
                  type="text"
                  ref={node => (this.inputSerial = node)}
                />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Seller License No.</span>
              <div className="form__form-group-field">
                <Field
                  name="license_no"
                  component="input"
                  placeholder="License Number of Seller"
                  type="text"
                  ref={node => (this.inputLicenseNo = node)}
                />
              </div>
            </div>
            <div className="form_form-group">
              <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" className="btn-block" type="submit">SEARCH</Button>
              </ButtonToolbar>
            </div>
          </form>
        );
      } else {
        if (showCheckCategory) {
          type = (
            <form className="form form form--horizontal" onSubmit={this.handleCategorySubmit}>
              <div className="form__form-group">
                <span className="form__form-group-label">Select Category</span>
                <div className="form__form-group-field">
                  <Field
                    name="category_id"
                    component={renderSelectField}
                    type="text"
                    required
                    ref={node => (this.inputCategoryID = node)}
                    options={[
                      // { value: 'FLOWER', label: 'Flower' },
                      // { value: 'TRIM', label: 'Trim' },
                      // { value: 'SHAKE', label: 'Shake' },
                      // { value: 'ANCILLARY', label: 'Ancillary' },
                      // { value: 'PLANT', label: 'Plant' },
                      // { value: 'OILS', label: 'Oils' },
                      // { value: 'CONCENTRATES', label: 'Concentrates' },
                      // { value: 'PRE-ROLLS', label: 'Pre-rolls' },
                      // { value: 'WASTE', label: 'Waste' },
                      // { value: 'EDIBLES', label: 'Edibles' },
                      // { value: 'OTHER', label: 'Other' },
                      { value: 'FLOWER', label: 'Flower' },
                      { value: 'SHAKE', label: 'Shake/Trim' },
                      { value: 'PLANT', label: 'Plant' },
                      { value: 'EDIBLE', label: 'Edibles' },
                      { value: 'TINCTURE', label: 'Tincture' },
                      { value: 'TROPICAL', label: 'Tropical' },
                      { value: 'TRANS_DERMAL', label: 'Trans-dermal Patch' },
                      { value: 'EXTRACT', label: 'Extract' },
                      { value: 'CONCENTRATE', label: 'Concentrates' },
                      { value: 'CAPSULE', label: 'Capsule' },
                      { value: 'PRE_ROLL', label: 'Pre-Rolls' },
                      { value: 'COMBINED_CATEGORY', label: 'Combined Category' },
                      { value: 'SUPPOSITORY', label: 'Suppository' },
                      { value: 'WASTE', label: 'Waste' },
                      { value: 'ANCILLARY', label: 'Ancillary' },
                      { value: 'OTHER', label: 'Other' },
                    ]}
                  />
                </div>
              </div>
              <div className="form_form-group">
                <ButtonToolbar className="form__button-toolbar">
                  <Button color="primary" className="btn-block" type="submit">CONTINUE</Button>
                </ButtonToolbar>
              </div>
            </form>
          );
        } else {
          if (isOtherProduct) {
            type = (
              <form className="form form form--horizontal" onSubmit={this.handleSubmitOtherProduct}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Product/Plant Name</span>
                  <div className="form__form-group-field">
                    <Field
                      name="product_title"
                      component="input"
                      type="text"
                      required
                      ref={node => (this.inputProductTitle = node)}
                    />
                  </div>
                </div>
                {isPlant ? (
                  <div className="form__form-group">
                    <span className="form__form-group-label">Plant Stage</span>
                    <div className="form__form-group-field">
                      <Field
                        name="plant_stage"
                        component={renderSelectField}
                        type="text"
                        required
                        ref={node => (this.inputPlantStage = node)}
                        options={[
                          { value: 'SEEDLING', label: 'Seedling' },
                          { value: 'PRE-VEG', label: 'Pre-Veg' },
                          { value: 'VEG', label: 'Veg' },
                          { value: 'FLOWER', label: 'Flower' },
                          { value: 'DRYING', label: 'Drying' },
                          { value: 'DRIED', label: 'Dried' },
                          { value: 'SOLD', label: 'Sold' },
                          { value: 'DESTROYED', label: 'Destroyed' },
                        ]}
                      />
                    </div>
                  </div>
                ) : null}
                <div className="form__form-group">
                  <span className="form__form-group-label">Price</span>
                  <div className="form__form-group-field">
                    <Field
                      name="price"
                      component="input"
                      type="number"
                      required
                      ref={node => (this.inputPrice = node)}
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Quantity</span>
                  <div className="form__form-group-field">
                    <Field
                      name="quantity"
                      component="input"
                      type="number"
                      required
                      ref={node => (this.inputQuantity = node)}
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Description</span>
                  <div className="form__form-group-field">
                    <Field
                      name="description"
                      component="textarea"
                      type="text"
                      required
                      ref={node => (this.inputDescription = node)}
                    />
                  </div>
                </div>
                <div className="form_form-group">
                  <ButtonToolbar className="form__button-toolbar">
                    <Button color="primary" className="btn-block" type="submit">SUBMIT PRODUCT</Button>
                  </ButtonToolbar>
                </div>
              </form>
            );
          } else {
            type = (
              <form className="form form form--horizontal" onSubmit={this.handleSubmitGrowProc}>
                {error ? <div className="form__form-group"><strong>Error!.</strong> {msg}</div> : null}
                {!error ? <div className="form__form-group"><strong>Search Result:</strong> {msg}</div> : null}
                <Col md={6} lg={6}>
                  {shouldCreateClient ? <div className="form__form-group">Client Details(Supplier)</div> : null}
                  {shouldCreateClient ? (
                    <div className="form__form-group">
                      <span className="form__form-group-label">Business Name</span>
                      <div className="form__form-group-field">
                        <Field
                          name="business_name"
                          component="input"
                          required
                          type="text"
                          ref={node => (this.inputBusinessName = node)}
                        />
                      </div>
                    </div>
                  ) : null}
                  {shouldCreateClient ? (
                    <div className="form__form-group form__form-group-id">
                      <span className="form__form-group-label">Phone Number</span>
                      <div className="form__form-group-field">
                        <Field
                          name="phone_number"
                          component="input"
                          type="text"
                          required
                          ref={node => (this.inputPhoneNumber = node)}
                        />
                      </div>
                    </div>
                  ) : null}
                  {shouldCreateClient ? (
                    <div className="form__form-group">
                      <span className="form__form-group-label">Email Address</span>
                      <div className="form__form-group-field">
                        <Field
                          name="email_address"
                          component="input"
                          required
                          type="email"
                          ref={node => (this.inputEmailAddress = node)}
                        />
                      </div>
                    </div>
                  ) : null}
                  {shouldCreateClient ? (
                    <div className="form__form-group">
                      <span className="form__form-group-label">Address</span>
                      <div className="form__form-group-field">
                        <Field
                          name="address"
                          component="input"
                          required
                          type="text"
                          ref={node => (this.inputAddress = node)}
                        />
                      </div>
                    </div>
                  ) : null}
                </Col>
                <Col md={6} lg={6}>
                  {shouldCreateClient ? (
                    <div className="form__form-group">
                      <span className="form__form-group-label">Zip Code</span>
                      <div className="form__form-group-field">
                        <Field
                          name="zipCode"
                          component="input"
                          required
                          type="number"
                          ref={node => (this.inputZip = node)}
                        />
                      </div>
                    </div>
                  ) : null}
                  {shouldCreateClient ? (
                    <div className="form__form-group">
                      <span className="form__form-group-label">City</span>
                      <div className="form__form-group-field">
                        <Field
                          name="city"
                          component="input"
                          type="text"
                          required
                          ref={node => (this.inputCity = node)}
                        />
                      </div>
                    </div>
                  ) : null}
                  {shouldCreateClient ? (
                    <div className="form__form-group">
                      <span className="form__form-group-label">State</span>
                      <div className="form__form-group-field">
                        <Field
                          name="state"
                          component="input"
                          type="text"
                          required
                          ref={node => (this.inputState = node)}
                        />
                      </div>
                    </div>
                  ) : null}
                  {shouldCreateClient ? (
                    <div className="form__form-group">
                      <span className="form__form-group-label">Role</span>
                      <div className="form__form-group-field">
                        <Field
                          name="role"
                          component={renderSelectField}
                          type="text"
                          required
                          ref={node => (this.inputRole = node)}
                          options={[
                            { value: 'GROWER', label: 'GROWER' },
                            { value: 'PROCESSOR', label: 'PROCESSOR' },
                            { value: 'RETAILER', label: 'RETAILER' },
                          ]}
                        />
                      </div>
                    </div>
                  ) : null}
                  {shouldCreateClient ? (
                    <div className="form__form-group">
                      <span className="form__form-group-label">Business License Number</span>
                      <div className="form__form-group-field">
                        <Field
                          name="businessLicense"
                          component="input"
                          required
                          ref={node => (this.inputBusinessLicense = node)}
                        />
                      </div>
                    </div>
                  ) : null}
                </Col>
                <br />
                <Col md={6} lg={6}>
                  <div className="form__form-group">Product Details</div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Strain/Product Name</span>
                    <div className="form__form-group-field">
                      <Field
                        name="plant_name"
                        component="input"
                        type="text"
                        required
                        ref={node => (this.inputPlantName = node)}
                      />
                    </div>
                  </div>
                  {
                    shouldShow ? (
                      <div className="form__form-group">
                        <span className="form__form-group-label">Batch Serial Number</span>
                        <div className="form__form-group-field">
                          <Field
                            name="batch_no"
                            component="input"
                            placeholder="Batch Serial Number"
                            type="text"
                            ref={node => (this.inputBatchNo = node)}
                          />
                        </div>
                      </div>
                    ) : null
                  }
                  {isPlant ? (
                    <div className="form__form-group form__form-group-id">
                      <span className="form__form-group-label">Serial Number</span>
                      <Tooltip disableFocusListener title="Please type serial Numbers in comma separated format, i.e SN44545464,SN35454,TR653636636.">
                        <IconButton aria-label="help">
                          <HelpIcon />
                        </IconButton>
                      </Tooltip>
                      <div className="form__form-group-field">
                        <Field
                          name="serial"
                          type="text"
                          component="input"
                          placeholder="e.g SN2345,SN344657,S446464"
                          ref={node => (this.inputSerial = node)}
                        />
                      </div>
                    </div>
                  ) : null}
                    {!isPlant ? (
                    <div className="form__form-group form__form-group-id">
                      <span className="form__form-group-label">Serial Number</span>
                      <div className="form__form-group-field">
                        <Field
                          name="serial"
                          type="text"
                          component="input"
                          placeholder="#SN"
                          ref={node => (this.inputSerial = node)}
                        />
                      </div>
                    </div>
                  ) : null}
                  {shouldShow ? (
                    <div className="form__form-group form__form-group-id">
                      <span className="form__form-group-label">Grow Method</span>
                      <div className="form__form-group-field">
                        <Field
                          name="grow_method"
                          type="text"
                          component={renderSelectField}
                          ref={node => (this.inputGrowMethod = node)}
                          options={[
                            { value: 'SOIL', label: 'SOIL' },
                            { value: 'HYDROPONIC', label: 'HYDROPONIC' },
                          ]}
                        />
                      </div>
                    </div>
                  ) : null}
                  {shouldShow ? (
                    <div className="form__form-group">
                      <span className="form__form-group-label">Room Type</span>
                      <div className="form__form-group-field">
                        <Field
                          name="component_tracking"
                          component={renderSelectField}
                          type="text"
                          required
                          ref={node => (this.inputComponentTracking = node)}
                          options={[
                            { value: 'INDOOR', label: 'Indoor' },
                            { value: 'OUTDOOR', label: 'Outdoor' },
                            { value: 'GREENHOUSE', label: 'Greenhouse' },
                          ]}
                        />
                      </div>
                    </div>
                  ) : null}
                  {!isPlant ? (
                    <div className="form__form-group">
                      <span className="form__form-group-label">Weight Type</span>
                      <div className="form__form-group-field">
                        <Field
                          name="weight_type"
                          component={renderSelectField}
                          type="text"
                          required
                          ref={node => (this.inputWeightType = node)}
                          options={[
                            { value: 'OUNCES', label: 'OUNCES' },
                            { value: 'POUNDS', label: 'POUNDS' },
                            { value: 'GRAMS', label: 'GRAMS' },
                            { value: 'FLUID_OUNCES', label: 'FLUID_OUNCES' },
                            { value: 'MILILITRES', label: 'MILILITRES' },
                            { value: 'MILIGRAMS', label: 'MILIGRAMS' },
                            { value: 'UNIT', label: 'UNIT' },
                          ]}
                        />
                      </div>
                    </div>
                  ) : null}
                </Col>
                <Col md={6} lg={6}>
                  {shouldShow ? (
                    <div className="form__form-group">
                      <span className="form__form-group-label">Plant Stage</span>
                      <div className="form__form-group-field">
                        <Field
                          name="plant_stage"
                          component={renderSelectField}
                          type="text"
                          required
                          ref={node => (this.inputPlantStage = node)}
                          options={[
                            { value: 'SEEDLING', label: 'Seedling' },
                            { value: 'PRE-VEG', label: 'Pre-Veg' },
                            { value: 'VEG', label: 'Veg' },
                            { value: 'FLOWER', label: 'Flower' },
                            { value: 'DRYING', label: 'Drying' },
                            { value: 'DRIED', label: 'Dried' },
                            { value: 'SOLD', label: 'Sold' },
                            { value: 'DESTROYED', label: 'Destroyed' },
                          ]}
                        />
                      </div>
                    </div>
                  ) : null}
                  {(!shouldShow && isPlant) ? (
                    <div className="form__form-group">
                      <span className="form__form-group-label">Plant Stage</span>
                      <div className="form__form-group-field">
                        <Field
                          name="plant_stage"
                          component={renderSelectField}
                          type="text"
                          required
                          ref={node => (this.inputPlantStage = node)}
                          options={[
                            { value: 'SEEDLING', label: 'Seedling' },
                            { value: 'PRE-VEG', label: 'Pre-Veg' },
                            { value: 'VEG', label: 'Veg' },
                            { value: 'FLOWER', label: 'Flower' },
                            { value: 'DRYING', label: 'Drying' },
                            { value: 'DRIED', label: 'Dried' },
                            { value: 'SOLD', label: 'Sold' },
                            { value: 'DESTROYED', label: 'Destroyed' },
                          ]}
                        />
                      </div>
                    </div>
                  ) : null}
                  {isPlant ? (
                    <div className="form__form-group form__form-group-id">
                      <span className="form__form-group-label">Quantity</span>
                      <div className="form__form-group-field">
                        <Field
                          name="quantity"
                          component="input"
                          type="number"
                          required
                          ref={node => (this.inputQuantity = node)}
                        />
                      </div>
                    </div>
                  ) : null}
                  {!isPlant ? (
                    <div className="form__form-group form__form-group-id">
                      <span className="form__form-group-label">Weight Value</span>
                      <div className="form__form-group-field">
                        <Field
                          name="weight"
                          component="input"
                          type="text"
                          required
                          ref={node => (this.inputWeight = node)}
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className="form__form-group">
                    <span className="form__form-group-label">Category</span>
                    <div className="form__form-group-field">
                      <Field
                        name="category_id"
                        component={renderSelectField}
                        type="text"
                        required
                        ref={node => (this.inputCategoryID = node)}
                        options={[
                          { value: 'FLOWER', label: 'Flower' },
                          { value: 'SHAKE', label: 'Shake/Trim' },
                          { value: 'EDIBLE', label: 'Edibles' },
                          { value: 'PLANT', label: 'Plant' },
                          { value: 'TINCTURE', label: 'Tincture' },
                          { value: 'TROPICAL', label: 'Tropical' },
                          { value: 'TRANS_DERMAL', label: 'Trans-dermal Patch' },
                          { value: 'EXTRACT', label: 'Extract' },
                          { value: 'CONCENTRATE', label: 'Concentrates' },
                          { value: 'CAPSULE', label: 'Capsule' },
                          { value: 'PRE_ROLL', label: 'Pre-Rolls' },
                          { value: 'COMBINED_CATEGORY', label: 'Combined Category' },
                          { value: 'SUPPOSITORY', label: 'Suppository' },
                          { value: 'WASTE', label: 'Waste' },

                        ]}
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Price per Unit/Weight <span>(USD)</span></span>
                    <div className="form__form-group-field">
                      <Field
                        name="price_per_weight"
                        component="input"
                        required
                        ref={node => (this.inputPricePerWeight = node)}
                        type="number"
                      />
                    </div>
                  </div>
                </Col>
                <div className="form_form-group">
                  <ButtonToolbar className="form__button-toolbar">
                    <Button color="primary" className="btn-block" type="submit">CREATE PRODUCT</Button>
                  </ButtonToolbar>
                </div>
              </form>
            );
          }
        }
      }
    }
    return type;
  }
}
export default reduxForm({
  form: 'product_add_form', // a unique identifier for this form
  initialValues: {
    serial: '',
  },
  enableReinitialize: true,
})(ProductAddForm);
