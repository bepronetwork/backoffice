import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import TooltipTop from './components/TooltipTop';
import TooltipBottom from './components/TooltipBottom';
import TooltipRight from './components/TooltipRight';
import TooltipLeft from './components/TooltipLeft';
import PopoverTop from './components/PopoverTop';
import PopoverBottom from './components/PopoverBottom';
import PopoverRight from './components/PopoverRight';
import PopoverLeft from './components/PopoverLeft';

const TooltipsPopovers = ({ t }) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">{t('ui_elements.tooltips_popovers.title')}</h3>
        <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
              information
        </h3>
      </Col>
    </Row>
    <Row>
      <TooltipTop />
      <TooltipBottom />
      <TooltipRight />
      <TooltipLeft />
      <PopoverTop />
      <PopoverBottom />
      <PopoverRight />
      <PopoverLeft />
    </Row>
  </Container>
);

TooltipsPopovers.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(TooltipsPopovers);
