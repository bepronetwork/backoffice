import React from 'react';
import { Row } from 'reactstrap';
import { connect } from "react-redux";
import { LockWrapper } from '../../../../shared/components/LockWrapper';
import { TabContainer } from '../WalletTabs/styles';
import { Paragraph } from '../LiquidityWalletContainer/styles';
import FreeCurrencyAddOn from './FreeCurrencyAddOn'

class FreeCurrencyWidget extends React.Component{

    render = () => {
        const { profile, data } = this.props;
        const { wallet } = data;

        const isSuperAdmin = profile.User.permission.super_admin;

        return (
            <TabContainer>
                <Paragraph style={{ marginBottom: 15 }}>Define how much free currency users can earn in each time period</Paragraph>
                <Row>
                    <LockWrapper hasPermission={isSuperAdmin}>
                        <FreeCurrencyAddOn wallet={wallet}/>
                    </LockWrapper>
                </Row>
            </TabContainer>
        )
    }

}

function mapStateToProps(state){
    return {
        profile: state.profile,
        wallet: (state.wallet.currency) ? state.wallet : state.profile.getApp().getSummaryData('walletSimple').data[0]
    };
}


export default connect(mapStateToProps)(FreeCurrencyWidget);