/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable default-case */
/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import {
  Button, ButtonToolbar, Col, Row, Input, FormFeedback,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import renderSelectField from '../../../../shared/components/form/Select';

class InventoryEditForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      error: false,
      msg: '',
      serial: '',
      batch: '',
      lot: '',
      inventory: '',
      inventoryID: '',
      categories: '',
      weight_types: '',
      suppliers: [],
      allInventories: '',
      inputLinkClicked: false,
      ingredientCount: 1,
      formSubmitted: false,
      requiredProductName: false,
      requiredQuantity: false,
      requiredWeightType: false,
      requiredCategoryId: false,
      requiredPricePerQuantityWeight: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateSerial = this.generateSerial.bind(this);
    this.addIngredientFields = this.addIngredientFields.bind(this);
    this.removeIngredientFields = this.removeIngredientFields.bind(this);
    this.state = { serial: this.generateSerial('serial'), batch: this.generateSerial('batch'), lot: this.generateSerial('lot') };
    // this.state.batch = this.generateSerial('batch');
    // this.state.lot = this.generateSerial('lot');
    // this.setState({ serial: this.generateSerial('serial'), batch: this.generateSerial('batch'), lot: this.generateSerial('lot') });
  }

  async componentDidMount() {
    this.setState({ loader: 'LOADING' });
    const parts = window.location.hash.split('/');
    const inventoryID = parts.pop() || parts.pop();
    this.setState({ inventoryID });
    const inventory = await this.getInventory(inventoryID);
    this.setState({ inventory });
    this.setState({
      loader: 'LOADED',
      serial: inventory.serial,
      batch: inventory.batch,
      lot: inventory.lot,
    });
  }

  getInventory = async (inventoryID) => {
    let inventory = {};
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT_LOC}/inventory-edit/${inventoryID}`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      // if (!response.data.error) {
      inventory = response.data[0];
      if (inventory.inventory_ingredients.length > 0) {
        this.setState({ ingredientCount: inventory.inventory_ingredients.length });
      } else {
        this.setState({ ingredientCount: 1 });
      }
      this.setState({
        inventory: response.data[0],
        categories: response.data[1],
        weight_types: response.data[2],
        allInventories: response.data[3],
        suppliers: response.data[4],
      });
      // console.log(response.data.product);
      // } else {
      // this.setState({
      // error: true,
      // msg: response.data.message,
      // });
      // }
    }).catch((error) => {
      this.setState({
        error: true,
        msg: error.message,
      });
    });
    return inventory;
  }

  generateSerial(param) {
    const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const serialLength = 10;
    let randomSerial = '';
    let randomNumber = 0;
    for (let i = 0; i < serialLength; i += 1) {
      randomNumber = Math.floor(Math.random() * chars.length);
      randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }
    // console.log(param, randomSerial);
    if (param === 'serial') {
      randomSerial = `SN${randomSerial}`;
      this.setState({ serial: randomSerial });
    } else if (param === 'batch') {
      randomSerial = `B${randomSerial}`;
      this.setState({ batch: randomSerial });
    } else if (param === 'lot') {
      randomSerial = `L${randomSerial}`;
      this.setState({ lot: randomSerial });
    }
    return randomSerial;
  }

  addIngredientFields(ingredientCount) {
    this.setState({ ingredientCount: ingredientCount + 1 });
  }

  removeIngredientFields(ingredientCount) {
    if (ingredientCount > 1) {
      this.setState({ ingredientCount: ingredientCount - 1 });
    }
  }

  handleAddSecondInput() {
    this.setState({
      inputLinkClicked: true,
    });
  }

  inputChangedHandler(event, state) {
    if (state === 'batch') {
      this.setState({ batch: event.target.value });
    } else if (state === 'serial') {
      this.setState({ serial: event.target.value });
    } else if (state === 'lot') {
      this.setState({ lot: event.target.value });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const id = this.state.inventoryID;
    const productName = this.refs.InventoryEditForm.product_name.value;
    const quantity = this.refs.InventoryEditForm.quantity.value;
    const description = this.refs.InventoryEditForm.description.value;
    const weightType = this.refs.InventoryEditForm.weight_type.value;
    const category = this.refs.InventoryEditForm.category.value;
    // const sellerLicense = this.refs.InventoryEditForm.seller_license.value;
    const batch = this.refs.InventoryEditForm.batch.value;
    const serial = this.refs.InventoryEditForm.serial.value;
    const lot = this.refs.InventoryEditForm.lot.value;
    const pricePerQuantityWeight = this.refs.InventoryEditForm.price_per_quantity_weight.value;
    const wasteInPounds = this.refs.InventoryEditForm.waste_in_pounds.value;
    const subInventoryIds = this.refs.InventoryEditForm.subInventoryId;
    const ingredientWeightTypes = this.refs.InventoryEditForm.ingredient_weight_type;
    const ingredientQuantities = this.refs.InventoryEditForm.ingredient_quantity;
    const inventoryID = this.state.inventoryID;

    // eslint-disable-next-line no-console
    const bodyFormData = new FormData();
    // bodyFormData.append('id', id);
    bodyFormData.append('product_name', productName);
    bodyFormData.append('quantity', quantity);
    bodyFormData.append('description', description);
    bodyFormData.append('weight_type', weightType);
    bodyFormData.append('category_id', category);
    // bodyFormData.append('seller_license', sellerLicense);
    bodyFormData.append('batch', batch);
    bodyFormData.append('serial', serial);
    bodyFormData.append('lot', lot);
    bodyFormData.append('price_per_quantity_weight', pricePerQuantityWeight);
    bodyFormData.append('waste_in_pounds', wasteInPounds);
    if (typeof ingredientQuantities.length !== 'undefined') {
      for (let i = 0; i < subInventoryIds.length; i += 1) {
        // eslint-disable-next-line no-lonely-if
        if (subInventoryIds[i].value !== '0') {
          bodyFormData.append(`inventory_ingredients[${i}][inventory_id]`, inventoryID);
          bodyFormData.append(`inventory_ingredients[${i}][ingredient_id]`, subInventoryIds[i].value);
          bodyFormData.append(`inventory_ingredients[${i}][ingredient_weight_type]`, ingredientWeightTypes[i].value);
          bodyFormData.append(`inventory_ingredients[${i}][ingredient_quantity]`, ingredientQuantities[i].value);
        }
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (subInventoryIds.value !== '0') {
        bodyFormData.append('inventory_ingredients[0][inventory_id]', inventoryID);
        bodyFormData.append('inventory_ingredients[0][ingredient_id]', subInventoryIds.value);
        bodyFormData.append('inventory_ingredients[0][ingredient_weight_type]', ingredientWeightTypes.value);
        bodyFormData.append('inventory_ingredients[0][ingredient_quantity]', ingredientQuantities.value);
      } else {
        bodyFormData.append('inventory_ingredients[0][inventory_id]', 'null');
        bodyFormData.append('inventory_ingredients[0][ingredient_id]', 'null');
        bodyFormData.append('inventory_ingredients[0][ingredient_weight_type]', 'null');
        bodyFormData.append('inventory_ingredients[0][ingredient_quantity]', 'null');
      }
    }

    // if (businessName && phoneNumber && zip && city
    // && state && address && businessLicense && emailAddress) {
    // eslint-disable-next-line no-console
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const urls = `${process.env.API_ENDPOINT_LOC}/inventory-update/${inventoryID}`;
    this.setState({ formSubmitted: true });
    axios({
      method: 'post',
      url: urls,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      this.setState({ formSubmitted: false });
      if (!response.data.error) {
        const history = createHashHistory();
        history.push('/inventory/list', { forceRefresh: true });
      } else {
        this.setState({
          formSubmitted: false,
          error: true,
          msg: response.data.message,
        });
        // toast.error(response.data.message); // Toast error notification
      }
      // console.log(bodyFormData);
      // console.log(response);
    }).catch((error) => {
      this.setState({
        formSubmitted: false,
        error: true,
        msg: error.response.data.message,
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
        if (field === 'price_per_quantity_weight') {
          this.setState({ requiredPricePerQuantityWeight: true });
        }
        return true;
      });
    });
    // }
  }

  render() {
    const { error, msg } = this.state;
    // console.log(this.state.inventory.product_name);
    const { loader } = this.state;
    let type = null;
    if (loader === 'LOADING') {
      type = <div className="load__icon-wrap"><svg className="load__icon"><path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg> </div>;
    }
    if (loader === 'LOADED') {
      const ingredientDivs = [];
      // console.log(this.state.inventory.inventory_ingredients[0]);
      for (let i = 0; i < this.state.ingredientCount; i += 1) {
        ingredientDivs.push(<RelatedIngredient key={i} inventoryIngredients={this.state.inventory.inventory_ingredients[i]} weightTypes={this.state.weight_types} allInventories={this.state.allInventories} index={i} />);
      }
      // console.log(ingredientDivs);
      type = (
        <form className="form form form--horizontal" ref="InventoryEditForm" onSubmit={this.handleSubmit}>
          {error ? (
            <div className="alert alert-danger">
              <strong>Error!</strong> {msg}
            </div>
          ) : null}
          <Row>
            <Col sm={12} md={6} lg={6} xl={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">Product Name *</span>
                <div className="form__form-group-field">
                  {
                    this.state.inventory.product_name ? <Input required defaultValue={this.state.inventory.product_name} type="text" name="product_name" className={this.state.requiredProductName ? 'fieldRequired' : ''} /> : <Input name="product_name" value="N/A" className={this.state.requiredProductName ? 'fieldRequired' : ''} required />
                  }
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Quantity *</span>
                <div className="form__form-group-field">
                  {
                    this.state.inventory.quantity ? <Input defaultValue={this.state.inventory.quantity} type="number" name="quantity" required className={this.state.requiredQuantity ? 'fieldRequired' : ''} /> : <Input name="quantity" type="number" className={this.state.requiredQuantity ? 'fieldRequired' : ''} required />
                  }
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Weight Type *</span>
                <div className="form__form-group-field">
                  <Input type="select" name="weight_type" className={this.state.requiredWeightType ? 'form-control-sm react-select fieldRequired' : 'form-control-sm react-select'} defaultValue={this.state.inventory.weight_type} required>
                    {
                      this.state.weight_types.map((Value, Index) => <option value={Index} key={Value}>{Value}</option>)
                    }
                  </Input>
                  { /* <Field
                    name="weight_type"
                    component={renderSelectField}
                    type="text"
                    required
                    options={[
                      { value: 'pounds', label: 'POUNDS' },
                      { value: 'grams', label: 'GRAMS' },
                      { value: 'ounces', label: 'OUNCES' },
                      { value: 'fluid ounces', label: 'FLUID_OUNCES' },
                      { value: 'mililitres', label: 'MILILITRES' },
                      { value: 'miligrams', label: 'MILIGRAMS' },
                      { value: 'unit', label: 'UNIT' },
                    ]}
                  /> */ }
                </div>
              </div>
            </Col>
            <Col sm={12} md={6} lg={6} xl={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">Category *</span>
                <div className="form__form-group-field">
                  <Input type="select" name="category" className={this.state.requiredCategoryId ? 'form-control-sm react-select fieldRequired' : 'form-control-sm react-select'} defaultValue={this.state.inventory.category_id} required>
                    {
                      this.state.categories.map((Value, Index) => <option value={Index} key={Value}>{Value}</option>)
                    }
                  </Input>
                  { /* <Field
                    name="category"
                    component={renderSelectField}
                    type="text"
                    required
                    options={[
                      { value: 'flower', label: 'FLOWER' },
                      { value: 'shake', label: 'SHAKE' },
                      { value: 'immature plant', label: 'IMMATURE PLANT' },
                      { value: 'mature plant', label: 'MATURE PLANT' },
                      { value: 'edibles', label: 'EDIBLES' },
                      { value: 'tincture', label: 'TINCTURE' },
                      { value: 'topical', label: 'TOPICAL' },
                      { value: 'terms-dermal patch', label: 'TRANS-DERMAL PATCH' },
                      { value: 'extract', label: 'EXTRACT' },
                      { value: 'concentrate', label: 'CONCENTRATE' },
                      { value: 'capsule', label: 'CAPSULE' },
                      { value: 'pre-rolls', label: 'PRE-ROLLS' },
                      { value: 'suppository', label: 'SUPPOSITORY' },
                      { value: 'ancillary', label: 'ANCILLARY' },
                      { value: 'waste', label: 'WASTE' },
                    ]}
                  /> */ }
                </div>
              </div>
              <div className="form__form-group form__form-group-id">
                <span className="form__form-group-label">Description</span>
                <div className="form__form-group-field">
                  {
                    this.state.inventory.description ? <Input defaultValue={this.state.inventory.description} type="textarea" name="description" /> : <Input name="description" type="text" />
                  }
                </div>
              </div>
              <div className="form__form-group form__form-group-id">
                <span className="form__form-group-label"> Manufacturer License #</span>
                <div className="form__form-group-field">
                  <Input
                    type="select"
                    name="seller_license"
                    defaultValue={this.state.inventory.seller_license}
                    className="form-control-sm react-select"
                  >
                    {this.state.suppliers.map((Value, Index) => (
                      <option value={Index} key={Value}>
                        {Value.businessName}
                      </option>
                    ))}
                  </Input>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Batch #</span>
                <div className="form__form-group-field">
                  {
                    <Input value={this.state.batch} type="text" name="batch" onChange={event => this.inputChangedHandler(event, 'batch')} />
                  }
                  <Button
                    color="secondary"
                    className="btn btn-secondary btn-generate"
                    type="button"
                    onClick={() => this.generateSerial('batch')}
                  >
                    GENERATE
                  </Button>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Serial #</span>
                <div className="form__form-group-field">
                  {
                    <Input value={this.state.serial} type="text" name="serial" onChange={event => this.inputChangedHandler(event, 'serial')} />
                  }
                  <Button
                    color="secondary"
                    className="btn btn-secondary btn-generate"
                    type="button"
                    onClick={() => this.generateSerial('serial')}
                  >
                    GENERATE
                  </Button>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Lot #</span>
                <div className="form__form-group-field">
                  {
                    this.state.lot ? <Input value={this.state.lot} type="text" name="lot" onChange={event => this.inputChangedHandler(event, 'lot')} /> : <Input type="text" name="lot" />
                  }
                  <Button
                    color="secondary"
                    className="btn btn-secondary btn-generate"
                    type="button"
                    onClick={() => this.generateSerial('lot')}
                  >
                    GENERATE
                  </Button>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label serial_label">
                  Price per Quantity/Weight <span>USD</span>
                </span>
                <Tooltip
                  disableFocusListener
                  title="Your purchase price per unit or measurement."
                >
                  <IconButton aria-label="help" className="serial_but">
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
                <div className="form__form-group-field serial_int">
                  {
                    this.state.inventory.price_per_quantity_weight ? <Input defaultValue={this.state.inventory.price_per_quantity_weight} type="number" name="price_per_quantity_weight" className={this.state.requiredPricePerQuantityWeight ? 'fieldRequired' : ''} required /> : <Input name="price_per_quantity_weight" type="number" className={this.state.requiredPricePerQuantityWeight ? 'fieldRequired' : ''} required />
                  }
                </div>
              </div>
              { ingredientDivs }
              <div className="form__form-group">
                <div className="form__form-group-field">
                  <Button
                    color="secondry"
                    className="btn btn-secondary btn-generate"
                    type="button"
                    onClick={() => this.addIngredientFields(this.state.ingredientCount)}
                  >
                    Add Ingredient
                  </Button>
                  <Button
                    color="secondry"
                    className="btn btn-secondary btn-generate"
                    type="button"
                    onClick={() => this.removeIngredientFields(this.state.ingredientCount)}
                  >
                    Remove Ingredient
                  </Button>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Waste in Pounds</span>
                <div className="form__form-group-field">
                  {
                    this.state.inventory.waste_in_pounds ? <Input defaultValue={this.state.inventory.waste_in_pounds} type="text" name="waste_in_pounds" /> : <Input name="waste_in_pounds" type="text" />
                  }
                </div>
              </div>

              {this.state.inputLinkClicked ? (
                <Field name="waste_pounds" component="input" type="text" />
              ) : (
                <div />
              )}
            </Col>
            <Col sm={12} md={6} lg={6} xl={6}>
              <ToastContainer autoClose={10000} />
              <div className="form_form-group">
                <ButtonToolbar className="form__button-toolbar">
                  <Button color="primary" className="btn-block" type="submit" disabled={this.state.formSubmitted}>
                    SAVE INVENTORY
                  </Button>
                </ButtonToolbar>
              </div>
            </Col>
          </Row>
        </form>
      );
    }
    return type;
  }
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
          <Input type="select" name="subInventoryId" defaultValue={ingredientId} id={IngredientIdName} className="form-control-sm react-select" required>
            <option value="0">Select Ingredient</option>
            {
              props.allInventories.map(Value => <option value={Value.id} key={Value.id}>{Value.product_name}</option>)
            }
          </Input>
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Ingredient Weight Type</span>
        <div className="form__form-group-field">
          <Input type="select" name="ingredient_weight_type" defaultValue={ingredientWeightType} id={IngredientWeightType} className="form-control-sm react-select" required>
            <option value="0">Select Weight Type</option>
            {
              props.weightTypes.map((Value, Index) => <option value={Index} key={Value}>{Value}</option>)
            }
          </Input>
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Ingredient Quantity</span>
        <div className="form__form-group-field">
          <Input name="ingredient_quantity" defaultValue={ingredientQuantity} id={IngredientQuantity} type="number" min="0" required />
        </div>
      </div>
    </div>
  );
}

export default reduxForm({
  form: 'inventory_edit_form', // a unique identifier for this form
  enableReinitialize: true,
})(InventoryEditForm);
