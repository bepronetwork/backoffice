import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import RevenueChart from './components/RevenueChart';
import VisitorsSessions from './components/VisitorsSessions';
import BounceRateArea from './components/BounceRateArea';
import BetsStatistics from './components/BetsStatistics';
import CompanyId from './components/CompanyId';
import ProfitResume from './components/ProfitResume';
import TurnoverResume from './components/TurnoverResume';
import LiquidityWalletWidget from './components/LiquidityWalletWidget';

import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import DataWidget from '../../DataWidget/DataWidget';
import _ from 'lodash';
import NoData from '../../NoData';

class DefaultDashboard extends React.Component{

    constructor(props){
        super(props)
    }

    render = () => {
        let data = this.props.profile.hasAppStats('revenue');
        let hasData = data && !_.isEmpty(data.data);
                
        return (
            <Container className="dashboard">   
                <Row>
                    <Col lg={3}>
                        <CompanyId app={this.props.profile.getApp()}/>
                    </Col>  
                    <Col lg={3}>
                        <DataWidget>
                            <LiquidityWalletWidget data={this.props.profile.getApp().getSummaryData('wallet')} />
                        </DataWidget>
                    </Col>
                    <Col lg={3}>
                        <DataWidget>
                            <ProfitResume data={{
                                revenue : this.props.profile.getApp().getSummaryData('revenue'),
                                wallet : this.props.profile.getApp().getSummaryData('wallet'),
                                }} />
                        </DataWidget>
                    </Col> 
                    <Col lg={3}>
                        <DataWidget>
                            <TurnoverResume data={{
                                revenue : this.props.profile.getApp().getSummaryData('revenue'),
                                wallet : this.props.profile.getApp().getSummaryData('wallet'),
                            }} />
                        </DataWidget>
                    </Col>
                </Row>
                { hasData ? 
                    <div>
                        <Row>
                            <Col lg={12}>
                                <DataWidget>
                                    <RevenueChart data={{
                                        revenue : this.props.profile.getApp().getSummaryData('revenue'),
                                        wallet : this.props.profile.getApp().getSummaryData('wallet'),
                                        }} 
                                    />
                                </DataWidget>
                            </Col>    
                        </Row>
                        <Row>
                            <Col md={4}>
                                <DataWidget>
                                    <BetsStatistics data={{
                                        bets : this.props.profile.getApp().getSummaryData('bets'),
                                        wallet : this.props.profile.getApp().getSummaryData('wallet')
                                        }}/>
                                </DataWidget>
                            </Col>
                            <Col md={4}>
                                <DataWidget>
                                    <VisitorsSessions data={{
                                        users : this.props.profile.getApp().getSummaryData('games'),
                                        bets : this.props.profile.getApp().getSummaryData('bets'),
                                        wallet : this.props.profile.getApp().getSummaryData('wallet')
                                    }}/>
                                </DataWidget>
                            </Col>
                            <Col md={4}>
                                <DataWidget>
                                    <BounceRateArea />
                                </DataWidget>
                            </Col>
                        </Row>
                    </div>
                : 
                    <div>
                        <NoData {...this.props} app={this.props.profile.getApp()}/>
                    </div>
                }
                
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

