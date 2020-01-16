/* eslint-disable */
import React, { PureComponent } from 'react';
import {
  Button, Input, Col,
} from 'reactstrap';
import { reduxForm } from 'redux-form';
import axios from 'axios';
import createHashHistory from 'history/createHashHistory';
import caution from '../../../../img/caution.png';
import Barcode from 'react-barcode';
// import { PDFViewer } from 'react-pdf';


class LabelForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      serial: '',
      error: false,
      msg: '',
      product: '',
      productID: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generatePdf = this.generatePdf.bind(this);
  }

  async componentDidMount() {
    this.setState({ loader: 'LOADING' });
    const parts = window.location.hash.split('/');
    const productID = parts.pop() || parts.pop();
    this.setState({ productID });
    const product = await this.getProduct(productID);
    this.setState({ product });
    this.setState({ loader: 'LOADED' });
  }

  getProduct = async (productID) => {
    let product = {};
    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const url = `${process.env.API_ENDPOINT}/products/labels/${productID}`;
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.data.error) {
        product = response.data.label;
        this.setState({ product: response.data.label });
        console.log(response);
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
    return product;
  }

  generatePdf() {
    const urls = `${process.env.API_FILE_ENDPOINT}/products/labels/download/${this.state.productID}`;
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
    const productName = this.refs.testForm.productName.value;
    const strainName = this.refs.testForm.strainName.value;
    const serialNumber = this.refs.testForm.serialNumber.value;
    const batchNumber = this.refs.testForm.batchNumber.value;
    const price = this.refs.testForm.price.value;
    const packageDate = this.refs.testForm.packageDate.value;
    const expiryDate = this.refs.testForm.expiryDate.value;
    const thcPercentage = this.refs.testForm.thcPercentage.value;
    const cbdPercentage = this.refs.testForm.cbdPercentage.value;

    const businessName = this.refs.testForm.businessName.value;
    const businessAddress = this.refs.testForm.businessAddress.value;
    const quantityOrWeightOfContents = this.refs.testForm.quantityOrWeightOfContents.value;
    const ingredientsList = this.refs.testForm.ingredientsList.value;
    const foodAllergenInfo = this.refs.testForm.foodAllergenInfo.value;
    const nutritionInfo = this.refs.testForm.nutritionInfo.value;
    const listOfCannabisIngredients = this.refs.testForm.listOfCannabisIngredients.value;
    const thcDosageInMgPerUnit = this.refs.testForm.thcDosageInMgPerUnit.value;
    const lotCode = this.refs.testForm.lotCode.value;
    const terpenoidPotency = this.refs.testForm.terpenoidPotency.value;
    // eslint-disable-next-line no-console
    const bodyFormData = new FormData();
    bodyFormData.append('productName', productName);
    bodyFormData.append('strainName', strainName);
    bodyFormData.append('serialNumber', serialNumber);
    bodyFormData.append('batchNumber', batchNumber);
    bodyFormData.append('price', price);
    bodyFormData.append('packageDate', packageDate);
    bodyFormData.append('expiryDate', expiryDate);
    bodyFormData.append('thcPercentage', thcPercentage);
    bodyFormData.append('cbdPercentage', cbdPercentage);

    bodyFormData.append('businessName', businessName);
    bodyFormData.append('businessAddress', businessAddress);
    bodyFormData.append('quantityOrWeightOfContents', quantityOrWeightOfContents);
    bodyFormData.append('ingredientsList', ingredientsList);
    bodyFormData.append('foodAllergenInfo', foodAllergenInfo);
    bodyFormData.append('nutritionInfo', nutritionInfo);
    bodyFormData.append('listOfCannabisIngredients', listOfCannabisIngredients);
    bodyFormData.append('thcDosageInMgPerUnit', thcDosageInMgPerUnit);
    bodyFormData.append('lotCode', lotCode);
    bodyFormData.append('terpenoidPotency', terpenoidPotency);

    const tokenStr = localStorage.getItem('cannave_token');
    const token = JSON.parse(tokenStr);
    const productID = this.state.productID;
    const urls = `${process.env.API_ENDPOINT}/products/labels/${productID}`;
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
        history.push(`/products/labels/${this.state.productID}`, { forceRefresh: true });
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

  render() {
    const { error, msg } = this.state;
    const { loader } = this.state;
    let type = null;
    if (loader === 'LOADING') {
      type = <div className="load__icon-wrap"><svg className="load__icon"><path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" /></svg> </div>;
    }
    if (loader === 'LOADED') {
      type = (
        <form className="form form form--horizontal" ref="testForm" onSubmit={this.handleSubmit}>
          <Col md={6} lg={6}>
            {error ? <div className="alert alert-danger"><strong>Error!</strong> {msg}</div> : null}
            <div className="form__form-group">
              <span className="form__form-group-label">Business Name</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.product.businessName} type="text" name="businessName" ref="businessName" />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Business Address</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.product.businessAdress} type="text" name="businessAddress" ref="businessAddress" />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Product Name</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.product.productName} type="text" name="productName" ref="productName" />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Qty/Weight of Contents</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.product.quantityOrWeightOfContents} type="text" name="quantityOrWeightOfContents" ref="quantityOrWeightOfContents" />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Ingredient List</span>
              <div className="form__form-group-field">
                <textarea defaultValue={this.state.product.ingredientsList} type="text" name="ingredientsList" ref="ingredientsList" />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Food Allergen Info</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.product.foodAllergenInfo} type="text" name="foodAllergenInfo" ref="foodAllergenInfo" />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Nutrition Information</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.product.nutritionInfo} type="text" name="nutritionInfo" ref="nutritionInfo" />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">List of Cannabis Ingredients</span>
              <div className="form__form-group-field">
                <textarea defaultValue={this.state.product.listOfCannabisIngredients} type="text" name="listOfCannabisIngredients" ref="listOfCannabisIngredients" />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Terpenoid Potency</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.product.terpenoidPotency} type="text" name="terpenoidPotency" ref="terpenoidPotency" />
              </div>
            </div>
          </Col>
          <Col md={6} lg={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">Price</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.product.price} type="text" name="price" ref="price" />
              </div>
            </div>
            <div className="form__form-group form__form-group-id">
              <span className="form__form-group-label">Serial Number</span>
              <div className="form__form-group-field">
                {
                  this.state.product.serialNumber ? <Input type="text" name="serialNumber" ref="serialNumber" value={this.state.product.serialNumber} /> : <Input defaultValue={this.state.product.serialNumber} type="text" name="serialNumber" ref="serialNumber" />
                }
              </div>
            </div>
            <div className="form__form-group form__form-group-id">
              <span className="form__form-group-label">Batch Number</span>
              <div className="form__form-group-field">
                {
                  this.state.product.batchNumber ? <Input type="text" name="batchNumber" ref="batchNumber" value={this.state.product.batchNumber} /> : <Input defaultValue={this.state.product.batchNumber} type="text" name="batchNumber" ref="batchNumber" />
                }
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Strain Name</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.product.strainName} type="text" name="strainName" ref="strainName" />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">THC dosage In Mg/Unit</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.product.thcDosageInMgPerUnit} type="text" name="thcDosageInMgPerUnit" ref="thcDosageInMgPerUnit" />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Lot Code</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.product.lotCode} type="text" name="lotCode" ref="lotCode" />
              </div>
            </div>
            <div className="form__form-group form__form-group-id">
              <span className="form__form-group-label">Packaged Date</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.product.packageDate} type="date" ref="packageDate" name="packageDate" />
              </div>
            </div>
            <div className="form__form-group form__form-group-id">
              <span className="form__form-group-label">Expiry Date</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.product.expiryDate} type="date" ref="expiryDate" name="expiryDate" />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">CBD %</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.product.cbdPercentage} type="text" name="cbdPercentage" ref="cbdPercentage" />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">THC %</span>
              <div className="form__form-group-field">
                <Input defaultValue={this.state.product.thcPercentage} type="text" name="thcPercentage" ref="thcPercentage" />
              </div>
            </div>

          </Col>
          <Col md={12} lg={12}>
            <p><b>Caution</b>: Women should not use marijuana or medical marijuana during pregnancy because of the risk of health defects or while breastfeeding. Keep out of reach of children. For accidental ingestion call 1-800-222-1222</p>
            <p><b>NB</b>: This product has been tested for contaminants</p>
          </Col>
          <Col md={3} lg={3}>
            <div className="form__form-group">
              <Barcode height="58px" value={this.state.product.serialNumber} />
            </div>
          </Col>
          <Col md={3} lg={3}>
            <div className="form__form-group">
              <Barcode height="58px" value={this.state.product.batchNumber} />
            </div>
          </Col>
          <Col md={3} lg={3}>
            <img src={caution} alt="Cann Warning" />
          </Col>
          <Col md={3} lg={3}>
            <div className="form_form-group">
              {/* <ButtonToolbar className="form__button-toolbar"> */}
              <Button color="primary" className="btn-block" type="submit">UPDATE LABEL DETAILS</Button>
              <Button color="primary" onClick={() => this.generatePdf()} className="btn-block">DOWNLOAD LABEL</Button>
              {/* </ButtonToolbar> */}
            </div>
          </Col>
        </form >
      );
    }
    return type;
  }
}

export default reduxForm({
  form: 'plant_add_form',
  enableReinitialize: true,
})(LabelForm);
