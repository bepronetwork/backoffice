/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import WizardForm from './Wizard/WizardForm';


class IntegrationsContainer extends PureComponent {
 
    constructor() {
        super();
        this.state = {
        };
    }

    render() {

        return (
            <WizardForm/>            
        );
    }
}

export default IntegrationsContainer;
