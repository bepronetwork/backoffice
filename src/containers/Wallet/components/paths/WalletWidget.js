import React from 'react';
import { Container } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import TabsContainer  from '../../../../shared/components/tabs/Tabs'
import DepositWidget from './DepositWidget';
import WithdrawWidget from './WithdrawWidget';
import LimitsWidget from './LimitsWidget';
import { ArrowDownIcon, ArrowCollapseUpIcon, CurrencyUsdIcon, MoneyIcon, WalletIcon } from 'mdi-react';
import FeesWidget from './FeesWidget';
import BonusWidget from './BonusWidget';

class WalletWidget extends React.Component{

    constructor(props){
        super(props)
    }

    isAdded = (AddOn) => {
        const app = this.props.profile.App;
        const appAddOns = app.params.addOn;

        return !!Object.keys(appAddOns).find(k => AddOn.toLowerCase().includes(k.toLowerCase()));
         
    }
    
    render = () => {
        const { profile, wallet } = this.props;

        const hasTxFeeAddOn = this.isAdded('TxFee');
        const hasDepositBonusAddOn = this.isAdded('DepositBonus');

        const { virtual } = profile.getApp().getParams();
        let disabled = false;

        if (virtual === true) {
            disabled = wallet.currency.virtual === true ? true : false;
        }

        return (
            <Container className="dashboard">
                <TabsContainer 
                    items={
                        [
                            {
                                title : 'Deposit',
                                container : (
                                    <DepositWidget/>
                                ),
                                icon : <ArrowCollapseUpIcon/>,
                                disabled : disabled
                            },
                            {
                                title : 'Withdraw',
                                container : (
                                    <WithdrawWidget/>
                                ),
                                icon : <ArrowDownIcon/>,
                                disabled : disabled
                            },
                            {
                                title : 'Limits',
                                container : (
                                    <LimitsWidget/>
                                ),
                                icon : <CurrencyUsdIcon/>
                            },
                            hasTxFeeAddOn ? {
                                title : 'Fees',
                                container : (
                                    <FeesWidget/>
                                ),
                                icon : <MoneyIcon/>
                            } : {},
                            hasDepositBonusAddOn ? {
                                title : 'Bonus',
                                container : (
                                    <BonusWidget/>
                                ),
                                icon : <WalletIcon/>
                            } : {}
                        ]
                    }
                />
          </Container>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile,
        wallet : state.wallet
    };
}

WalletWidget.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(WalletWidget);

