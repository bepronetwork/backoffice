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
import TextInput from '../../../../../shared/components/TextInput';
import Numbers from '../../../../../services/numbers';
const Ava = `${process.env.PUBLIC_URL}/img/ethereum.png`;
const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;



const defaultProps = {
    playBalance : 'N/A',
    ticker : 'N/A',
    platformAddress : 'N/A',
    liquidity : 0,
    amount : 100,
    platformBlockchain : 'N/A'
}




class WithdrawBox extends PureComponent {

    constructor(props){
        super(props);
        this.state = { ...defaultProps};
        this.projectData(props);

        this.deposit_buttons = {
            ethereum : (amount, platformAddress, tokenAddress) => {
                return (
                    <Button onClick={() => this.createTokenWithdraw({
                        currency : 'eth', 
                        amount, 
                        platformAddress, 
                        tokenAddress })}  outline className="primary" ><p><TickCircleIcon className="deposit-icon"/> Metamask </p></Button>
                )
            }
        }
    }

    componentDidMount(){
        this.projectData(this.props)
    }


    createTokenWithdraw = async  ({currency, amount, platformAddress, tokenAddress}) => {
        try{
            this.setState({...this.state, isLoading : true})
            // TO DO : Create generateTokenTransfer Function in App via this infocmation
            let eth_res = await this.props.profile.getApp().createTokenWithdraw({
                currency, 
                amount : Numbers.toFloat(amount), 
                platformAddress, 
                tokenAddress,
                decimals : this.state.decimals
            });
            console.log(eth_res)

            if(eth_res.status){
                /* Transaction was succeded */
                await this.confirmWalletUpdate(amount);
            }else{
                // TO DO : Undertand why it didn´t succed
                throw new Error('Transaction was not succeded')
            }

            this.setState({...this.state, isLoading : false});
            return true;
            // TO DO : Finalize Work
        }catch(err){
            console.log(err)
            this.setState({...this.state, isLoading : false});
            // TO DO : Create Better Messaging System for this
            alert(err.message)
        }
    }


    projectData = (props) => {

        let data = props.profile.getApp().getSummaryData('wallet').data;
        let app = props.profile.getApp();
        let tokenAddress = data.blockchain.tokenAddress;
        let platformAddress = app.getInformation('platformAddress');

        this.setState({...this.state, 
            referenceAddress : '0x',
            generatedReference : false,
            decimals : data.blockchain.decimals,
            houseBlockchainBalance :  data.blockchain.houseBalance,
            ticker : data.blockchain.ticker ? data.blockchain.ticker : defaultProps.ticker,
            platformAddress : platformAddress ? platformAddress : defaultProps.platformAddress,
            platformBlockchain : app.getInformation('platformBlockchain') ? app.getInformation('platformBlockchain') : defaultProps.platformBlockchain,
            platformAddressLink : 'https://ropsten.etherscan.io/token/' + data.blockchain.tokenAddress,
            tokenAddress :  tokenAddress,
            tokenAddressTrimmed : `${tokenAddress.substring(0, 6)}...${tokenAddress.substring(tokenAddress.length - 2)}`

        })
    }


    confirmWalletUpdate = async (amount) => {
        try{
            return await this.props.profile.getApp().updateWallet(amount);
        }catch(err){
            // TO DO : Raise Notification System
            throw err;
        }
    }
    

    changeContent = (type, item) => {
        this.setState({[type] : item});
    }

    render() {        

        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget" >
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-title" style={{fontSize : 20, textAlign : 'center'}}> 
                                House Liquidity <span style={{fontSize : 20}}> {this.state.houseBlockchainBalance}</span> {this.state.ticker}
                            </p>
                            <hr></hr>
                        </div>
                        <Row>
                            <Col lg={3}>
                                <img style={{borderRadius : 0}} className="company-logo-card" src={Ava} alt="avatar" />
                            </Col>
                            <Col lg={9}>
                                <div className="dashboard__visitors-chart">
                               
                                    <Row>
                                        <Col lg={6}>
                                            <TextInput
                                                name="amount"
                                                label="Amount"
                                                type="number"
                                                placeholder="100"
                                                defaultValue={this.state.amount}
                                                changeContent={this.changeContent}
                                            />
                                        </Col>
                                        <Col lg={6} style={{marginTop : 30}}>
                                            <p className="dashboard__visitors-chart-number-second" style={
                                                {color : '#646777'}
                                            }>
                                            {this.state.ticker}
                                            </p>
                                        </Col>
                                    </Row>   
                                </div>
                                <a target={'__blank'} className='ethereum-address-a' href={this.state.platformAddressLink}>
                                    <p className="ethereum-address-name"> <DirectionsIcon className='icon-ethereum-address' />
                                        {this.state.tokenAddressTrimmed}
                                    </p>
                                </a>
                              
                            </Col>
                            <div className='container' style={{textAlign : 'center'}}>
                                {!this.state.confirmedDeposit ?
                                    <Col lg={12} style={{margin : '10px auto', textAlign : 'center'}} >
                                        {!this.state.isLoading 
                                            ?   
                                                this.deposit_buttons.ethereum(this.state.amount, this.state.platformAddress, this.state.tokenAddress)
                                            :   
                                                <Button disabled={true} outline className="primary" >
                                                    <p><TickCircleIcon className="deposit-icon"/> Waiting for Transaction to Finalize...</p>
                                                </Button>
                                        }
                                        
                                    </Col>
                                :   
                                    <ReciptBox isLoading={this.state.isLoading} recipt={this.state.recipt}/>
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

WithdrawBox.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    connect(mapStateToProps)
)(WithdrawBox);
