import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from './MainWrapper';
import Layout from '../Layout/index';

import Alerts from '../UI/Alerts/index';
import Buttons from '../UI/Buttons/index';
import Carousel from '../UI/Carousel/index';
import Collapse from '../UI/Collapse/index';
import Grids from '../UI/Grids';
import Modals from '../UI/Modals/index';
import Notifications from '../UI/Notification/index';
import Panels from '../UI/Panels/index';
import ProgressBars from '../UI/ProgressBars/index';
import RangeSliders from '../UI/RangeSliders/index';
import Tabs from '../UI/Tabs/index';
import Timeline from '../UI/Timeline/index';
import Tooltips from '../UI/Tooltips/index';
import Typography from '../UI/Typography/index';

import BasicTables from '../Tables/BasicTables/index';
import DataTable from '../Tables/DataTable/index';
import EditableTable from '../Tables/EditableTable/index';
import MaterialTable from '../Tables/MaterialTable/index';

import GoogleMap from '../Maps/GoogleMap/index';
import VectorMap from '../Maps/VectorMap/index';

import NotFound404 from '../DefaultPage/404/index';
import Calendar from '../DefaultPage/Calendar/index';
import FAQ from '../DefaultPage/Faq/index';
import Gallery from '../DefaultPage/Gallery/index';
import Chat from '../Chat/index';
import PricingCards from '../DefaultPage/PricingCards/index';
import TextEditor from '../DefaultPage/TextEditor/index';
import InvoiceTemplate from '../DefaultPage/InvoiceTemplate/index';
import SearchResults from '../DefaultPage/SearchResults/index';
import ProjectSummary from '../DefaultPage/ProjectSummary/index';

import Catalog from '../ECommerce/Catalog/index';
import ProductPage from '../ECommerce/product_page/index';

import Profile from '../Account/Profile/index';
import EmailConfirmation from '../Account/EmailConfimation/index';
import LockScreen from '../Account/LockScreen/index';
import LogIn from '../Account/LogIn/index';
import LogInPhoto from '../Account/log_in_photo/index';
import Register from '../Account/Register/index';
import RegisterPhoto from '../Account/RegisterPhoto/index';

import BasicForm from '../Form/BasicForm/index';
import FormDropzone from '../Form/FormDropzone/index';
import FileUpload from '../Form/FileUpload/index';
import FormLayouts from '../Form/FormLayouts/index';
import CheckFormControls from '../Form/CheckFormControls/index';
import FormValidation from '../Form/FormValidation/index';
import MaskForm from '../Form/MaskForm/index';
import WizardForm from '../Form/WizardForm/index';
import MaterialForm from '../Form/MaterialForm/index';
import FloatingLabelsForm from '../Form/FloatingLabelsForm/index';
import FormPicker from '../Form/FormPicker/index';

import Cart from '../ECommerce/Cart/index';
import OrdersList from '../ECommerce/OrdersList/index';
import Payment from '../ECommerce/Payment/index';
import ProductEdit from '../ECommerce/ProductEdit/index';
import ProductsList from '../ECommerce/ProductsList/index';

import ChartsJS from '../Charts/ChartJs/index';
import ReactVis from '../Charts/ReactVis/index';
import Recharts from '../Charts/Recharts/index';

import FitnessDashboard from '../Dashboards/Fitness/index';
import DefaultDashboard from '../Dashboards/Default/index';
import ECommerceDashboard from '../Dashboards/ECommerce/index';
import CryptoDashboard from '../Dashboards/Crypto/index';

import Mail from '../Mail/index';

import Introduction from '../Documentation/01_introduction/index';
import Installation from '../Documentation/02_installation/index';
import FileStructure from '../Documentation/03_files_structure/index';
import Components from '../Documentation/04_components/index';
import Form from '../Documentation/05_forms/index';
import ColorThemes from '../Documentation/06_change_and_add_color_themes/index';
import NavigationItem from '../Documentation/07_new_navigation_item/index';
import Resources from '../Documentation/08_resources/index';
import Changelog from '../Documentation/09_changelog/index';


import CryptoDashboardEdit from '../Dashboards/CryptoTableEdit/index';
import ECommerceDashboardEdit from '../Dashboards/ECommerceTableEdit/index';

import Landing from '../Landing/index';
import BetProtocol from '../Dashboards/BetProtocol';
import UsersContainer from '../Users/index';
import Applications from '../Applications';


const UI = () => (
  <Switch>
    <Route path="/ui/alerts" component={Alerts} />
    <Route path="/ui/buttons" component={Buttons} />
    <Route path="/ui/carousel" component={Carousel} />
    <Route path="/ui/collapse" component={Collapse} />
    <Route path="/ui/grids" component={Grids} />
    <Route path="/ui/modals" component={Modals} />
    <Route path="/ui/notifications" component={Notifications} />
    <Route path="/ui/panels" component={Panels} />
    <Route path="/ui/progress_bars" component={ProgressBars} />
    <Route path="/ui/range_sliders" component={RangeSliders} />
    <Route path="/ui/tabs" component={Tabs} />
    <Route path="/ui/timeline" component={Timeline} />
    <Route path="/ui/tooltips" component={Tooltips} />
    <Route path="/ui/typography" component={Typography} />
  </Switch>
);

const Forms = () => (
  <Switch>
    <Route path="/forms/basic_form" component={BasicForm} />
    <Route path="/forms/check_form_controls" component={CheckFormControls} />
    <Route path="/forms/file_upload" component={FileUpload} />
    <Route path="/forms/floating_labels_form" component={FloatingLabelsForm} />
    <Route path="/forms/form_dropzone" component={FormDropzone} />
    <Route path="/forms/form_layouts" component={FormLayouts} />
    <Route path="/forms/form_picker" component={FormPicker} />
    <Route path="/forms/form_validation" component={FormValidation} />
    <Route path="/forms/mask_form" component={MaskForm} />
    <Route path="/forms/material_form" component={MaterialForm} />
    <Route path="/forms/wizard_form" component={WizardForm} />
  </Switch>
);

const Tables = () => (
  <Switch>
    <Route path="/tables/basic_tables" component={BasicTables} />
    <Route path="/tables/data_table" component={DataTable} />
    <Route path="/tables/editable_table" component={EditableTable} />
    <Route path="/tables/material_table" component={MaterialTable} />
  </Switch>
);

const Charts = () => (
  <Switch>
    <Route path="/charts/charts_js" component={ChartsJS} />
    <Route path="/charts/react_vis" component={ReactVis} />
    <Route path="/charts/recharts" component={Recharts} />
  </Switch>
);

const Maps = () => (
  <Switch>
    <Route path="/maps/google_map" component={GoogleMap} />
    <Route path="/maps/vector_map" component={VectorMap} />
  </Switch>
);

const Account = () => (
  <Switch>
    <Route path="/account/profile" component={Profile} />
    <Route path="/account/email_confirmation" component={EmailConfirmation} />
  </Switch>
);

const ECommerce = () => (
  <Switch>
    <Route path="/e-commerce/cart" component={Cart} />
    <Route path="/e-commerce/catalog" component={Catalog} />
    <Route path="/e-commerce/orders_list" component={OrdersList} />
    <Route path="/e-commerce/payment" component={Payment} />
    <Route path="/e-commerce/product_edit" component={ProductEdit} />
    <Route path="/e-commerce/product_page" component={ProductPage} />
    <Route path="/e-commerce/products_list" component={ProductsList} />
  </Switch>
);

const DefaultPages = () => (
  <Switch>
    <Route path="/default_pages/calendar" component={Calendar} />
    <Route path="/default_pages/faq" component={FAQ} />
    <Route path="/default_pages/gallery" component={Gallery} />
    <Route path="/default_pages/invoice_template" component={InvoiceTemplate} />
    <Route path="/default_pages/pricing_cards" component={PricingCards} />
    <Route path="/default_pages/project_summary" component={ProjectSummary} />
    <Route path="/default_pages/search_results" component={SearchResults} />
    <Route path="/default_pages/text_editor" component={TextEditor} />
  </Switch>
);

const Documentation = () => (
  <Switch>
    <Route path="/documentation/introduction" component={Introduction} />
    <Route path="/documentation/installation" component={Installation} />
    <Route path="/documentation/file_structure" component={FileStructure} />
    <Route path="/documentation/components" component={Components} />
    <Route path="/documentation/form" component={Form} />
    <Route path="/documentation/color_themes" component={ColorThemes} />
    <Route path="/documentation/navigation_item" component={NavigationItem} />
    <Route path="/documentation/resources" component={Resources} />
    <Route path="/documentation/changelog" component={Changelog} />
  </Switch>
);

const Crypto = () => (
  <Switch>
    <Route exact path="/dashboard_crypto" component={CryptoDashboard} />
    <Route path="/dashboard_crypto/edit/:index" component={CryptoDashboardEdit} />
  </Switch>
);

const Commerce = () => (
  <Switch>
    <Route exact path="/dashboard_e_commerce" component={ECommerceDashboard} />
    <Route path="/dashboard_e_commerce/edit/:index" component={ECommerceDashboardEdit} />
  </Switch>
);

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path="/dashboard_default" component={DefaultDashboard} />
      <Route path="/dashboard_e_commerce" component={Commerce} />
      <Route path="/dashboard" component={BetProtocol} />
      <Route path="/dashboard_fitness" component={FitnessDashboard} />
      <Route path="/dashboard_crypto" component={Crypto} />
      <Route path="/ui" component={UI} />
      <Route path="/mail" component={Mail} />
      <Route path="/chat" component={Chat} />
      <Route path="/forms" component={Forms} />
      <Route path="/tables" component={Tables} />
      <Route path="/charts" component={Charts} />
      <Route path="/maps" component={Maps} />
      <Route path="/account" component={Account} />
      <Route path="/e-commerce" component={ECommerce} />
      <Route path="/default_pages" component={DefaultPages} />
      <Route path="/documentation" component={Documentation} />
    </div>
  </div>
);


/**
 * @abstract USE
 */


const routes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path="/home" component={DefaultDashboard} />
      <Route path="/users" component={UsersContainer} />
      <Route path="/application" component={Applications} />

    </div>
  </div>
);


const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/404" component={NotFound404} />
        <Route path="/lock_screen" component={LockScreen} />
        <Route path="/login" component={LogIn} />
        <Route path="/log_in_photo" component={LogInPhoto} />
        <Route path="/register" component={Register} />
        <Route path="/register_photo" component={RegisterPhoto} />
        <Route path="/" component={routes} />
      </Switch>
    </main>
  </MainWrapper>
);




export default Router;
