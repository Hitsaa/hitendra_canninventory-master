/* eslint-disable */
import React, { PureComponent } from 'react';
import {
  Button, ButtonToolbar, Col, Row, Input,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
// import PropTypes from 'prop-types';
import renderSelectField from '../../../../shared/components/form/Select';

class InventoryAddForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      error: false,
      msg: '',
      serial: '',
      batch: '',
      lot: '',
      inventories: '',
      categories: '',
      weightTypes: '',
      suppliers: [],
      inputLinkClicked: false,
      ingredientCount: 1,
      formSubmitted: false,
      requiredProductName: false,
      requiredQuantity: false,
      requiredWeightType: false,
      requiredCategoryId: false,
      requiredPricePerQuantityWeight: false,
      selectedManufacturer: "",
      businessLicense:"",
      loggedInUser: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateSerial = this.generateSerial.bind(this);
    this.addIngredientFields = this.addIngredientFields.bind(this);
    this.removeIngredientFields = this.removeIngredientFields.bind(this);
    this.changeBusinessName = this.changeBusinessName.bind(this);
  }

  async componentDidMount() {
    this.setState({ loader: 'LOADING' });
    const user = localStorage.getItem("cannave_user");
    if (user !== null && user !== "" && user !== undefined) {
      if (JSON.parse(user)) {
        const paresedUser = JSON.parse(user);
        this.setState({ loggedInUser: paresedUser });
        await this.createInventory();
      }}
       
    this.setState({ loader: 'LOADED' });
    // this.setState({ serial: this.generateSerial('serial'), batch: this.generateSerial('batch'), lot: this.generateSerial('lot') });
  }

  createInventory = async () => {
    // let inventory = {};
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT_LOC}/inventory-create`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      // if (!response.data.error) {
      this.setState({
        inventories: response.data[0],
        categories: response.data[1],
        weightTypes: response.data[2],
        suppliers: response.data[3],
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
    // return inventory;
  }

  /* eslint-disable class-methods-use-this */
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

  
  changeBusinessName(event) {
    console.log('selected manufaturere',event);
    //Checked logged in user
    const userId = event.target.value;
    console.log('selected manufaturere',event.target.value);
    if(userId == this.state.loggedInUser.id){
      this.state.selectedManufacturer = this.state.loggedInUser;
      this.state.businessLicense = this.state.loggedInUser.businessLicenseNumber;
      // this.setState({
      //   selectedManufacturer: this.state.loggedInUser
      // });
    }else{
      const user = this.state.suppliers.filter(u => u.id == userId);
      this.state.selectedManufacturer = user[0];
      this.state.businessLicense = user[0].businessLicenseNumber;
      this.setState({
        selectedManufacturer: user[0]
      });
    }
    console.log('updated',this.state.selectedManufacturer);
    console.log('license',this.state.businessLicense);

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
    const productName = this.refs.InventoryAddForm.product_name.value;
    const quantity = this.refs.InventoryAddForm.quantity.value;
    const description = this.refs.InventoryAddForm.description.value;
    const weightType = this.refs.InventoryAddForm.weight_type.value;
    const category = this.refs.InventoryAddForm.category.value;
    const sellerLicense = this.state.selectedManufacturer.businessLicenseNumber;
    const batch = this.refs.InventoryAddForm.batch.value;
    const serial = this.refs.InventoryAddForm.serial.value;
    const lot = this.refs.InventoryAddForm.lot.value;
    const pricePerQuantityWeight = this.refs.InventoryAddForm.price_per_quantity_weight.value;
    const wasteInPounds = this.refs.InventoryAddForm.waste_in_pounds.value;
    const subInventoryIds = this.refs.InventoryAddForm.subInventoryId;
    const ingredientWeightTypes = this.refs.InventoryAddForm.ingredient_weight_type;
    const ingredientQuantities = this.refs.InventoryAddForm.ingredient_quantity;
    // const description = this.refs.InventoryAddForm.description.value;
    // eslint-disable-next-line no-console

    // console.log(ingredientWeightTypes, ingredientQuantities);

    if (productName) {
      // eslint-disable-next-line no-console
      const bodyFormData = new FormData();
      bodyFormData.append('product_name', productName);
      bodyFormData.append('quantity', quantity);
      bodyFormData.append('description', description);
      bodyFormData.append('weight_type', weightType);
      bodyFormData.append('category_id', category);
      bodyFormData.append('seller_license', sellerLicense);
      bodyFormData.append('batch', batch);
      bodyFormData.append('serial', serial);
      bodyFormData.append('lot', lot);
      bodyFormData.append('price_per_quantity_weight', pricePerQuantityWeight);
      bodyFormData.append('waste_in_pounds', wasteInPounds);

      if (typeof ingredientQuantities.length !== 'undefined') {
        for (let i = 0; i < subInventoryIds.length; i += 1) {
          // eslint-disable-next-line no-lonely-if
          if (subInventoryIds[i].value !== '0') {
            // bodyFormData.append(`inventory_ingredients[${i}][inventory_id]`, 9);
            bodyFormData.append(`inventory_ingredients[${i}][ingredient_id]`, subInventoryIds[i].value);
            bodyFormData.append(`inventory_ingredients[${i}][ingredient_weight_type]`, ingredientWeightTypes[i].value);
            bodyFormData.append(`inventory_ingredients[${i}][ingredient_quantity]`, ingredientQuantities[i].value);
          }
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (subInventoryIds.value !== '0') {
          bodyFormData.append('inventory_ingredients[0][ingredient_id]', subInventoryIds.value);
          bodyFormData.append('inventory_ingredients[0][ingredient_weight_type]', ingredientWeightTypes.value);
          bodyFormData.append('inventory_ingredients[0][ingredient_quantity]', ingredientQuantities.value);
        } else {
          bodyFormData.append('inventory_ingredients[0][ingredient_id]', 'null');
          bodyFormData.append('inventory_ingredients[0][ingredient_weight_type]', 'null');
          bodyFormData.append('inventory_ingredients[0][ingredient_quantity]', 'null');
        }
      }
      // console.log(bodyFormData);
      const tokenStr = localStorage.getItem('cannave_token');
      const token = JSON.parse(tokenStr);
      const urls = `${process.env.API_ENDPOINT_LOC}/inventory-store`;
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
        }
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
    } else {
      this.setState({
        formSubmitted: false,
        error: true,
        msg: 'Product Name is required!',
      });
      toast.error('Please enter a valid product name!');
      this.setState({ requiredProductName: true });
    }
  }


  render() {
    const { error, msg } = this.state;
    const { loader } = this.state;
    let type = null;
    if (loader === 'LOADING') {
      type = <div className="load__icon-wrap"><svg className="load__icon"><path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg> </div>;
    }
    if (loader === 'LOADED') {
      const ingredientDivs = [];

      for (let i = 0; i < this.state.ingredientCount; i += 1) {
        ingredientDivs.push(<RelatedIngredient key={i} weightTypes={this.state.weightTypes} allInventories={this.state.inventories} index={i} />);
      }
      type = (
        <form className="form form form--horizontal" ref="InventoryAddForm" onSubmit={this.handleSubmit}>
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
                  <Field name="product_name" component="input" type="text" className={this.state.requiredProductName ? 'fieldRequired' : ''} required />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Quantity *</span>
                <div className="form__form-group-field">
                  <Field
                    name="quantity"
                    component="input"
                    type="number"
                    required
                    className={this.state.requiredQuantity ? 'fieldRequired' : ''}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Weight Type *</span>
                <div className="form__form-group-field">
                  <Input type="select" name="weight_type" className={this.state.requiredWeightType ? 'form-control-sm react-select fieldRequired' : 'form-control-sm react-select'} required>
                    {
                      this.state.weightTypes.map((Value, Index) => <option value={Index} key={Value}>{Value}</option>)
                    }
                  </Input>
                </div>
              </div>
            </Col>
            <Col sm={12} md={6} lg={6} xl={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">Category *</span>
                <div className="form__form-group-field">
                  <Input type="select" name="category" className={this.state.requiredCategoryId ? 'form-control-sm react-select fieldRequired' : 'form-control-sm react-select'} required>
                    {
                      this.state.categories.map((Value, Index) => <option value={Index} key={Value}>{Value}</option>)
                    }
                  </Input>
                </div>
              </div>
              <div className="form__form-group form__form-group-id">
                <span className="form__form-group-label">Description</span>
                <div className="form__form-group-field">
                  {
                    <Input type="textarea" name="description" />
                  }
                </div>
              </div>
              <div className="form__form-group">
                  <span className="form__form-group-label">Business Name</span>
                  <div className="form__form-group-field">
                      <Input
                        type="select"
                        name="business_name"
                        required
                        ref={node => (this.inputBusinessName = node)}
                        onChange={this.changeBusinessName}
                        
                        className="form-control-sm react-select"
                      >
                         <option value="">
                            Select Business
                          </option>
                        <option value={this.state.loggedInUser.id} >
                            My Business
                          </option>
                        {this.state.suppliers.map((r, i) => (
                          <option value={r.id} key={i}>
                            {r.businessName}
                          </option>
                        ))}
                      </Input>
                  </div>
                </div>
              {/* <div className="form__form-group form__form-group-id">
                <span className="form__form-group-label">Manufacturer License #</span>
                <div className="form__form-group-field">
                  <Input
                    type="select"
                    name="seller_license"
                    className="form-control-sm react-select"
                  >
                    {this.state.suppliers.map((Value, Index) => (
                      <option value={Index} key={Value}>
                        {Value.businessName}
                      </option>
                    ))}
                  </Input>
                </div>
              </div> */}
              <div className="form__form-group">
                <span className="form__form-group-label">Batch #</span>
                <div className="form__form-group-field">
                  <Input name="batch" defaultValue={this.state.batch} type="text" onChange={event => this.inputChangedHandler(event, 'batch')} />
                  <Button
                    color="secondry"
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
                  <Input name="serial" defaultValue={this.state.serial} type="text" onChange={event => this.inputChangedHandler(event, 'serial')} />
                  <Button
                    color="secondry"
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
                  <Input name="lot" defaultValue={this.state.lot} type="text" onChange={event => this.inputChangedHandler(event, 'lot')} />
                  <Button
                    color="secondry"
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
                  Price per Quantity/Weight  *<span>USD</span>
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
                  <Field name="price_per_quantity_weight" component="input" type="number" className={this.state.requiredPricePerQuantityWeight ? 'fieldRequired' : ''} required />
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
                  <Field name="waste_in_pounds" component="input" type="text" />
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
                    CREATE INVENTORY
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
  return (
    <div className="ingredient_field-set" key={props.index}>
      <h4 className="text-center">Ingredient - { props.index + 1 }</h4><br />
      <div className="form__form-group">
        <span className="form__form-group-label">Ingredient</span>
        <div className="form__form-group-field">
          <Input type="select" name="subInventoryId" id={IngredientIdName} className="form-control-sm react-select">
            <option value="0">Select Ingredient</option>
            {
              props.allInventories.map(Value => <option value={Value.id} key={Value.id}>{Value.product_name}</option>)
            }
          </Input>
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">
          Ingredient Weight Type
        </span>
        <div className="form__form-group-field">
          <Input type="select" name="ingredient_weight_type" id={IngredientWeightType} className="form-control-sm react-select">
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
          <Input name="ingredient_quantity" id={IngredientQuantity} type="number" min="0" />
        </div>
      </div>
    </div>
  );
}

export default reduxForm({
  form: 'inventory_add_form', // a unique identifier for this form
})(InventoryAddForm);
