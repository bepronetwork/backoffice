import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import ReactHighmaps from 'react-highcharts/ReactHighmaps.src';
import maps from './world';
import data from './world-population-density.json';

// you can find all options here: https://api.highcharts.com/highmaps/global

const config = {
  chart: {
    spacingBottom: 20,
    backgroundColor: 'transparent',
    style: {
      fontFamily: '\'Roboto\', sans-serif',
      height: '500px',
    },
  },

  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom',
      theme: {
        fill: 'transparent',
        'stroke-width': 1,
        r: 0,
      },
      style: {
        color: '#999999',
      },
    },
  },

  exporting: {
    allowHTML: true,
  },

  title: {
    style: { display: 'none' },
  },

  legend: {
    enabled: false,
  },

  plotOptions: {
    map: {
      joinBy: ['iso-a2', 'code'],
      mapData: maps,
    },
  },

  tooltip: {
    headerFormat: 'Amount',
    colorBackground: '#ffffff',
    borderWidth: 0,
    shadow: false,
    borderRadius: 0,
    useHTML: true,
    pointFormat: '<br><span class=\'f32\'><span class=\'flag {point.flag}\'></span></span>' +
    '{point.name}: <b>{point.value}</b> Users',
  },

  colorAxis: {
    min: 1,
    max: 1000,
    type: 'logarithmic',
  },

  series: [{
    data,
    states: {
      hover: {
        color: '#894798',
      },
    },
  }],
};

const Map = ({ t }) => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">{'Users by Country'}</h5>
        </div>
        <ReactHighmaps config={config} />
      </CardBody>
    </Card>
  </Col>
);

Map.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(Map);
