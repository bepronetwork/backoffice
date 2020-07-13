/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import Numbers from '../../../services/numbers';
import Skeleton from '@material-ui/lab/Skeleton';
import _ from 'lodash';
import { compose } from 'lodash/fp';
import { translate } from 'react-i18next';
import { connect } from "react-redux";

class AverageReturn extends PureComponent {
 
    constructor() {
        super();
        this.state = {
        bets: [],
        periodicity: 'all',
        average: 0
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { profile, periodicity, currency } = props;

        const data = await profile.getApp().getSummaryData('bets');

        if (!_.isEmpty(data.data)) {
            const bets = await this.getAllBets(data.data);

            this.setState({
                bets: bets,
                periodicity: periodicity,
                currency: currency,
                average: bets.avg_bet_return
            })
        } else {
            this.setState({
                bets: [],
                periodicity: periodicity,
                currency: currency,
                average: 0
            })
        }

    }

    handleClick = (index) => {
        this.setState({
            activeIndex: index,
        });
    };

    getAllBets(data) {

        let allBets = {};
    
        const betsOnPeriodicity = data.map(index => index.bets);
        const concatBets = [].concat(...betsOnPeriodicity);
    
        const betsAmont = concatBets.length;
    
        const combined = [...concatBets].reduce((a, obj) => {
            Object.entries(obj).forEach(([key, val]) => {
              a[key] = (a[key] || 0) + val;
            });
            return a;
          });
    
        allBets.avg_bet = combined.avg_bet / betsAmont;
        allBets.avg_bet_return = combined.avg_bet_return / betsAmont;
        allBets.won = combined.won;
        allBets.amount = combined.amount;
        allBets.percentage_won = allBets.amount === 0 ? 0 : allBets.won / allBets.amount;
        
        return allBets;
    
    }

    render() {  

        const { isLoading } = this.props;
        const { average, periodicity, currency } = this.state;

        if (!currency) {return null}
        
        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                    {isLoading ? (
                    <Skeleton variant="rect" height={29} style={{ marginTop: 10, marginBottom: 10 }}/> 
                    ) : ( 
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-number-second" style={
                                {color : average >= 0 ? '#76d076' : '#646777'}
                            }>
                                <AnimationNumber decimals={6} number={average}/>
                                <span className="dashboard__visitors-chart-title"> {currency.ticker} </span>
                            </p>
                        </div>)}
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-title"> Average Return (No Fee) <span> {periodicity} </span></p>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}


function mapStateToProps(state){
    return {
        profile: state.profile,
        periodicity: state.periodicity,
        currency: state.currency,
        isLoading: state.isLoading
    };
}


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(AverageReturn);