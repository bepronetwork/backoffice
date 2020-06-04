import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import CurrencyInfo from './CurrencyInfo';
import { LockWrapper } from '../../../../shared/components/LockWrapper';
import { TabContainer } from '../WalletTabs/styles';
import { Paragraph } from '../LiquidityWalletContainer/styles';

class FeesWidget extends React.Component{

    render = () => {
        const { profile } = this.props;
        const { currency } = this.props.data.wallet;

        const isSuperAdmin = profile.User.permission.super_admin;

        return (
            <TabContainer>
                <Paragraph style={{ marginBottom: 15 }}>Choose the fees to deposit and withdraw of your wallet</Paragraph>
                <Row>
                <LockWrapper hasPermission={isSuperAdmin}>
                    <CurrencyInfo profile={profile} data={currency}/>
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

FeesWidget.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(FeesWidget);