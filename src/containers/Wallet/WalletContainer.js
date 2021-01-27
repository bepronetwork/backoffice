import React from 'react';
import {  Container } from 'reactstrap';
import { connect } from "react-redux";
import TabsContainer  from '../../shared/components/tabs/Tabs'
import CurrencyStore from './CurrencyStore';
import { Wallet, Cash } from '../../components/Icons';
import LiquidityWalletContainer from './components/LiquidityWalletContainer';

import _ from 'lodash';
class WalletContainer extends React.Component{

    render = () => {
        const { profile } = this.props;
        const app = profile.getApp();
        
        const wallets = app.params.wallet;

        return (
            <Container className="dashboard">
                <TabsContainer 
                    items={
                        [ { 
                            title : 'My Wallet', 
                            container : ( <LiquidityWalletContainer wallets={wallets} /> ), 
                            icon : <Wallet/>, 
                            disabled: _.isEmpty(wallets) },
                          { 
                            title : 'Currency Store', 
                            container : ( <CurrencyStore/> ), 
                            icon : <Cash/> }
                        ] }
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

export default connect(mapStateToProps)(WalletContainer);

