/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import AnimatedNumber from 'react-animated-number/build/AnimatedNumber';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
const Ava = `${process.env.PUBLIC_URL}/img/brand.jpg`;


class LiquidityInfo extends PureComponent {
    static propTypes = {
        t: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
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
        const { activeIndex } = this.state;
        const app = this.props.app;
        
        return (
            <Col md={12} lg={12} xl={12} >
                <Card>
                    <Row>
                        <Col lg={6}>
                            <h4 style={{marginTop : 20}} className={"bold-text dashboard__total-stat"}>Application</h4>
                            <p className="">
                                Current Liquidity
                            </p>
                        </Col>
                    </Row>
                </Card>
            </Col>
        );
    }
}

export default translate('common')(LiquidityInfo);
