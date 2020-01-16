/* eslint-disable */
import React, { PureComponent } from "react";
import { Button, ButtonToolbar, Col, Input, Row, } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { Field, reduxForm } from "redux-form";
import axios from "axios";
import HelpIcon from "@material-ui/icons/Help";
import createHashHistory from "history/createHashHistory";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import renderSelectField from "../../../../shared/components/form/Select";

class ProductEditForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      loaded: "NOT_LOADED",
      inventories: [],
      categories: [],
      weightTypes: [],
      businessName: "",
      suppliers: [],
      product: [],
      productId: '',
      plantsObj: [],
      error: false,
      msg: "",
      shouldSearch: false,
      shouldShow: true,
      isRetailer: false,
      isProcessor: false,
      isGrower: false,
      batchID: "",
      serial: "",
      randomSerial: this.generateSerial(),
      clientID: "",
      shouldCreateClient: false,
      categoryID: "",
      serialFound: false,
      isOtherProduct: false,
      isPlant: false,
      showCheckCategory: true,
      inventoryCount: 1,
      formSubmitted: false,
      requiredProductName: false,
      requiredQuantity: false,
      requiredWeightType: false,
      requiredCategoryId: false,
      requiredBusinessLicenceNumber: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.generateSerialSimple = this.generateSerialSimple.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSubmitGrowProc = this.handleSubmitGrowProc.bind(this);
    this.handleCategorySubmit = this.handleCategorySubmit.bind(this);
    this.handleSubmitOtherProduct = this.handleSubmitOtherProduct.bind(this);
    this.addInventoryFields = this.addInventoryFields.bind(this);
    this.removeInventoryFields = this.removeInventoryFields.bind(this);
    this.state.serial = this.generateSerial('serial');
    this.state.batchID = this.generateSerial('batch_lot');
  }

  async componentDidMount() {
    this.setState({ loaded: "LOADING" });
    const randomSerial = await this.generateSerial();
    this.setState({ randomSerial });
    const parts = window.location.hash.split('/');
    const productId = parts.pop() || parts.pop();
    this.setState({ productId });
    const user = localStorage.getItem("cannave_user");
    if (user !== null && user !== "" && user !== undefined) {
      if (JSON.parse(user)) {
        await this.editProcessorProduct(productId);
        const paresedUser = JSON.parse(user);
        if (paresedUser.role === "RETAILER") {
          this.setState({ loaded: "LOADED" });
          this.setState({ isRetailer: true });
        }
        if (paresedUser.role === "PROCESSOR") {
          this.setState({ loaded: "LOADED" });
          this.setState({ isProcessor: true });
          this.setState({ shouldSearch: true });
        }
        if (paresedUser.role === "GROWER") {
          this.setState({ loaded: "LOADING" });
          this.state.isGrower = true;
          this.setState({ loaded: "LOADED" });
        }
        // console.log("adminStatus", paresedUser.isAdmin);
        if (paresedUser.isAdmin === 1) {
          this.state.isAdmin = true;
          console.log(this.state.isAdmin);
        }
      }
    }
  }

  editProcessorProduct = async (productId) => {
    // let inventory = {};
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT_LOC}/processor-product-edit/${productId}`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.data.error) {
        const product = response.data[3];
        // console.log(product);
        this.setState({ inventories: response.data[0], categories: response.data[1], weightTypes: response.data[2], product: response.data[3], businessName: response.data[4], serial: product.serial, batchID: product.batch_no, suppliers: response.data[5]});
        if (product.batch_no === 'null' || product.batch_no === null) {
          this.setState({ batchID: '' });
        }
        if (product.processor_product_inventories.length > 0) {
          this.setState({ inventoryCount: product.processor_product_inventories.length });
        } else {
          this.setState({ inventoryCount: 1 });
        }
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
    // return inventory;
  }

  addInventoryFields(inventoryCount) {
    this.setState({ inventoryCount: inventoryCount + 1 });
  }

  removeInventoryFields(inventoryCount) {
    if (inventoryCount > 1) {
      this.setState({ inventoryCount: inventoryCount - 1 });
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
        label: cats.categories[i].name
      });
    }
    console.log(values);
    this.setState({ categories: values });
  }

  changeBusinessName(event) {
      this.setState( {businessName: event.target.value} );
  }

  async handleSubmitOtherProduct(e) {
    e.preventDefault();
    const title = this.inputProductTitle.value;
    const quantity = this.inputQuantity.value;
    const price = this.inputPrice.value;
    const description = this.inputDescription.value;
    const categoryID = this.state.categoryID;
    let plantStage = "";
    if (this.state.isPlant) {
      plantStage = this.inputPlantStage.value;
    }
    if (title && quantity && price && description) {
      // eslint-disable-next-line no-console
      const bodyFormData = new FormData();
      bodyFormData.append("title", title);
      bodyFormData.append("quantity", quantity);
      bodyFormData.append("price", price);
      bodyFormData.append("decription", description);
      bodyFormData.append("category_id", categoryID);
      if (this.state.isPlant) {
        bodyFormData.append("plant_stage", plantStage.value);
      }

      const urls = `${process.env.API_ENDPOINT}/products/others`;

      const tokenStr = localStorage.getItem("cannave_token");
      const token = JSON.parse(tokenStr);
      axios({
        method: "post",
        url: urls,
        data: bodyFormData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => {
          if (!response.data.error) {
            const history = createHashHistory();
            history.push("/products/list", { forceRefresh: true });
          } else {
            this.setState({
              error: true,
              msg: response.data.message
            });
          }
        })
        .catch((error) => {
          this.setState({
            error: true,
            msg: error.response.data.message,
          });
          const errorFields = Object.keys(error.response.data.errors);
          errorFields.map((field) => {
            toast.error(error.response.data.errors[field][0], field);
            return true;
          });
        });
    }
  }

  async handleSubmitGrowProc(e) {
    e.preventDefault();
    let strainName = "";
    let shouldCreatePlant = false;
    let businessName = "";
    let phoneNumber = "";
    let zip = "";
    let city = "";
    let state = "";
    let address = "";
    let emailAddress = "";
    let businessLicense = "";
    let role = "";
    let serial = "";
    let batchNo = "";
    let componentTracking = "";
    let plantStage = "";
    const description = "";
    let growMethod = "";
    let weight = "";
    let weightType = "";
    let quantity = "";
    if (!this.state.shouldShow) {
      batchNo = this.state.batchID;
      strainName = this.refs.ProcessorEditForm.product_name.value;
      serial = this.state.serial;
      plantStage =
        this.refs.ProcessorEditForm.plant_stage && this.refs.ProcessorEditForm.plant_stage.value
          ? this.refs.ProcessorEditForm.plant_stage.value
          : "";
    } else {
      // console.log('in');
      strainName = this.refs.ProcessorEditForm.product_name.value;
      serial = this.state.serial;
      componentTracking = this.refs.ProcessorEditForm.room_type.value;
      plantStage = this.refs.ProcessorEditForm.plant_stage.value;
      batchNo =
        this.refs.ProcessorEditForm.batch_lot && this.refs.ProcessorEditForm.batch_lot.value
          ? this.refs.ProcessorEditForm.batch_lot.value
          : "";
      growMethod = this.refs.ProcessorEditForm.grow_method.value;
      // console.log(growMethod);
      shouldCreatePlant = true;
    }
    businessName = this.refs.ProcessorEditForm.business_name.value;
    if (this.state.shouldCreateClient) {
      phoneNumber = this.inputPhoneNumber.value;
      zip = this.inputZip.value;
      city = this.inputCity.value;
      state = this.inputState.value;
      address = this.inputAddress.value;
      emailAddress = this.inputEmailAddress.value;
      businessLicense = this.refs.ProcessorEditForm.business_license_number.value;
      role = this.inputRole.value;
    }
    // if (this.state.isPlant) {
      quantity = this.refs.ProcessorEditForm.quantity.value;
    // } else {
      weight = 0;
      if(typeof this.refs.ProcessorEditForm.weight_per_sellable_product !== "undefined"){
        weight = this.refs.ProcessorEditForm.weight_per_sellable_product.value;
      }
      weightType = this.refs.ProcessorEditForm.weight_type.value;
    // }
  
    const categoryID = this.refs.ProcessorEditForm.category_id.value;
    const pricePerWeight = this.refs.ProcessorEditForm.price_per_unit_weight.value;
    const roomType = this.refs.ProcessorEditForm.room_type.value;
    const processorPlantStage = this.refs.ProcessorEditForm.plant_stage.value;

    const subInventoryIds = this.refs.ProcessorEditForm.inventory_id;
    const inventoryWeightTypes = this.refs.ProcessorEditForm.inventory_weight_type;
    const inventoryQuantities = this.refs.ProcessorEditForm.inventory_quantity;

    // eslint-disable-next-line no-console
    const bodyFormData = new FormData();
    bodyFormData.append("should_create_plant", shouldCreatePlant);
    bodyFormData.append("product_name", strainName);
    bodyFormData.append("serial_no", serial);
    bodyFormData.append("batch_lot", batchNo);
    // bodyFormData.append("batch_no", batchNo);
    if (this.state.shouldShow) {
      bodyFormData.append("grow_method", growMethod);
    }
    bodyFormData.append("room_type", roomType)
    bodyFormData.append("component_tracking", componentTracking);
    bodyFormData.append("plant_stage", processorPlantStage);
    // bodyFormData.append("description", description);
    bodyFormData.append("quantity", quantity);
    bodyFormData.append("weight_type", weightType);
    bodyFormData.append("weight_per_sellable_product", weight);
    bodyFormData.append("category_id", categoryID);
    bodyFormData.append("price_per_unit_weight", pricePerWeight);

    businessLicense = this.refs.ProcessorEditForm.business_license_number.value;
    bodyFormData.append("business_license_number", businessLicense);
    bodyFormData.append("should_create_client", this.state.shouldCreateClient);
    bodyFormData.append("business_name", businessName);
    if (this.state.shouldCreateClient) {
      bodyFormData.append("phone", phoneNumber);
      bodyFormData.append("zip", zip);
      bodyFormData.append("city", city);
      bodyFormData.append("state", state);
      bodyFormData.append("email", emailAddress);
      bodyFormData.append("address", address);
      bodyFormData.append("business_license_number", businessLicense);
      bodyFormData.append("role", role.value);
    } else {
      bodyFormData.append("clientID", this.state.clientID);
    }

    if (typeof inventoryQuantities.length !== 'undefined') {
      for (let i = 0; i < subInventoryIds.length; i += 1) {
        // bodyFormData.append(`inventory_ingredients[${i}][inventory_id]`, 9);
        bodyFormData.append(`processor_product_inventory[${i}][inventory_id]`, subInventoryIds[i].value);
        bodyFormData.append(`processor_product_inventory[${i}][inventory_weight_type]`, inventoryWeightTypes[i].value);
        bodyFormData.append(`processor_product_inventory[${i}][inventory_quantity]`, inventoryQuantities[i].value);
      }
    } else {
      bodyFormData.append('processor_product_inventory[0][inventory_id]', subInventoryIds.value);
      bodyFormData.append('processor_product_inventory[0][inventory_weight_type]', inventoryWeightTypes.value);
      bodyFormData.append('processor_product_inventory[0][inventory_quantity]', inventoryQuantities.value);
    }

    const productID = this.state.productId;

    const urls = `${process.env.API_ENDPOINT_LOC}/processor-product-update/${productID}`;

    const tokenStr = localStorage.getItem("cannave_token");
    const token = JSON.parse(tokenStr);
    this.setState({ formSubmitted: true });
    axios({
      method: "post",
      url: urls,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => {
        this.setState({ formSubmitted: false });
        if (!response.data.error) {
          const history = createHashHistory();
          history.push("/productsprocessor/list", { forceRefresh: true });
        } else {
          this.setState({
            error: true,
            msg: response.data.message
          });
        }
      })
      .catch(error => {
        this.setState({
          formSubmitted: false,
          error: true,
          msg: error.message
        });
        const errorFields = Object.keys(error.response.data.errors);
        errorFields.map((field) => {
          toast.error(error.response.data.errors[field][0], field);
          if (field === 'product_name') {
            this.setState({ requiredProductName: true });
          }
          if (field === 'quantity') {
            this.setState({ requiredQuantity: true });
          }
          if (field === 'weight_type') {
            this.setState({ requiredWeightType: true });
          }
          if (field === 'category_id') {
            this.setState({ requiredCategoryId: true });
          }
          if (field === 'business_license_number') {
            this.setState({ requiredBusinessLicenceNumber: true });
          }
          return true;
        });
      });
  }

  generateSerial() {
    const chars =
      "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const serialLength = 10;
    let randomSerial = "SN";
    let randomNumber = 0;
    for (let i = 0; i < serialLength; i += 1) {
      randomNumber = Math.floor(Math.random() * chars.length);
      randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }
    // console.log("serial", randomSerial);
    return randomSerial;
  }

  /* eslint-disable class-methods-use-this */
  generateSerialSimple(param) {
    const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const serialLength = 10;
    let randomSerial = '';
    let randomNumber = 0;
    for (let i = 0; i < serialLength; i += 1) {
      randomNumber = Math.floor(Math.random() * chars.length);
      randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }
    if (param === 'batch_lot') {
      randomSerial = `B${randomSerial}`;
      this.setState({ batchID: randomSerial });
    } else if (param === 'serial_no') {
      randomSerial = `SN${randomSerial}`;
      this.setState({ serial: randomSerial });
      console.log("serial", randomSerial);
    } 
    return randomSerial;
  }

  inputChangedHandler(event, state) {
    if (state === 'batchID') {
      this.setState( {batchID: event.target.value} );
    } else if(state === 'serial_no') {
      this.setState( {serial_no: event.target.value} );
      console.log("serial", randomSerial);
    }
  }

  priceFloatThree(e) {
    let str = e.target.value;
    str = parseFloat(str).toFixed(2);
    return e.target.value = str;
    console.log(str);
  }

  async handleSearchSubmit(e) {
    e.preventDefault();
    const serial = this.inputSerial.value;
    const licenseNo = this.inputLicenseNo.value;
    // eslint-disable-next-line no-console
    const bodyFormData = new FormData();
    bodyFormData.append("serial", serial);
    bodyFormData.append("license", licenseNo);
    const urls = `${process.env.API_ENDPOINT}/products/search`;

    const tokenStr = localStorage.getItem("cannave_token");
    const token = JSON.parse(tokenStr);
    axios({
      method: "post",
      url: urls,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => {
        if (!response.data.error) {
          this.setState({ shouldShow: false });
          this.setState({ shouldSearch: false });
          this.setState({ error: false });
          this.setState({ msg: response.data.message });
          this.setState({ batchID: response.data.batch.id });
          this.setState({
            shouldCreateClient: response.data.shouldCreateClient
          });
          this.state.clientID = response.data.client.id;
          // this.setState({ clientID: response.data.client.id });
        } else {
          this.setState({
            error: true,
            msg: response.data.message,
            shouldSearch: false,
            shouldShow: true,
            clientID: response.data.client.id,
            shouldCreateClient: response.data.shouldCreateClient
          });
        }
      })
      .catch(error => {
        this.setState({
          error: true,
          msg: error.message
        });
      });
  }

  async handleCategorySubmit(e) {
    e.preventDefault();
    const categoryID = this.refs.CategorySelectForm.category_id.value;
    // console.log(categoryID, this.state.categories[categoryID].toLowerCase().includes('plant'));
    if (this.state.categories[categoryID].toLowerCase() === "ancillary" || this.state.categories[categoryID].toLowerCase() === "other") {
      this.setState({ shouldSearch: false });
      this.setState({ isOtherProduct: true });
      this.setState({ categoryID: categoryID });
      this.setState({ showCheckCategory: false });
    } else {
      if (this.state.categories[categoryID].toLowerCase().includes('plant')) {
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
        label: plant.categories[i].name
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
    if (loaded === "LOADING") {
      type = (
        <div className="load__icon-wrap">
          <svg className="load__icon">
            <path
              fill="#4ce1b6"
              d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
            />
          </svg>{" "}
        </div>
      );
    }
    if (loaded === "LOADED") {
      const inventoryDivs = [];

      for (let i = 0; i < this.state.inventoryCount; i += 1) {
        inventoryDivs.push(<RelatedInventory key={i} processorProductInventories={this.state.product.processor_product_inventories[i]} weightTypes={this.state.weightTypes} allInventories={this.state.inventories} index={i} />);
      }
      type = (
        <form
          ref="ProcessorEditForm"
          className="form form form--horizontal"
          onSubmit={this.handleSubmitGrowProc}
        >
          {error ? (
            <div className="alert alert-danger">
              <strong>Error!.</strong> {msg}
            </div>
          ) : null}
          <Row>
            <Col md={6} lg={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">Business Name</span>
                <div className="form__form-group-field">
                  <Input
                    name="business_name"
                    defaultValue={this.state.businessName}
                    type="text"
                    ref={node => (this.inputBusinessName = node)}
                    onChange={(event)=>this.changeBusinessName(event)}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} lg={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">
                  Manufacturer License # *
                </span>
                <div className="form__form-group-field">
                  <Input
                    type="select"
                    ref={node => (this.inputBusinessLicense = node)}
                    name="business_license_number"
                    defaultValue={this.state.product.business_license_number}
                    className={this.state.requiredBusinessLicenceNumber ? 'form-control-sm react-select fieldRequired' : 'form-control-sm react-select'}
                    required
                  >
                  {this.state.suppliers.map((Value, Index) => (
                    <option value={Index} key={Value}>
                      {Value.businessName}
                    </option>
                    ))}
                  </Input>
                </div>
              </div>
            </Col>
            <br />
            <Col md={6} lg={6}>
              <div className="form__form-group">Product Details</div>
              <div className="form__form-group">
                <span className="form__form-group-label">
                  Strain/Product Name *
                </span>
                <div className="form__form-group-field">
                  <Input
                    name="product_name"
                    defaultValue={this.state.product.product_name}
                    type="text"
                    required
                    ref={node => (this.inputPlantName = node)}
                    className={this.state.requiredProductName ? 'fieldRequired' : ''}
                  />
                </div>
              </div>
              {shouldShow ? (
                <div className="form__form-group">
                  <span className="form__form-group-label">Batch Lot #</span>
                  <div className="form__form-group-field">
                    <Input
                      name="batch_lot"
                      type="text"
                      value={this.state.batchID}
                      placeholder="Batch Lot #"
                      ref={node => (this.inputBatchNo = node)}
                      onChange={(event)=>this.inputChangedHandler(event, 'batchID')}
                    />
                    <Button
                      color="secondry"
                      className="btn btn-secondary btn-generate"
                      type="button"
                      onClick={() => this.generateSerialSimple('batch_lot')}
                    >
                      GENERATE
                    </Button>
                  </div>
                </div>
              ) : null}
              {isPlant ? (
                <div className="form__form-group form__form-group-id">
                  <span className="form__form-group-label serial_label">
                    Serial Number
                  </span>
                  <Tooltip
                    disableFocusListener
                    title="Please type serial Numbers in comma separated format, i.e SN44545464,SN35454,TR653636636."
                  >
                    <IconButton aria-label="help" className="serial_but">
                      <HelpIcon />
                    </IconButton>
                  </Tooltip>
                  <div className="form__form-group-field serial_int">
                    <Input
                      name="serial_no"
                      type="text"
                      value={this.state.serial}
                      placeholder="e.g SN2345,SN344657,S446464"
                      ref={node => (this.inputSerial = node)}
                      onChange={(event)=>this.inputChangedHandler(event, 'serial_no')}
                    />
                    <Button
                      color="secondry"
                      className="btn btn-secondary btn-generate"
                      type="button"
                      onClick={() => this.generateSerialSimple('serial_no')}
                    >
                      GENERATE
                    </Button>
                  </div>
                </div>
              ) : null}
              {!isPlant ? (
                <div className="form__form-group form__form-group-id">
                  <span className="form__form-group-label">
                    Serial Number
                  </span>
                  <div className="form__form-group-field">
                    <Input
                      name="serial_no"
                      type="text"
                      value={this.state.serial}
                      placeholder="#SN"
                      ref={node => (this.inputSerial = node)}
                      onChange={(event)=>this.inputChangedHandler(event, 'serial_no')}
                    />
                    <Button
                      color="secondry"
                      className="btn btn-secondary btn-generate"
                      type="button"
                      onClick={() => this.generateSerialSimple('serial_no')}
                    >
                      GENERATE
                    </Button>
                  </div>
                </div>
              ) : null}
              {shouldShow ? (
                <div className="form__form-group form__form-group-id">
                  <span className="form__form-group-label">Grow Method</span>
                  <div className="form__form-group-field">
                    <Input
                      name="grow_method"
                      className="form-control-sm react-select"
                      type="select"
                      defaultValue={this.state.product.grow_method}
                      ref={node => (this.inputGrowMethod = node)}
                    >
                      <option key="0" value="0">Select</option>
                      <option key="SOIL" value="SOIL">SOIL</option>
                      <option key="HYDROPONIC" value="HYDROPONIC">HYDROPONIC</option>
                    </Input>
                  </div>
                </div>
              ) : null}
              {shouldShow ? (
                <div className="form__form-group">
                  <span className="form__form-group-label">Room Type</span>
                  <div className="form__form-group-field">
                    <Input
                      name="room_type"
                      className="form-control-sm react-select"
                      type="select"
                      defaultValue={this.state.product.room_type}
                      ref={node => (this.inputComponentTracking = node)}
                    >
                      <option key="0" value="0">Select</option>
                      <option key="INDOOR" value="1">INDOOR</option>
                      <option key="OUTDOOR" value="2">OUTDOOR</option>
                      <option key="GREENHOUSE" value="3">GREENHOUSE</option>
                    </Input>
                  </div>
                </div>
              ) : null}
              {!isPlant ? (
                <div className="form__form-group">
                  <span className="form__form-group-label">Weight Type *</span>
                  <div className="form__form-group-field">
                    <Input type="select" defaultValue={this.state.product.weight_type} ref={node => (this.inputWeightType = node)} name="weight_type" className={this.state.requiredWeightType ? 'form-control-sm react-select fieldRequired' : 'form-control-sm react-select'} required>
                      {
                        this.state.weightTypes.map((Value, Index) => <option value={Index} key={Value}>{Value}</option>)
                      }
                    </Input>
                    { /* <Field
                      name="weight_type"
                      component={renderSelectField}
                      type="text"
                      required
                      
                      options={[
                        { value: "POUNDS", label: "POUNDS" },
                        { value: "GRAMS", label: "GRAMS" },
                        { value: "OUNCES", label: "OUNCES" },
                        { value: "FLUID_OUNCES", label: "FLUID_OUNCES" },
                        { value: "MILILITRES", label: "MILILITRES" },
                        { value: "MILIGRAMS", label: "MILIGRAMS" },
                        { value: "UNIT", label: "UNIT" }
                      ]}
                    /> */ }
                  </div>
                </div>
              ) : null}
              {isPlant ? (
                <div className="form__form-group form__form-group-id">
                  <span className="form__form-group-label">Quantity *</span>
                  <div className="form__form-group-field">
                    <Input
                      name="quantity"
                      defaultValue={this.state.product.quantity}
                      type="number"
                      required
                      ref={node => (this.inputQuantity = node)}
                      className={this.state.requiredQuantity ? 'fieldRequired' : ''}
                    />
                  </div>
                </div>
              ) : null}
              {!isPlant ? (
                <div className="form__form-group form__form-group-id">
                  <span className="form__form-group-label">Quantity *</span>
                  <div className="form__form-group-field">
                    <Input
                      name="quantity"
                      defaultValue={this.state.product.quantity}
                      type="number"
                      required
                      ref={node => (this.inputWeight = node)}
                      className={this.state.requiredQuantity ? 'fieldRequired' : ''}
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
                    <Input
                      name="plant_stage"
                      defaultValue={this.state.product.plant_stage}
                      className="form-control-sm react-select"
                      type="select"
                      ref={node => (this.inputPlantStage = node)}
                    >
                      <option key="0" value="0">Select</option>
                      <option key="SEEDLING" value="SEEDLING">SEEDLING</option>
                      <option key="PRE-VEG" value="PRE-VEG">PRE-VEG</option>
                      <option key="VEG" value="VEG">VEG</option>
                      <option key="FLOWER" value="FLOWER">FLOWER</option>
                      <option key="DRYING" value="DRYING">DRYING</option>
                      <option key="DRIED" value="DRIED">DRIED</option>
                      <option key="SOLD" value="SOLD">SOLD</option>
                      <option key="DESTROYED" value="DESTROYED">DESTROYED</option>
                    </Input>
                  </div>
                </div>
              ) : null}
              {!shouldShow && isPlant ? (
                <div className="form__form-group">
                  <span className="form__form-group-label">Plant Stage *</span>
                  <div className="form__form-group-field">
                    <Input
                      name="plant_stage"
                      defaultValue={this.state.product.plant_stage}
                      type="select"
                      required
                      ref={node => (this.inputPlantStage = node)}
                      options={[
                        { value: "SEEDLING", label: "Seedling" },
                        { value: "PRE-VEG", label: "Pre-Veg" },
                        { value: "VEG", label: "Veg" },
                        { value: "FLOWER", label: "Flower" },
                        { value: "DRYING", label: "Drying" },
                        { value: "DRIED", label: "Dried" },
                        { value: "SOLD", label: "Sold" },
                        { value: "DESTROYED", label: "Destroyed" }
                      ]}
                    />
                  </div>
                </div>
              ) : null}

              <div className="form__form-group">
                <span className="form__form-group-label">Category *</span>
                <div className="form__form-group-field">
                  <Input type="select" defaultValue={this.state.product.category_id} ref={node => (this.inputCategoryID = node)} name="category_id" className={this.state.requiredCategoryId ? 'form-control-sm react-select fieldRequired' : 'form-control-sm react-select'} required>
                    {
                      this.state.categories.map((Value, Index) => <option value={Index} key={Value}>{Value}</option>)
                    }
                  </Input>
                  { /*<Field
                    name="category_id"
                    component={renderSelectField}
                    type="text"
                    required
                    ref={node => (this.inputCategoryID = node)}
                    options={[
                      { value: "FLOWER", label: "Flower" },
                      { value: "SHAKE", label: "Shake/Trim" },
                      { value: "EDIBLE", label: "Edibles" },
                      { value: "PLANT", label: "Plant" },
                      { value: "TINCTURE", label: "Tincture" },
                      { value: "TROPICAL", label: "Tropical" },
                      { value: "TRANS_DERMAL", label: "Trans-dermal Patch" },
                      { value: "EXTRACT", label: "Extract" },
                      { value: "CONCENTRATE", label: "Concentrates" },
                      { value: "CAPSULE", label: "Capsule" },
                      { value: "PRE_ROLL", label: "Pre-Rolls" },
                      {
                        value: "COMBINED_CATEGORY",
                        label: "Combined Category"
                      },
                      { value: "SUPPOSITORY", label: "Suppository" },
                      { value: "WASTE", label: "Waste" }
                    ]}
                  /> */}
                </div>
              </div>
              {/* <div className="form__form-group">
                <span className="form__form-group-label">
                  Weight Per Sellable Product
                </span>
                <div className="form__form-group-field">
                  <Input name="weight_per_sellable_product" defaultValue={this.state.product.weight} type="text" />
                </div>
              </div> */}
              <div className="form__form-group">
                <span className="form__form-group-label">
                  Price per Unit/Weight  *<span>(USD)</span>
                </span>
                <div className="form__form-group-field">
                  <Input
                    name="price_per_unit_weight"
                    defaultValue={this.state.product.price}
                    required
                    ref={node => (this.inputPricePerWeight = node)}
                    onBlur={(event)=>this.priceFloatThree(event)}
                  />
                </div>
              </div>
              { inventoryDivs }
              <div className="form__form-group">
                <div className="form__form-group-field">
                  <Button
                    color="secondry"
                    className="btn btn-secondary btn-generate"
                    type="button"
                    onClick={() => this.addInventoryFields(this.state.inventoryCount)}
                  >
                    Add Inventory
                  </Button>
                  <Button
                    color="secondry"
                    className="btn btn-secondary btn-generate"
                    type="button"
                    onClick={() => this.removeInventoryFields(this.state.inventoryCount)}
                  >
                    Remove Inventory
                  </Button>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">
                  Waste in Pounds
                </span>
                <div className="form__form-group-field">
                  <Field name="waste_in_pounds" component="input" type="text" />
                </div>
              </div>
            </Col>
            <ToastContainer autoClose={10000} />
            <div className="form_form-group">
              <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" className="btn-block" type="submit" disabled={this.state.formSubmitted}>
                  SAVE PRODUCT
                </Button>
              </ButtonToolbar>
            </div>
          </Row>
        </form>
      );
    }
    return type;
  }
}

function RelatedInventory(props) {
  const InventoryIdName = `subInventoryId-${props.index}`;
  const InventoryWeightType = `inventory_weight_type-${props.index}`;
  const InventoryQuantity = `inventory_quantity-${props.index}`;

  let inventoryId = 0;
  let inventoryWeightType = 0;
  let inventoryQuantity = 0;

  if (props.processorProductInventories) {
    console.log(props.processorProductInventories);
    inventoryId = props.processorProductInventories.inventory_id;
    inventoryWeightType = props.processorProductInventories.inventory_weight_type;
    inventoryQuantity = props.processorProductInventories.inventory_quantity;
  }

  return (
    <div className="ingredient_field-set" key={props.index}>
      <h4 className="text-center">Inventory - { props.index + 1 }</h4><br />
      <div className="form__form-group">
        <span className="form__form-group-label">Inventory</span>
        <div className="form__form-group-field">
          <Input type="select" name="inventory_id" defaultValue={inventoryId} id={InventoryIdName} className="form-control-sm react-select" >
            <option value="0">Select Ingredient</option>
            {
              props.allInventories.map(Value => <option value={Value.id} key={Value.id}>{Value.product_name}</option>)
            }
          </Input>
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">
          Inventory Weight Type
        </span>
        <div className="form__form-group-field">
          <Input type="select" name="inventory_weight_type" defaultValue={inventoryWeightType} id={InventoryWeightType} className="form-control-sm react-select" >
            <option value="00">Select Weight Type</option>
            {
              props.weightTypes.map((Value, Index) => <option value={Index} key={Value}>{Value}</option>)
            }
          </Input>
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Inventory Quantity</span>
        <div className="form__form-group-field">
          <Input name="inventory_quantity" defaultValue={inventoryQuantity} id={InventoryQuantity} type="number" min="0" />
        </div>
      </div>
    </div>
  );
}

function RelatedIngredient(props) {
  const IngredientIdName = `subInventoryId-${props.index}`;
  const IngredientWeightType = `ingredient_weight_type-${props.index}`;
  const IngredientQuantity = `ingredient_quantity-${props.index}`;

  let ingredientId = 0;
  let ingredientWeightType = 0;
  let ingredientQuantity = 0;

  if (props.inventoryIngredients) {
    ingredientId = props.inventoryIngredients.ingredient_id;
    ingredientWeightType = props.inventoryIngredients.ingredient_weight_type;
    ingredientQuantity = props.inventoryIngredients.ingredient_quantity;
  }
  // console.log(props.inventoryIngredients);
  return (
    <div className="ingredient_field-set" key={props.index}>
      <h4 className="text-center">Ingredient - { props.index + 1 }</h4><br />
      <div className="form__form-group">
        <span className="form__form-group-label">Ingredient</span>
        <div className="form__form-group-field">
          <Input type="select" name="subInventoryId" defaultValue={ingredientId} id={IngredientIdName} className="form-control-sm react-select">
            {
              props.allInventories.map(Value => <option value={Value.id} key={Value.id}>{Value.product_name}</option>)
            }
          </Input>
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Ingredient Weight Type</span>
        <div className="form__form-group-field">
          <Input type="select" name="ingredient_weight_type" defaultValue={ingredientWeightType} id={IngredientWeightType} className="form-control-sm react-select">
            {
              props.weightTypes.map((Value, Index) => <option value={Index} key={Value}>{Value}</option>)
            }
          </Input>
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Ingredient Quantity</span>
        <div className="form__form-group-field">
          <Input name="ingredient_quantity" defaultValue={ingredientQuantity} id={IngredientQuantity} type="number" min="0" />
        </div>
      </div>
    </div>
  );
}

export default reduxForm({
  form: "product_edit_form", // a unique identifier for this form
  initialValues: {
    serial: ""
  },
  enableReinitialize: true
})(ProductEditForm);
