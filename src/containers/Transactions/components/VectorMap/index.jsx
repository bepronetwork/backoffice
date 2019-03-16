import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Map from './components/Map';

const VectorMap = ({ t }) => (
  <Map />
);

VectorMap.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(VectorMap);
