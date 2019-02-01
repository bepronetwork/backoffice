import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import ActivityChart from './components/ActivityChart';
import ActivityRating from './components/ActivityRating';
import FatBurning from './components/FatBurning';
import HeartRate from './components/HeartRate';
import CaloriesBurn from './components/CaloriesBurn';
import Steps from './components/Steps';
import Distance from './components/Distance';
import TodayRunningMap from './components/TodayRunningMap';
import MyCompetitors from './components/MyCompetitors';

const FitnessDashboard = ({ t }) => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">{t('dashboard_fitness.page_title')}</h3>
      </Col>
    </Row>
    <Row>
      <HeartRate />
      <CaloriesBurn />
      <Steps />
      <Distance />
    </Row>
    <Row>
      <ActivityChart />
      <TodayRunningMap />
      <MyCompetitors />
      <FatBurning />
      <ActivityRating />
    </Row>
  </Container>
);

FitnessDashboard.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(FitnessDashboard);
