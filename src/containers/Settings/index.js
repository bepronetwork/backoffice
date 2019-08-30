import React from 'react';
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import SettingsBox from './components/SettingsBox';
import { ArrowExpandDownIcon, EmergencyExitIcon, OpenInAppIcon, SettingsIcon, AccountIcon, FinanceIcon, ExitToAppIcon } from 'mdi-react';
import { Tab, Nav, Sonnet } from 'react-bootstrap';
import { SettingsRiskContainer , SettingsAccountContainer, SettingsTransactionContainer } from './tabs';
import TabsContainer from '../../shared/components/tabs/Tabs.js';

const defaultState = {
}

class SettingsContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }
    
    projectData = async (props) => {
       
    }


    render = () => {

        return (
            <Container className="dashboard">
                <TabsContainer 
                    items={
                        [
                            {
                                title : 'Account',
                                container : <SettingsAccountContainer/>,
                                icon : <AccountIcon size={20}/>
                            },
                            {
                                title : 'Finance',
                                container : <SettingsTransactionContainer/>,
                                icon : <FinanceIcon size={20}/>

                            },
                            {
                                title : 'Risk Mgmt',
                                container : <SettingsRiskContainer/>,
                                icon : <ExitToAppIcon size={20}/>
                            },
                    
                        ]
                    }
                />
          </Container>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

SettingsContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(SettingsContainer);
