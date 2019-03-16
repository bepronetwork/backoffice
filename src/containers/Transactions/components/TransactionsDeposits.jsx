/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import Numbers from '../../../services/numbers';

class TransactionsDeposits extends PureComponent {
 
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
        };
    }

    render() {        
        let depositAmount = getDepositsAmount(this.props.data.data)
        
        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget">
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-number-second" style={
                                {color : depositAmount >= 0 ? '#76d076' : '#646777'}
                            }><AnimationNumber number={depositAmount}/> €</p>
                        </div>
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-title"> Users Deposits <span> this week </span></p>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}



const getDepositsAmount = (data) => {
    return Object.keys(data).reduce( (acc, key) => {
        let amount = data[key].amountEUR ? data[key].amountEUR : 0;
        return acc + Numbers.toFloat(amount);
    }, 0);
}

export default TransactionsDeposits;
