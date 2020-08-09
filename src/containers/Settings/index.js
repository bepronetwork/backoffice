import React from 'react';
import { compose } from 'lodash/fp';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from "react-redux";
import { Container } from 'reactstrap';
import { Chat, Settings, User } from '../../components/Icons';
import TabsContainer from '../../shared/components/tabs/Tabs.js';
import { AdminContainer, SettingsAccountContainer } from './tabs';
import ComplianceContainer from './tabs/ComplianceContainer';
import LogsContainer from './tabs/LogsContainer';
import Fade from '@material-ui/core/Fade';

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
            <Fade in timeout={{ appear: 200, enter: 200, exit: 200 }}>
            <Container className="dashboard">
                <TabsContainer 
                    items={
                        [
                            {
                                title : 'Account',
                                container : <SettingsAccountContainer/>,
                                icon : <User/>
                            },
                            {
                                title : 'Admins',
                                container : <AdminContainer/>,
                                icon : <User/>
                            },
                            {
                                title : 'Compliance',
                                container : <ComplianceContainer/>,
                                icon : <Settings/>
                            },
                            {
                                title : 'Logs',
                                container : <LogsContainer/>,
                                icon : <Chat/>
                            },
                            // {
                            //     title : 'Admins (New)',
                            //     container : <AdminContainer/>,
                            //     icon : <AccessibilityIcon size={20}/>
                            // }
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
          </Fade>
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

