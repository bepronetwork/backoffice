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
import { useParams } from "react-router-dom";

class WalletWidget extends React.Component{

    constructor(props){
        super(props)
    }
    
    render = () => {
        // const { profile } = this.props;
        
        // let wallets = (profile.getApp().getSummaryData('walletSimple')).data;

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
                                icon : <ArrowCollapseUpIcon/>
                            },
                            {
                                title : 'Withdraw',
                                container : (
                                    <WithdrawWidget/>
                                ),
                                icon : <ArrowDownIcon/>
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
        profile: state.profile
    };
}

WalletWidget.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(WalletWidget);

