/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import AnimationNumber from '../../../UI/Typography/components/AnimationNumber';
import DashboardMapperSingleton from '../../../../services/mappers/Dashboard';

const data = [
  { name: 'Page A', uv: 4000 },
  { name: 'Page B', uv: 3000 },
  { name: 'Page C', uv: 2000 },
  { name: 'Page D', uv: 2780 },
  { name: 'Page E', uv: 1890 },
  { name: 'Page F', uv: 2390 },
  { name: 'Page G', uv: 3490 },
  { name: 'Page H', uv: 2000 },
  { name: 'Page I', uv: 2780 },
  { name: 'Page J', uv: 1890 },
];

class ProfitResume extends PureComponent {
 
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
        let profit = DashboardMapperSingleton.toDateProfit(this.props.data);
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
                        <p className="dashboard__visitors-chart-title"> Profit <span> this week </span></p>
                    </div>
                </CardBody>
            </Card>
        </Col>
        );
    }
}

export default ProfitResume;
