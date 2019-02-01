import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import MaskExamples from './components/MaskExamples';
import showResults from '../Show';

const MaskForm = ({ t }) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">{t('forms.mask_form.title')}</h3>
        <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
              information
        </h3>
      </Col>
    </Row>
    <Row>
      <MaskExamples onSubmit={showResults} />
    </Row>
  </Container>
);

MaskForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(MaskForm);
