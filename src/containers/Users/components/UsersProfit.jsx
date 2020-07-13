/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import Skeleton from '@material-ui/lab/Skeleton';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import Numbers from '../../../services/numbers';
import { connect } from "react-redux";
import _ from 'lodash';

const defaultProps = {
    profit : '0',
    ticker : 'No Currency Chosen',
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

    componentWillReceiveProps(props){
        this.projectData(props);
    }
    
    projectData = (props) => {
        let data = props.data;
        const { currency }  = props;

        this.setState({...this.state, 
            profit : data.users.data ? getProfits(data.users.data) : defaultProps.turnover,
            ticker : currency.ticker ? currency.ticker : defaultProps.ticker,
            timeline : data.revenue.data ? defaultProps.timeline : defaultProps.timeline
        })
    }


    render() {        
        const { currency, isLoading, periodicity } = this.props;
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
                                <AnimationNumber decimals={6}  number={parseFloat(this.state.profit)}/>  
                                : null
                            }
                            <span> {this.state.ticker}</span></p>
                        </div>)}
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-title"> Users Profits <span> {periodicity} </span></p>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}



const getProfits = (users) => {
    return Object.keys(users).reduce( (acc, key) => {
        return acc + parseFloat(users[key].profit);
    }, 0);
}

function mapStateToProps(state){
    return {
        profile: state.profile,
        currency : state.currency,
        periodicity: state.periodicity
    };
}

export default connect(mapStateToProps)(UsersProfit);

