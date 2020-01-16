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
import { ETHEREUM_NET_DEFAULT } from '../../../../../config/apiConfig';
const Ava = `${process.env.PUBLIC_URL}/img/dashboard/ethereum.png`;
const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;



const defaultProps = {
    playBalance : 'N/A',
    ticker : 'N/A',
    platformAddress : 'N/A',
    houseLiquidity : 0,
    image : 'N/A',
    amount : 100,
    platformBlockchain : 'N/A'
}




class CurrencyBox extends PureComponent {

    constructor(props){
        super(props);
        this.state = { ...defaultProps};
        this.projectData(props);
    }

    componentDidMount(){
        this.projectData(this.props)
    }


    createTokenTransfer = async  ({amount}) => {
        try{
            const { wallet } = this.props;
            this.setState({...this.state, isLoading : true});

            let contract = await this.props.profile.getApp().getContract({
                currency : wallet.currency, 
                bank_address : wallet.bank_address
            });

            let eth_res = await contract.sendTokensToCasinoContract({
                amount : parseFloat(amount)
            });
            if(eth_res.status){
                /* Transaction was succeded */
                await this.confirmWalletUpdate({amount : parseFloat(amount), transactionHash : eth_res.transactionHash, currency : wallet.currency});
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

        let { wallet } = props;
        const currency = wallet.currency;
        let tokenAddress = wallet.currency.address;
        let platformAddress = wallet.bank_address;

        this.setState({...this.state, 
            decimals : wallet.currency.decimals,
            image : currency.image,
            playBalance :  wallet.playBalance ? wallet.playBalance : defaultProps.houseLiquidity,
            ticker : currency.ticker ? currency.ticker : defaultProps.ticker,
            platformAddress : platformAddress ? platformAddress : defaultProps.platformAddress,
            platformAddressLink : `https://${ETHEREUM_NET_DEFAULT}.etherscan.io/token/` + tokenAddress,
            tokenAddress :  tokenAddress,
            tokenAddressTrimmed : `${tokenAddress.substring(0, 6)}...${tokenAddress.substring(tokenAddress.length - 2)}`

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


    confirmWalletUpdate = async ({amount, transactionHash, currency}) => {
        try{
            let res = await this.props.profile.getApp().updateWallet({amount, transactionHash, currency_id : currency._id});
            await this.props.profile.getApp().getSummary();
            await this.props.profile.update();
            return res;
        }catch(err){
            // TO DO : Raise Notification System
            throw err;
        }
    }


    changeContent = (type, item) => {
        this.setState({[type] : item});
    }

    render() {        
        const { image } = this.state;

        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card style={{marginTop : 50}}>
                    <CardBody className="dashboard__card-widget" >
                        <div  className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-title" style={{fontSize : 20, textAlign : 'center'}}> 
                                House Liquidity <span style={{fontSize : 20}}> {this.state.playBalance}</span> {this.state.ticker}
                            </p>
                            <hr></hr>
                        </div>
                        <Row>
                            <Col lg={3}>
                                <img style={{borderRadius : 0}} className="company-logo-card" src={image} alt="avatar" />
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
                                        <QRCodeContainer value={this.state.platformAddress}/>
                                        <AddressBox value={this.state.platformAddress}/>
                                        <hr></hr>
                                        {!this.state.isLoading 
                                            ?   
                                                <Button onClick={() => this.createTokenTransfer({ amount : this.state.amount})}  outline className="primary" ><p><TickCircleIcon className="deposit-icon"/> Metamask </p></Button>
                                            :   
                                                <Button disabled={true} outline className="primary" >
                                                    <p><TickCircleIcon className="deposit-icon"/> Waiting for Deposit...</p>
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
        profile: state.profile,
        wallet : state.wallet
    };
}

CurrencyBox.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    connect(mapStateToProps)
)(CurrencyBox);
