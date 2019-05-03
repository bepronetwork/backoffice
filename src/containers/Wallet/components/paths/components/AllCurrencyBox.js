/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row , Button} from 'reactstrap';
import {  BarcodeIcon, TickCircleIcon } from 'mdi-react';
import AnimationNumber from '../../../../UI/Typography/components/AnimationNumber';
import ConverterSingleton from '../../../../../services/converter';
import QRCodeContainer from './QRCode';
import AddressBox from './AddressBox';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import ReciptBox from './ReciptBox';
const Ava = `${process.env.PUBLIC_URL}/img/ethereum.png`;

class AllCurrencyBox extends PureComponent {
 
    constructor() {
        super();
        this.state = {
            usd : 0,
            referenceAddress : '0x',
            generatedReference : false
        };
    }

    componentWillReceiveProps(props){
        this.getAsyncCalls(props);
    }

    getAsyncCalls = async (props) => {
        let usd = await ConverterSingleton.fromETHtoUsd(props.data.eth);
        this.setState({...this.state, usd : usd});
    }

    handleClick = (index) => {
        this.setState({
            activeIndex: index,
        });
    };

    setTimer = () => {
        window.setInterval( () => {this.confirmDeposit()}, 2000);
    }

    getReference = async () => {
        // TO DO : Change ETH to the Currency Type;
        let data = await this.props.profile.getDepositReference({currency : 'eth'});
        let {address, id} = data;
        this.setState({...this.state, id, referenceAddress : address, generatedReference : true});
        this.setTimer()
    }

    confirmDeposit = async () => {
        // TO DO : Change ETH to the Currency Type;
        let data = await this.props.profile.getDepositInfo({id : this.state.id});
        let {
            confirmed,
            amount,
            timestamp,
            block
        } = data;
        let usd_amount = await ConverterSingleton.fromETHtoUsd(amount);
        this.setState({...this.state, 
            confirmedDeposit : confirmed,
            recipt : {
                confirmedDeposit : confirmed, 
                amount, timestamp, block, usd_amount
            }
        });
    }

    render() {        
        let eth = this.props.data.eth;

        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget" >
                        <Row>
                            <Col lg={3}>
                                <img style={{borderRadius : 0}} className="company-logo-card" src={Ava} alt="avatar" />
                            </Col>
                            <Col lg={9}>
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-number-second" style={
                                        {color : '#646777'}
                                    }><AnimationNumber decimals number={eth}/> ETH</p>
                                </div>
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-title"> <AnimationNumber decimals number={this.state.usd}/> <span> EUR </span></p>
                                </div>
                            </Col>
                            <div className='container' style={{textAlign : 'center'}}>
                                {!this.state.generatedReference ? 
                                    <Col lg={12} style={{marginTop : 30}}>
                                        <Button onClick={() => this.getReference()} style={{margin : 0, marginTop : 10}} outline className="primary" ><p><BarcodeIcon className="deposit-icon"/>  Generate Reference </p></Button>
                                    </Col>
                                :
                                    !this.state.confirmedDeposit ?
                                        <Col lg={12} style={{margin : '10px auto', textAlign : 'center'}} >
                                            <QRCodeContainer value={this.state.referenceAddress}/>
                                            <AddressBox value={this.state.referenceAddress}/>
                                            <hr></hr>
                                            <Button disabled={true} onClick={() => this.confirmDeposit()}  outline className="primary" ><p><TickCircleIcon className="deposit-icon"/> Waiting for Deposit...</p></Button>
                                        </Col>
                                    :   
                                        <ReciptBox recipt={this.state.recipt}/>
                                }

                            </div>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

AllCurrencyBox.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    connect(mapStateToProps)
)(AllCurrencyBox);
