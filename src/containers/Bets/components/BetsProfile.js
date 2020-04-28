/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import Numbers from '../../../services/numbers';
import _ from 'lodash';
import Skeleton from '@material-ui/lab/Skeleton';
import { compose } from 'lodash/fp';
import { translate } from 'react-i18next';
import { connect } from "react-redux";

class BetsProfile extends PureComponent {
 
    constructor() {
        super();
        this.state = {
        bets: [],
        periodicity: 'all',
        betsAmount: 0
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { periodicity, profile } = props;

        const data = await profile.getApp().getSummaryData('bets');

        if (!_.isEmpty(data.data)) {
            const bets = await this.getAllBets(data.data);

            this.setState({
                bets: bets,
                periodicity: periodicity,
                betsAmount: bets.amount
            })
        } else {
            this.setState({
                bets: [],
                periodicity: periodicity,
                betsAmount: 0
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
        const { betsAmount, periodicity } = this.state;

        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget">
                    {isLoading ? (
                    <Skeleton variant="rect" height={29} style={{ marginTop: 10, marginBottom: 10 }}/> 
                    ) : ( 
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-number-second" style={
                                {color : betsAmount >= 0 ? '#76d076' : '#646777'}
                            }>
                                <AnimationNumber decimals={0} number={betsAmount}/>  
                            </p>
                        </div>)}
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-title"> Total Bets <span> {periodicity} </span></p>
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
)(BetsProfile);