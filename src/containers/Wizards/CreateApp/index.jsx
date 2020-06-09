import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import Wizard from './components/WizardForm';

const CreateAppWizard = (props) => (   
    <Wizard {...props}/>
);

CreateAppWizard.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(CreateAppWizard);
