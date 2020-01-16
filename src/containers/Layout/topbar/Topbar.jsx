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
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import { CheckCircleIcon, AlertCircleIcon } from 'mdi-react';
import _ from 'lodash';
import { AddressConcat } from '../../../lib/string';
import { connect } from "react-redux";
import { compose } from 'lodash/fp';

const defaultProps = {
    metamaksAddress : 'N/A',
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
        let metamaksAddress = user ? await user.getMetamaskAddress() : defaultProps.userMetamaskAddress;
        if(user){
            let ownerAddress = user.getApp().getInformation('ownerAddress');
            this.setState({...this.state, 
                userAddress :  ownerAddress ? AddressConcat(ownerAddress) : defaultProps.userAddress,
                userMetamaskAddress : (user && metamaksAddress) ? AddressConcat(metamaksAddress) : defaultProps.userMetamaskAddress,
                isValid : user ? new String(ownerAddress).toLowerCase() == new String(metamaksAddress).toLowerCase() :  defaultProps.isValid     
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
                    <TopBarCurrencyView/>
                    <TopBarWithdrawNotice/>
                    <TopbarNotification />
                    <div className='address-box'> 
                        <h5>
                            <Tooltip title={text[this.state.isValid]}>
                                <IconButton aria-label={text[this.state.isValid]}>
                                    {this.state.isValid ? 
                                        <CheckCircleIcon styleName={'icon-green'} size={20}/>
                                        :
                                        <AlertCircleIcon styleName={'icon-red'}  size={20}/>
                                    }
                                </IconButton>
                            </Tooltip>
                            {this.state.userMetamaskAddress}
                        </h5>
                    </div>
                    <TopbarProfile />
                    <TopbarLanguage />
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

