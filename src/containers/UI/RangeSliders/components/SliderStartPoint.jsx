import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

const SliderStartPoint = ({ t }) => (
  <Col md={12} lg={6} xs={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">{t('ui_elements.range_sliders.slider_start_point')}</h5>
          <h5 className="subhead">Use default slider with value of property <span className="red-text">value</span></h5>
        </div>
        <Slider min={0} max={129} value={34} />
      </CardBody>
    </Card>
  </Col>
);

SliderStartPoint.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(SliderStartPoint);
