/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import AnimationNumber from '../../../UI/Typography/components/AnimationNumber';
import DashboardMapperSingleton from '../../../../services/mappers/Dashboard';

const defaultProps = {
    profit : '0',
    ticker : 'N/A',
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
        let periodicity = props.periodicity;
        
        if(data.wallet.data && data.wallet.data.blockchain){
            this.setState({...this.state, 
                profit : data.revenue.data ? DashboardMapperSingleton.toDateProfit(data.revenue.data) : defaultProps.profit,
                ticker : data.wallet.data.blockchain.ticker ? data.wallet.data.blockchain.ticker : defaultProps.ticker,
                timeline : periodicity ? periodicity : defaultProps.timeline
            })
        }
       
    }


  
    render() {
        return (
        <Col md={12} xl={12} lg={12} xs={12}>
            <Card>
                <CardBody className="dashboard__card-widget">
                    <div className="dashboard__visitors-chart">
                        <p className="dashboard__visitors-chart-number-second" style={
                            {color : this.state.profit >= 0 ? '#76d076' : '#646777'}
                        }><AnimationNumber  number={this.state.profit}/> 
                        <span style={ {color : this.state.profit >= 0 ? '#76d076' : '#646777'}}> {this.state.ticker}</span> </p>
                    </div>
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
