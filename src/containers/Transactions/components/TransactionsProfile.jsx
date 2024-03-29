/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import Numbers from '../../../services/numbers';

class UsersProfile extends PureComponent {
 
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
        let withdraws = this.props.data.data;

        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-number-second" style={
                                {color : '#646777'}
                            }><AnimationNumber decimals={0} number={withdraws.length}/></p>
                        </div>
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-title"> Total Withdraws <span> All </span></p>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default UsersProfile;
