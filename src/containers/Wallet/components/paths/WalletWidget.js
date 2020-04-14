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
import { ArrowDownIcon, ArrowCollapseUpIcon, CurrencyUsdIcon } from 'mdi-react';

class WalletWidget extends React.Component{

    constructor(props){
        super(props)
    }
    
    render = () => {
        const { profile, wallet } = this.props;
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
                            }
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

