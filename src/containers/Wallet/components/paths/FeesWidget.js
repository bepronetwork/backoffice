import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import _ from 'lodash';
import { ArrowExpandDownIcon, WalletProductIcon } from 'mdi-react';
import LimitsBox from './limits/LimitsBox';
import CurrencyInfo from './CurrencyInfo';
import { LockWrapper } from '../../../../shared/components/LockWrapper';
const deposit = `${process.env.PUBLIC_URL}/img/dashboard/deposit.png`;
const withdrawal = `${process.env.PUBLIC_URL}/img/dashboard/withdrawal.png`;

const defaultState = {
    maxDeposit : 0,
    new_maxDeposit : 0,
    maxWithdrawal : 0,
    new_maxWithdrawal : 0,
    minWithdrawal: 0,
    new_minWithdrawal: 0,
    affiliateMinWithdrawal: 0,
    new_affiliateMinWithdrawal: 0,
    currencyTicker : 'N/A',
    locks : {
        maxWithdrawal: true,
        maxDeposit: true,
        minWithdrawal: true,
        affiliateMinWithdrawal: true
    },
    isLoading : {
        maxWithdrawal: false,
        maxDeposit: false,
        minWithdrawal: false,
        affiliateMinWithdrawal: false
    }
}

class FeesWidget extends React.Component{

    constructor(props){
        super(props);
        this.state = defaultState;
    }

    render = () => {
        const { profile } = this.props;
        const { currency } = this.props.wallet;

        const isSuperAdmin = profile.User.permission.super_admin;

        return (
            <Container className="dashboard">
                <Col lg={12}>
                    <h3 style={{marginTop : 20 }} className={"bold-text dashboard__total-stat"}>Fees</h3>
                    <p className="" style={{marginBottom : 50 }}>
                        Choose the fees to deposit and withdraw of your wallet.
                    </p>
                </Col>
                <Row>
                <LockWrapper hasPermission={isSuperAdmin}>
                    <CurrencyInfo profile={profile} data={currency}/>
                </LockWrapper>
                </Row>
            </Container>
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