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
import DataWidget from '../DataWidget/DataWidget';
import ProfitResume from './components/ProfitResume';
import TurnoverResume from './components/TurnoverResume';


class StatsContainer extends React.Component{

    constructor(props){
        super(props)
    }


    render = () => {
        const { currency, isLoading, periodicity } = this.props;

        return (
            <Container className="dashboard">
                <Row>
                  
                    <Col lg={3}>
                        <DataWidget>
                            <LiquidityInfo currency={currency} isLoading={isLoading} data={this.props.profile.getApp().getSummaryData('wallet')}/>
                        </DataWidget>
                    </Col>
                    <Col lg={3}>
                        <DataWidget>
                            <ProfitResume currency={currency} isLoading={isLoading} periodicity={periodicity} data={{
                                revenue : this.props.profile.getApp().getSummaryData('revenue'),
                                wallet : this.props.profile.getApp().getSummaryData('wallet'),
                                }}/>
                        </DataWidget>
                    </Col>
                    <Col lg={3}>
                     <DataWidget>
                            <TurnoverResume currency={currency} isLoading={isLoading} periodicity={periodicity} data={{
                                revenue : this.props.profile.getApp().getSummaryData('revenue'),
                                wallet : this.props.profile.getApp().getSummaryData('wallet'),
                            }} />
                        </DataWidget>
                    </Col>
                   
                </Row>
                <Row>
                    <Col lg={12}>
                        <DataWidget>
                            <RevenueChart  
                                currency={currency}
                                isLoading={isLoading}
                                data={{
                                    revenue : this.props.profile.getApp().getSummaryData('revenue'),
                                    wallet : this.props.profile.getApp().getSummaryData('wallet'),
                                }}  
                            />
                        </DataWidget>
                    </Col>
                </Row>
                <Row>
                     {/* <Col lg={6}>
                        <DataWidget>
                            <DepositsWidget/>
                        </DataWidget>
                            </Col> */}
                   
                </Row>
            </Container>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile,
        currency : state.currency,
        periodicity: state.periodicity,
        isLoading: state.isLoading
    };
}

StatsContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(StatsContainer);

