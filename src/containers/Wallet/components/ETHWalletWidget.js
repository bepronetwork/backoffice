/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row , Button} from 'reactstrap';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import SettingsIcon from 'mdi-react/SettingsIcon';
import { ArrowDownIcon, ArrowCollapseDownIcon, ArrowUpDropCircleIcon } from 'mdi-react';
const Ava = `${process.env.PUBLIC_URL}/img/ethereum.png`;

class ETHWalletWidget extends PureComponent {
 
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
        console.log(this.props.data)
        let eth = this.props.data.eth;
        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget " style={{borderTop : '6px solid dimgrey'}}>
                        <Row>
                            <Col lg={3}>
                                <img style={{borderRadius : 0}} className="company-logo-card" src={Ava} alt="avatar" />
                            </Col>
                            <Col lg={5}>
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-number-second" style={
                                        {color : '#646777'}
                                    }><AnimationNumber number={eth}/> ETH</p>
                                </div>
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-title"> ETH <span> Available </span></p>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <Button style={{margin : 0}} className="icon" outline><p><ArrowCollapseDownIcon className="deposit-icon"/> Deposit </p></Button>
                                <Button style={{margin : 0, marginTop : 10}} className="icon" ><p><ArrowUpDropCircleIcon className="deposit-icon"/> Convert </p></Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default ETHWalletWidget;
