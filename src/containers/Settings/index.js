import React from 'react';
import { Container } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import { AccountIcon, CashMultipleIcon, FinanceIcon, ExitToAppIcon, AccessibilityIcon, UpdateIcon, CurrencyEthIcon, CurrencySignIcon} from 'mdi-react';
import { Tab, Nav, Sonnet } from 'react-bootstrap';
import { SettingsRiskContainer, AddAdminContainer, SettingsAccountContainer, SettingsTransactionContainer, AddressManagementContainer, PlatformUpdates, TokenManager } from './tabs';
// import { SettingsAccountContainer, SettingsRiskContainer, SettingsTransactionContainer, AddressManagementContainer, PlatformUpdates, TokenManager } from './tabs';
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
                                title : 'Add Admin',
                                container : <AddAdminContainer/>,
                                icon : <AccessibilityIcon size={20}/>
                            }
                            /*,
                            {
                                title : 'Finance',
                                container : <SettingsTransactionContainer/>,
                                icon : <FinanceIcon size={20}/>
                            },
                            {
                                title : 'Risk Control',
                                container : <SettingsRiskContainer/>,
                                icon : <ExitToAppIcon size={20}/>
                            },
                            {
                                title : 'Address Control',
                                container : <AddressManagementContainer/>,
                                icon : <AccessibilityIcon size={20}/>
                            },
                            {
                                title : 'Platform Updates',
                                container : <PlatformUpdates/>,
                                icon : <UpdateIcon size={20}/>
                            },
                             {
                                title : 'Bank Token',
                                container : <TokenManager/>,
                                icon : <CurrencySignIcon size={20}/>
                            }
                            */
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

