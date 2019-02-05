import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import DepositsWidget from './components/DepositsWidget';
import DepositsInfo from './components/DepositsInfo';
import WithdrawalsInfo from './components/WithdrawalsInfo';
import LiquidityInfo from './components/LiquidityInfo';
import PlatformCostsInfo from './components/PlatformCostsInfo';
import RevenueChart from './components/RevenueChart';


class StatsContainer extends React.Component{

    constructor(props){
        super(props)
    }


    render = () => {
        return (
            <Container className="dashboard">
                <Row>
                  
                    <Col lg={3}>
                        <LiquidityInfo data={this.props.profile.getApp().getSummaryData('wallet')}/>
                    </Col>
                    <Col lg={3}>
                        <DepositsInfo/>
                    </Col>
                    <Col lg={3}>
                        <WithdrawalsInfo/>
                    </Col>
                    <Col lg={3}>
                        <PlatformCostsInfo/>
                    </Col>
                   
                </Row>
                <Row>
                    <Col lg={12}>
                        <RevenueChart data={this.props.profile.getApp().getSummaryData('revenue')} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <DepositsWidget/>
                    </Col>
                   
                </Row>
            </Container>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

StatsContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(StatsContainer);

