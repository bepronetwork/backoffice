/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row , Button} from 'reactstrap';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import SettingsIcon from 'mdi-react/SettingsIcon';
import {Link} from 'react-router-dom';

import { ArrowDownIcon, ArrowCollapseDownIcon, ArrowUpDropCircleIcon } from 'mdi-react';
import ConverterSingleton from '../../../services/converter';
import Numbers from '../../../services/numbers';
const Ava = `${process.env.PUBLIC_URL}/img/dashboard/ethereum.png`;

class ETHWalletWidget extends PureComponent {
 
    constructor() {
        super();
        
    } 

    render() {        

        let {
            eth ,
            eth_usd
        } =  this.props.data.data;

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
                                    }><AnimationNumber decimals number={eth}/> ETH</p>
                                </div>
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-title"> <span style={{fontSize : 15}}>$ {Numbers.toMoney(eth_usd)}</span></p>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <Link to='/wallet/deposit' >
                                    <Button style={{margin : 0}} className="icon" outline><p><ArrowCollapseDownIcon className="deposit-icon"/> Deposit </p></Button>
                                </Link>
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
