/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import AnimationNumber from '../../../UI/Typography/components/AnimationNumber';
import DashboardMapperSingleton from '../../../../services/mappers/Dashboard';
import _ from 'lodash';


const defaultProps = {
    turnover : '',
    ticker : 'No Currency Chosen',
    timeline  : 'this week'
}


class TurnoverResume extends PureComponent {
 
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
        let { periodicity, currency } = props;

        this.setState({...this.state, 
            turnover : data.revenue.data ? DashboardMapperSingleton.toDateRevenue(data.revenue.data) : defaultProps.turnover,
            ticker : currency.ticker ? currency.ticker : defaultProps.ticker,
            timeline : periodicity ? periodicity : defaultProps.timeline
        })
        
    }


    render() {
        const { currency } = this.props;
        return (
        <Col md={12} xl={12} lg={12} xs={12}>
            <Card>
                <CardBody className="dashboard__card-widget">
                    <div className="dashboard__visitors-chart">
                        <p className="dashboard__visitors-chart-number-second">
                        {!_.isEmpty(currency) ?
                            <AnimationNumber decimals={6} number={this.state.turnover}/> 
                            : null
                        }
                        <span> {this.state.ticker} </span> </p>
                    </div>
                    <div className="dashboard__visitors-chart">
                        <p className="dashboard__visitors-chart-title"> Turnover <span> {this.state.timeline} </span></p>
                    </div>
                </CardBody>
            </Card>
        </Col>
        );
    }
}

export default TurnoverResume;
