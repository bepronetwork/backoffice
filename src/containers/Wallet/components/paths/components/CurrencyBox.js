/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row , Button} from 'reactstrap';
import {  BarcodeIcon, TickCircleIcon, DirectionsIcon } from 'mdi-react';
import AnimationNumber from '../../../../UI/Typography/components/AnimationNumber';
import ConverterSingleton from '../../../../../services/converter';
import QRCodeContainer from './QRCode';
import AddressBox from './AddressBox';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import ReciptBox from './ReciptBox';
const Ava = `${process.env.PUBLIC_URL}/img/ethereum.png`;



const defaultProps = {
    playBalance : 'N/A',
    ticker : 'N/A',
    liquidity : 0,
    platformBlockchain : 'N/A'
}




class CurrencyBox extends PureComponent {

    constructor(props){
        super(props);
        this.state = { ...defaultProps};
        this.projectData(props);

        this.deposit_buttons = {
            ethereum : (amount, address) => {
                return (
                    <Button onClick={() => this.createTokenTransfer('eth', amount, address)}  outline className="primary" ><p><TickCircleIcon className="deposit-icon"/> Metamask </p></Button>
                )
            }
        }
    }

    componentDidMount(){
        this.projectData(this.props)
    }


    createTokenTransfer = async  (currency, amount, address) => {
        // TO DO : Create generateTokenTransfer Function in App via this infocmation
        let res = await this.props.profile.getApp().generateTokenTransfer(currency, amount, address);
        // TO DO : Finalize Work
    }


    projectData = (props) => {
        let data = props.profile.getApp().getSummaryData('wallet').data;
        let app = props.profile.getApp();
        let tokenAddress = data.blockchain.tokenAddress;
        let platformAddress = app.getInformation('platformAddress');

        this.setState({...this.state, 
            referenceAddress : '0x',
            generatedReference : false,
            liquidity : data.blockchain.totalLiquidity,
            ticker : data.blockchain.ticker ? data.blockchain.ticker : defaultProps.ticker,
            platformAddress  :`${platformAddress.substring(0, 6)}...${platformAddress.substring(platformAddress.length - 2)}`,
            platformBlockchain : app.getInformation('platformBlockchain') ? app.getInformation('platformBlockchain') : defaultProps.platformBlockchain,
            platformAddressLink : 'https://ropsten.etherscan.io/token/' + data.blockchain.tokenAddress,
            tokenAddress :  `${tokenAddress.substring(0, 6)}...${tokenAddress.substring(tokenAddress.length - 2)}`
        })
    }

    getAsyncCalls = async (props) => {
        //let usd = await ConverterSingleton.fromETHtoUsd(props.data.eth);
    }

    setTimer = () => {
        //window.setInterval( () => {this.confirmDeposit()}, 2000);
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
                                    }><AnimationNumber decimals number={this.state.liquidity}/> {this.state.ticker}</p>
                                </div>
                                <a target={'__blank'} className='ethereum-address-a' href={this.state.platformAddressLink}>
                                    <p className="ethereum-address-name"> <DirectionsIcon className='icon-ethereum-address' />{this.state.tokenAddress}</p>
                                </a>
                              
                            </Col>
                            <div className='container' style={{textAlign : 'center'}}>
                                {!this.state.confirmedDeposit ?
                                    <Col lg={12} style={{margin : '10px auto', textAlign : 'center'}} >
                                        <QRCodeContainer value={this.state.platformBlockchain}/>
                                        <AddressBox value={this.state.platformAddress}/>
                                        <hr></hr>
                                        <Button disabled={true} onClick={() => this.confirmDeposit()}  outline className="primary" ><p><TickCircleIcon className="deposit-icon"/> Waiting for Deposit...</p></Button>
                                        {this.deposit_buttons.ethereum()}
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

CurrencyBox.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    connect(mapStateToProps)
)(CurrencyBox);
