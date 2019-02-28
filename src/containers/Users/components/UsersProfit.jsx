/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import Numbers from '../../../services/numbers';

class UsersProfit extends PureComponent {
 
    constructor() {
        super();
        this.state = {
        activeIndex: 0,
        };
    }

    render() {
        console.log(this.props.data.data) 
        
        let profit = getProfits(this.props.data.data)
        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget">
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-number-second" style={
                                {color : profit >= 0 ? '#76d076' : '#646777'}
                            }><AnimationNumber  number={profit}/> €</p>
                        </div>
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-title"> Users Profits <span> this week </span></p>
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
