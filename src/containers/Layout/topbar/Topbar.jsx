import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';
import TopbarMail from './TopbarMail';
import TopbarNotification from './TopbarNotification';
import TopBarWithdrawNotice from './TopBarWithdrawNotice';
import TopbarSearch from './TopbarSearch';
import TopbarLanguage from './TopbarLanguage';
import TopBarCurrencyView from './TopBarCurrencyView';
import TopBarPeriodicity from './TopBarPeriodicity';
import TopBarMoneyType from './TopBarMoneyType';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import { CheckCircleIcon, AlertCircleIcon } from 'mdi-react';
import _ from 'lodash';
import { AddressConcat } from '../../../lib/string';
import { connect } from "react-redux";
import { compose } from 'lodash/fp';
import TopbarRefresh from './TopbarRefresh';

const defaultProps = {
    userAddress : 'N/A',
    isValid : false
}

const text = {
    false : 'This Address can´t make decisions in this App, Please change to the right Address',
    true : 'You are running in your address, you can make changes :)'
}

class Topbar extends React.Component {
    static propTypes = {
        changeMobileSidebarVisibility: PropTypes.func.isRequired,
        changeSidebarVisibility: PropTypes.func.isRequired,
    };

    constructor(props){
        super(props);
        this.state = {
            ...defaultProps
        };
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }
    
    projectData = async (props) => {
        let user = !_.isEmpty(props.profile) ? props.profile : null ;
        if(user){
            let ownerAddress = user.getApp().getInformation('ownerAddress');
            this.setState({...this.state, 
                userAddress :  ownerAddress ? AddressConcat(ownerAddress) : defaultProps.userAddress   
            })
        }
        
    }

    render() {
        const { changeMobileSidebarVisibility, changeSidebarVisibility } = this.props;

        return (
            <div className="topbar">
                <div className="topbar__wrapper">
                <div className="topbar__left">
                    <TopbarSidebarButton
                    changeMobileSidebarVisibility={changeMobileSidebarVisibility}
                    changeSidebarVisibility={changeSidebarVisibility}
                    />
                </div>
                <div className="topbar__right">
                    <TopbarRefresh/>
                    <TopBarMoneyType/>
                    <TopBarPeriodicity/>
                    <TopBarCurrencyView/>
                    <TopBarWithdrawNotice/>
                    <TopbarNotification />
                    <TopbarProfile />
                    {/* <TopbarLanguage /> */}
                </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

Topbar.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    connect(mapStateToProps)
)(Topbar);

