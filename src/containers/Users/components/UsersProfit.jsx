/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import Numbers from '../../../services/numbers';



const defaultProps = {
    profit : '0',
    ticker : 'N/A',
    timeline  : 'this week'
}


class UsersProfit extends PureComponent {
    
    constructor(props){
        super(props);
        this.state = { ...defaultProps};
        this.projectData(props);
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    projectData = (props) => {
        let data = props.data;

        this.setState({...this.state, 
            profit : data.users.data ? getProfits(data.users.data) : defaultProps.turnover,
            ticker : data.wallet.data.blockchain.ticker ? data.wallet.data.blockchain.ticker : defaultProps.ticker,
            timeline : data.revenue.data ? defaultProps.timeline : defaultProps.timeline
        })
    }


    render() {        

        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget">
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-number-second" style={
                                {color : this.state.profit >= 0 ? '#76d076' : '#646777'}
                            }><AnimationNumber  number={this.state.profit}/> <span> {this.state.ticker}</span></p>
                        </div>
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-title"> Users Profits <span> {this.state.timeline} </span></p>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}



const getProfits = (users) => {
    return Object.keys(users).reduce( (acc, key) => {
        console.log(Numbers.toFloat(users[key].profit));
        return acc+ Numbers.toFloat(users[key].profit);
    }, 0);
}

export default UsersProfit;
