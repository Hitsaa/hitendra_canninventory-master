import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Visits from './components/Visits';
import TotalPageViews from './components/TotalPageViews';
import NewUsers from './components/NewUsers';
// import BounceRate from './components/BounceRate';
// import ProductsListTable from './components/ProductsListTable';
// import ABTestingAnalytics from './components/ABTestingAnalytics';
// import SalesStatistic from './components/SalesStatistic';
// import VisitorsSessions from './components/VisitorsSessions';
// import BounceRateArea from './components/BounceRateArea';
// import AudienceByCountry from './components/AudienceByCountry';
// import BudgetStatistic from './components/BudgetStatistic';
// import BestSellingRegions from './components/BestSellingRegions';
// import GoalsCompletion from './components/GoalsCompletion';
import AudienceByCountry from './components/AudienceByCountry';
import ReportDownload from './components/ReportDownload';
import ProductbyCategory from './components/ProductbyCategory';
import CurrentInventoryByCategory from './components/CurrentInventoryByCategory';
import CurrentSalesByCategory from './components/CurrentSalesByCategory';
import CurrentSalesByProduct from './components/CurrentSalesByProduct';
import BestSellingProducts from './components/BestSellingProducts';
import TotalRevenue from './components/TotalRevenue';
import PlantState from './components/PlantState';
import ProductTable from './components/ProductTable';

const DefaultDashboard = ({ t }) => (

  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">{t('dashboard_default.page_title')}</h3>
      </Col>
    </Row>
    <Row>
      <Visits />
      <TotalPageViews />
      <NewUsers />
    </Row>
    <Row>
      <ReportDownload />
    </Row>
    <Row>
      {/* <ABTestingAnalytics />
      <BounceRateArea />
      <VisitorsSessions />
      <SalesStatistic />
      <BudgetStatistic />
      <AudienceByCountry />
      <BestSellingRegions />
      <GoalsCompletion />
      <ProductsListTable /> */}
      <AudienceByCountry />
      <ProductbyCategory />
      <CurrentInventoryByCategory />
      <CurrentSalesByCategory />
      <CurrentSalesByProduct />
      <BestSellingProducts />
      <TotalRevenue />
      <PlantState />
      <ProductTable />
    </Row>
  </Container>
);

DefaultDashboard.propTypes = {
  t: PropTypes.func.isRequired,
};
export default withTranslation('common')(DefaultDashboard);
