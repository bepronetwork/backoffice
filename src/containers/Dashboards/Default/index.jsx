import React from 'react';
import Fade from '@material-ui/core/Fade';
import _ from 'lodash';
import { compose } from 'lodash/fp';
import PropTypes, { string } from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from "react-redux";
import { Col, Container, Row } from 'reactstrap';
import { setLoadingStatus } from '../../../redux/actions/loadingAction';
import store from '../../App/store';
import DataWidget from '../../DataWidget/DataWidget';
import NoData from '../../NoData';
import BetsStatistics from './components/BetsStatistics';
import BounceRateArea from './components/BounceRateArea';
import CompanyId from './components/CompanyId';
import LiquidityWalletWidget from './components/LiquidityWalletWidget';
import ProfitResume from './components/ProfitResume';
import RevenueChart from './components/RevenueChart';
import TurnoverResume from './components/TurnoverResume';
import VisitorsSessions from './components/VisitorsSessions';

class DefaultDashboard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isDeployed : false,
            periodicity : 'Daily',
            currency : {}
        }
    }

    componentDidMount(){
        const { history } = this.props;

        if (history && history.action === "POP") {
            this.asyncCalls();
        }
        
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData(props){
        const { profile, periodicity } = props;

        const app = profile.getApp();
        let isDeployed  =  !_.isUndefined(app.isDeployed());

        this.setState({...this.state, isDeployed, periodicity});
    }

    asyncCalls = async () => {
        const { profile } = this.props;

        store.dispatch(setLoadingStatus(true));
        await profile.getApp().getSummary();
        await profile.update();
        store.dispatch(setLoadingStatus(false));
    }

    render = () => {
        const { isDeployed } = this.state;
        const { periodicity, currency, isLoading, profile } = this.props;

        const revenue = profile.getApp().getSummaryData('revenue');
        const wallet = profile.getApp().getSummaryData('wallet');
        const users = profile.getApp().getSummaryData('games');
        const bets = profile.getApp().getSummaryData('bets');
                        
        return (
            <Fade in timeout={{ appear: 200, enter: 200, exit: 200 }}>
            <Container className="dashboard">   
                    <Row>
                        { wallet && (
                            <Col lg={3}>
                                <CompanyId currency={currency} app={this.props.profile.getApp()}  data={{
                                    wallet : wallet
                                }} />
                            </Col>
                        )}

                        { wallet && (
                            <Col lg={3}>
                                <DataWidget>
                                    <LiquidityWalletWidget currency={currency} isLoading={isLoading} data={wallet} />
                                </DataWidget>
                            </Col>
                        )}
                        
                        { revenue && wallet && (
                            <Col lg={3}>
                                <DataWidget>
                                    <ProfitResume currency={currency} periodicity={periodicity} isLoading={isLoading} data={{
                                        revenue : revenue,
                                        wallet : wallet,
                                        }} />
                                </DataWidget>
                            </Col> 
                        )}
                        
                        { revenue && wallet && (
                            <Col lg={3}>
                                <DataWidget>
                                    <TurnoverResume currency={currency} periodicity={periodicity} isLoading={isLoading} data={{
                                        revenue : revenue,
                                        wallet : wallet,
                                    }} />
                                </DataWidget>
                            </Col>
                        )}
                        
                    </Row>
                { isDeployed ? 
                    <div>
                        <Row>
                            { revenue && wallet && (
                                <Col lg={12}>
                                    <DataWidget>
                                        <RevenueChart currency={currency} periodicity={periodicity} isLoading={isLoading} data={{
                                            revenue : revenue,
                                            wallet : wallet,
                                        }} 
                                        />
                                    </DataWidget>
                                </Col>   
                            )}
                        </Row>
                        <Row>
                            { bets && wallet && (
                                <Col md={6}>
                                    <DataWidget>
                                        <BetsStatistics currency={currency} periodicity={periodicity} isLoading={isLoading} data={{
                                            bets : bets,
                                            wallet : wallet
                                            }}/>
                                    </DataWidget>
                                </Col>
                            )}

                            { !_.isNull(users.data) && (typeof users.data !== 'string') && bets && wallet && (
                                <Col md={6}>
                                    <DataWidget>
                                        <VisitorsSessions currency={currency} periodicity={periodicity} isLoading={isLoading} data={{
                                            users : users,
                                            bets : bets,
                                            wallet : wallet
                                        }}/>
                                    </DataWidget>
                                </Col>
                            )}
                           
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
        </Fade>
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

