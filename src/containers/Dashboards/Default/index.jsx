import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import ABTestingAnalytics from './components/ABTestingAnalytics';
import VisitorsSessions from './components/VisitorsSessions';
import BounceRateArea from './components/BounceRateArea';
import BudgetStatistic from './components/BudgetStatistic';
import CompanyId from './components/CompanyId';
import ProfitResume from './components/ProfitResume';
import TurnoverResume from './components/TurnoverResume';
import LiquidityWalletWidget from './components/LiquidityWalletWidget';

import { connect } from "react-redux";
import { compose } from 'lodash/fp'

class DefaultDashboard extends React.Component{

    constructor(props){
        super(props)
    }

    render = () => {
        return (
            <Container className="dashboard">   
                <Row>
                    <Col lg={3}>
                        <CompanyId app={this.props.profile.getApp()}/>
                    </Col>  
                    <Col lg={3}>
                        <LiquidityWalletWidget data={this.props.profile.getApp().getSummaryData('wallet')} />
                    </Col>
                    <Col lg={3}>
                        <ProfitResume data={this.props.profile.getApp().getSummaryData('revenue')} />
                    </Col> 
                    <Col lg={3}>
                        <TurnoverResume data={this.props.profile.getApp().getSummaryData('revenue')} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <ABTestingAnalytics data={this.props.profile.getApp().getSummaryData('revenue')} />
                    </Col>    
                </Row>
                <Row>
                    <Col md={4}>
                        <BudgetStatistic data={this.props.profile.getApp().getSummaryData('bets')}/>
                    </Col>
                    <Col md={4}>
                        <VisitorsSessions data={{
                            users : this.props.profile.getApp().getSummaryData('games'),
                            bets : this.props.profile.getApp().getSummaryData('bets')
                        }}/>
                    </Col>
                    <Col md={4}>
                        <BounceRateArea />
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

DefaultDashboard.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(DefaultDashboard);

