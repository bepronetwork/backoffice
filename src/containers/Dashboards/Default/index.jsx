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
import TimePicker from './components/TimePicker';

class DefaultDashboard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isDeployed : false,
            periodicity : 'Weekly',
            currency : {}
        }
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData(props){

        const { profile, periodicity, currency } = props;
        const app = profile.getApp();
        let isDeployed  =  !_.isUndefined(app.isDeployed());

        this.setState({...this.state, isDeployed, periodicity});
    }

    render = () => {

        const { isDeployed } = this.state;
        const { periodicity, currency, isLoading } = this.props;
                        
        return (
            <Container className="dashboard">   
                <Row>
                    <Col lg={3}>
                        <CompanyId currency={currency} app={this.props.profile.getApp()}  data={{
                            wallet : this.props.profile.getApp().getSummaryData('wallet')
                        }} />
                    </Col>  
                    <Col lg={3}>
                        <DataWidget>
                            <LiquidityWalletWidget currency={currency} isLoading={isLoading} data={this.props.profile.getApp().getSummaryData('wallet')} />
                        </DataWidget>
                    </Col>
                    <Col lg={3}>
                        <DataWidget>
                            <ProfitResume currency={currency} periodicity={periodicity} isLoading={isLoading} data={{
                                revenue : this.props.profile.getApp().getSummaryData('revenue'),
                                wallet : this.props.profile.getApp().getSummaryData('wallet'),
                                }} />
                        </DataWidget>
                    </Col> 
                    <Col lg={3}>
                        <DataWidget>
                            <TurnoverResume currency={currency} periodicity={periodicity} isLoading={isLoading} data={{
                                revenue : this.props.profile.getApp().getSummaryData('revenue'),
                                wallet : this.props.profile.getApp().getSummaryData('wallet'),
                            }} />
                        </DataWidget>
                    </Col>
                </Row>
                { isDeployed ? 
                    <div>
                        <Row>
                            <Col lg={12}>
                                <DataWidget>
                                    <RevenueChart currency={currency} periodicity={periodicity} isLoading={isLoading} data={{
                                        revenue : this.props.profile.getApp().getSummaryData('revenue'),
                                        wallet : this.props.profile.getApp().getSummaryData('wallet'),
                                    }} 
                                    />
                                </DataWidget>
                            </Col>    
                        </Row>
                        <Row>
                            <Col md={6}>
                                <DataWidget>
                                    <BetsStatistics currency={currency} periodicity={periodicity} isLoading={isLoading} data={{
                                        bets : this.props.profile.getApp().getSummaryData('bets'),
                                        wallet : this.props.profile.getApp().getSummaryData('wallet')
                                        }}/>
                                </DataWidget>
                            </Col>
                            <Col md={6}>
                                <DataWidget>
                                    <VisitorsSessions currency={currency} periodicity={periodicity} isLoading={isLoading} data={{
                                        users : this.props.profile.getApp().getSummaryData('games'),
                                        bets : this.props.profile.getApp().getSummaryData('bets'),
                                        wallet : this.props.profile.getApp().getSummaryData('wallet')
                                    }}/>
                                </DataWidget>
                            </Col>
                            <Col md={4}>
                                <DataWidget>
                                    <BounceRateArea currency={currency} />
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
        profile: state.profile,
        periodicity : state.periodicity,
        currency : state.currency,
        isLoading: state.isLoading
    };
}

DefaultDashboard.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(DefaultDashboard);

