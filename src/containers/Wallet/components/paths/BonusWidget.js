import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import { LockWrapper } from '../../../../shared/components/LockWrapper';
import DepositBonus from './DepositBonus';

class BonusWidget extends React.Component{

    render = () => {
        const { profile } = this.props;
        const { currency } = this.props.wallet;

        const isSuperAdmin = profile.User.permission.super_admin;

        return (
            <Container className="dashboard">
                <Col lg={12}>
                    <h3 style={{marginTop : 20 }} className={"bold-text dashboard__total-stat"}>Bonus</h3>
                    <p className="" style={{marginBottom : 50 }}>
                        Choose the bonus to deposit of your wallet.
                    </p>
                </Col>
                <Row>
                <LockWrapper hasPermission={isSuperAdmin}>
                    <DepositBonus profile={profile} data={currency}/>
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

BonusWidget.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(BonusWidget);