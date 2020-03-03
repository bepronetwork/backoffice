/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import Numbers from '../../../services/numbers';

class PlatformCostsInfo extends PureComponent {
 
    constructor() {
        super();
        this.state = {
        activeIndex: 0,
        };
    }

    handleClick = (index) => {
        this.setState({
        activeIndex: index,
        });
    };

    render() {
        
        let costs = 456;

        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget">
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-number-second" style={
                                {color : '#646777'}
                            }><AnimationNumber decimals={2} number={costs}/> €</p>
                        </div>
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-title"> Costs <span> this week </span></p>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default PlatformCostsInfo;
