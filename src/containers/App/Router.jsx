/* eslint-disable react/jsx-closing-bracket-location */

import React from 'react';

import {
  Route, Switch, withRouter, Redirect,
} from 'react-router-dom';

import MainWrapper from './MainWrapper';
import Layout from '../Layout/index';

import LogIn from '../Account/LogIn/index';
import ChangePassword from '../Account/ChangePassword';
import Register from '../Account/Register/index';

import ProductsList from '../Product/ProductsList/index';
import ProductAdd from '../Product/ProductAdd';
import ProductUpload from '../Product/ProductUpload';
// import Product from '../Product/Product/index';

import UsersList from '../User/UsersList/index';

import CategoriesList from '../Category/CategoriesList/index';
import CategoryAdd from '../Category/CategoryAdd';

import PlantsList from '../Plant/PlantsList/index';
import PlantAdd from '../Plant/PlantAdd';
import PlantUpload from '../Plant/PlantUpload';
import PlantEdit from '../Plant/PlantEdit';

import InventoryList from '../Inventory/InventoryList/index';
import InventoryAdd from '../Inventory/InventoryAdd/index';
import InventoryEdit from '../Inventory/InventoryEdit/index';

import ProductsProssList from '../ProductsPross/ProductsProssList/index';
import ProductsProssAdd from '../ProductsPross/ProductsProssAdd/index';
import ProductsProssEdit from '../ProductsPross/ProductsProssEdit/index';

import DefaultDashboard from '../Dashboard/index';

import BusinessList from '../Business/BusinessList';

import CustomersList from '../Customer/CustomersList';
import CustomerAdd from '../Customer/CustomerAdd';
import ClientsList from '../Client/ClientsList';
import ClientAdd from '../Client/ClientAdd';

import Summary from '../Report/Summary';
import BusinessAdd from '../Business/BusinessAdd';
import BatchList from '../Plant/BatchList';
import ResetPassword from '../Account/ResetPassword';
import ForgotPassword from '../Account/ForgotPassword';
import ProductEdit from '../Product/ProductEdit';
import BatchDetailList from '../Plant/BatchDetailList';

import ClientUpload from '../Client/ClientUpload';
import BusinessUpload from '../Business/BusinessUpload';
import CustomerUpload from '../Customer/CustomerUpload';
import BatchAdd from '../Plant/BatchAdd';
import CustomerEdit from '../Customer/CustomerEdit';
import ClientEdit from '../Client/ClientEdit';
import BatchEdit from '../Plant/BatchEdit';
// POS
import Pos from '../Pos/Pos';
import AddtoCart from '../Pos/AddtoCart';
import PlantCart from '../Pos/PlantCart';
import ManagePos from '../Pos/managePOS';
// import POSPlantsList from '../Pos/PlantPOS/PlantsList';
import ClientSelection from '../Pos/PlantCart/ClientSelection';
import checkoutHistory from '../Pos/Checkouts/components/checkoutHistory';
import marketplace from '../marketplace/markethome';
import MarketPlaceCart from '../marketplace/markethome/components/MarketPlaceCart';
import TermsOfService from '../Account/TermsOfService';

// import marketplace from '../marketplace/markethome';
// import MarketPlaceCart from '../marketplace/markethome/components/MarketPlaceCart';
import Label from '../Label/Label';
import PlantLabel from '../Label/PlantLabel';
import ProductInvoice from '../Pos/AddtoCart/components/ProductInvoice';
import Tax from '../Tax/Tax';
import WizardForm from '../WizardForm1/index';

import SupplierEdit from '../Supplier/SupplierEdit';
import SupplierAdd from '../Supplier/SupplierAdd';
import SuppliersList from '../Supplier/SuppliersList';

// eslint-disable-next-line import/no-unresolved

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path="/dashboard" component={DefaultDashboard} />
      <Route path="/users/list" component={UsersList} />
      <Route path="/change_password" component={ChangePassword} />
      <Route path="/batches/list" component={BatchList} />
      <Route path="/batches/details/:id" component={BatchDetailList} />
      <Route path="/batches/add" component={BatchAdd} />
      <Route path="/lab/tests" component={WizardForm} />
      <Route path="/plants/list" component={PlantsList} />
      <Route path="/plants/add/:id" component={PlantAdd} />
      <Route path="/plants/upload" component={PlantUpload} />
      <Route path="/plants/details/:id" component={PlantEdit} />

      <Route path="/inventory/list" component={InventoryList} />
      <Route path="/inventory/add" component={InventoryAdd} />
      <Route path="/inventory/details/:id" component={InventoryEdit} />

      <Route path="/productsprocessor/list" component={ProductsProssList} />
      <Route path="/productsprocessor/add" component={ProductsProssAdd} />
      <Route path="/productsprocessor/details/:id" component={ProductsProssEdit} />

      <Route path="/batches/edit/:id" component={BatchEdit} />
      <Route path="/categories/list" component={CategoriesList} />
      <Route path="/categories/add" component={CategoryAdd} />
      <Route path="/clients/list" component={ClientsList} />
      <Route path="/business/list" component={BusinessList} />
      <Route path="/business/add" component={BusinessAdd} />

      <Route path="/suppliers/list" component={SuppliersList} />
      <Route path="/suppliers/add" component={SupplierAdd} />
      <Route path="/suppliers/details/:id" component={SupplierEdit} />

      <Route path="/clients/add" component={ClientAdd} />
      <Route path="/customers/list" component={CustomersList} />
      <Route path="/customers/add" component={CustomerAdd} />
      <Route path="/clients/details/:id" component={ClientEdit} />
      <Route path="/customers/details/:id" component={CustomerEdit} />
      <Route path="/customers/upload" component={CustomerUpload} />
      <Route path="/clients/upload" component={ClientUpload} />
      <Route path="/business/upload" component={BusinessUpload} />
      <Route path="/products/list" component={ProductsList} />
      <Route path="/products/add" component={ProductAdd} />
      <Route path="/products/upload" component={ProductUpload} />
      <Route path="/products/details/:id" component={ProductEdit} />
      <Route path="/reports/summary" component={Summary} />
      <Route path="/pos/userSelection" component={Pos} />
      <Route path="/pos/settings/tax" component={Tax} />
      <Route path="/pos/cartSelection" component={ManagePos} />
      <Route path="/pos/AddtoCart" component={AddtoCart} />
      <Route path="/pos/invoice/:id" component={ProductInvoice} />
      <Route path="/pos/plants/AddtoCart" component={PlantCart} />
      <Route path="/pos/plants/userSelection" component={ClientSelection} />
      {/* <Route path="/pos/plants/AddtoCart/:id" component={Product} />s
      {/* <Route path="/pos/plants/AddtoCart/:id" component={Product} />s */}
      <Route path="/pos/checkoutHistory" component={checkoutHistory} />
      <Route path="/marketplace/markethome" component={marketplace} />
      {/* <Route path="/products/:id" component={Product} /> */}
      <Route path="/products/labels/:id" component={Label} />
      <Route path="/plants/labels/:id" component={PlantLabel} />
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/login" component={LogIn} />
        <Route path="/register" component={Register} />
        <Route path="/forgot" component={ForgotPassword} />
        <Route path="/reset" component={ResetPassword} />
        <Route path="/marketplacecart" component={MarketPlaceCart} />
        <Route path="/termsofservice" component={TermsOfService} />
        <Route path="/marketplacecart" component={MarketPlaceCart} />
        <Route path="/" component={wrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default withRouter(Router);
