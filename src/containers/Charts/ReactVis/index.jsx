import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Plots from './components/Plots';
import LineSeriesCanvas from './components/LineSeriesCanvas';
import MarkSeriesCanvas from './components/MarkSeriesCanvas';
import LineSeries from './components/LineSeries';
import LineSeriesWithManyColors from './components/LineSeriesWithManyColors';
import Bar from './components/Bar';

const ReactVis = ({ t }) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">{t('charts.react_vis.title')}</h3>
        <h3 className="page-subhead subhead">
          Use this elements, if you want to show some hints or additional information
        </h3>
      </Col>
    </Row>
    <Row>
      <Plots />
      <LineSeriesCanvas />
      <MarkSeriesCanvas />
      <LineSeries />
      <LineSeriesWithManyColors />
      <Bar />
    </Row>
  </Container>
);

ReactVis.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(ReactVis);
