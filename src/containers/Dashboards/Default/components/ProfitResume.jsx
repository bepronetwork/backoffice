/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import Skeleton from '@material-ui/lab/Skeleton';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import AnimationNumber from '../../../UI/Typography/components/AnimationNumber';
import DashboardMapperSingleton from '../../../../services/mappers/Dashboard';
import { emptyObject } from '../../../../lib/misc';
import _ from 'lodash';

const defaultProps = {
    profit : '',
    ticker : 'No Currency Chosen',
    timeline  : 'this week'
}


class ProfitResume extends PureComponent {
 
    constructor(props){
        super(props);
        this.state = { ...defaultProps};
        this.projectData(props);
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = (props) => {
        let data = props.data;
        let { periodicity, currency }  = props;

        if(emptyObject(currency)){return null};

        this.setState({...this.state, 
            profit : data.revenue.data ? DashboardMapperSingleton.toDateProfit(data.revenue.data) : defaultProps.profit,
            timeline : periodicity ? periodicity : defaultProps.timeline,
            ticker : currency.ticker ? currency.ticker : defaultProps.ticker
        })
    }


  
    render() {
        const { currency, isLoading } = this.props;

        return (
        <Col md={12} xl={12} lg={12} xs={12}>
            <Card>
                <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                    {isLoading ? (
                    <Skeleton variant="rect" height={29} style={{ marginTop: 10, marginBottom: 10 }}/> 
                    ) : ( 
                    <div className="dashboard__visitors-chart">
                        <p className="dashboard__visitors-chart-number-second" style={
                            {color : this.state.profit >= 0 ? '#76d076' : '#646777'}
                        }>
                        {!_.isEmpty(currency) ?
                            <AnimationNumber decimals={6} number={this.state.profit}/> 
                            : null
                        }
                        <span style={ {color : this.state.profit >= 0 && !_.isEmpty(currency) ? '#76d076' : '#646777'}}> {this.state.ticker}</span> </p>
                    </div> )}
                    
                    <div className="dashboard__visitors-chart">
                        <p className="dashboard__visitors-chart-title"> Profit <span> {this.state.timeline}</span></p>
                    </div>
                </CardBody>
            </Card>
        </Col>
        );
    }
}

export default ProfitResume;

