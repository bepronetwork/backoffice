/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row , Button} from 'reactstrap';
import {  TickCircleIcon, DirectionsIcon } from 'mdi-react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp';
import TextInput from '../../../../../shared/components/TextInput';
import _ from 'lodash';
import {formatCurrency} from '../../../../../utils/numberFormatation';

const loading = `${process.env.PUBLIC_URL}/img/loading-dots.gif`;


const withdrawMessage = {
    '1' : {
        'message' : 'Asking Withdraw Permission..'
    },
    '5' : {
        'message' : 'Done!'
    },
}


class WithdrawBox extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            ticker : 'N/A',
            tokenAddress : 'N/A',
            playBalance : 0,
            amount : 100,
            toAddress : '',
            disabled : true
        };
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props)
    }

    projectData = (props) => {
        let { wallet } = props;
        const currency = wallet.currency;
        let tokenAddress = wallet.bank_address;

        this.setState({...this.state, 
            state : 1,
            image : currency.image,
            playBalance :  wallet.playBalance ? wallet.playBalance : this.state.houseLiquidity,
            ticker : currency.ticker ? currency.ticker : this.state.ticker,
            tokenAddressLink : wallet.link_url,
            tokenAddress,
            tokenAddressTrimmed : `${tokenAddress.substring(0, 6)}...${tokenAddress.substring(tokenAddress.length - 2)}`

        })
    }

    createTokenWithdraw = async  () => {
        try{
            const { amount, toAddress } = this.state;
            const { wallet } = this.props;
            const { currency } = wallet;

            this.props.disable();
            this.setState({...this.state, isLoading : true, state : 1});
            /* 3 -  Request Withdraw Platform */
            await this.props.profile.requestWithdraw({tokenAmount : parseFloat(amount), currency, toAddress});
            this.setState({...this.state, isLoading : false, state : 5});
            this.props.enable();
            return true;
        }catch(err){
            console.log(err)
            this.setState({...this.state, isLoading : false});
            this.props.enable();
            alert(err.message)
        }
    }

    changeContent = (type, item) => {
        this.setState({[type] : item});

        let toAddress = (type == 'toAddress') ? item : this.state.toAddress;
        let amount = (type == 'amount') ? item : this.state.amount;

        this.setState({disabled : amount && toAddress ? false : true});
    }

    render() {        
        const { amount, toAddress, image, disabled, isLoading, playBalance,
                ticker, tokenAddressLink, tokenAddressTrimmed, state} = this.state;

        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card style={{marginTop : 50}}>
                <CardBody className="dashboard__card-widget" >
                        <div  className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-title" style={{fontSize : 20, textAlign : 'center'}}> 
                                House Liquidity <span style={{fontSize : 20}}> {formatCurrency(parseFloat(playBalance))}</span> {ticker}
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
                                                defaultValue={amount}
                                                changeContent={this.changeContent}
                                            />
                                        </Col>
                                        <Col lg={6} style={{marginTop : 30}}>
                                            <p className="dashboard__visitors-chart-number-second" style={
                                                {color : '#646777'}
                                            }>
                                            {ticker}
                                            </p>
                                        </Col>
                                    </Row>   
                                    <Row>
                                        <Col lg={12}>
                                            <TextInput
                                                name="toAddress"
                                                label="Address"
                                                type="text"
                                                placeholder="Add address to withdraw"
                                                defaultValue={toAddress}
                                                changeContent={this.changeContent}
                                            />
                                        </Col>
                                    </Row> 
                                </div>
                                {
                                    tokenAddressLink ?
                                        <a target={'__blank'} className='ethereum-address-a' href={tokenAddressLink}>
                                            <p className="ethereum-address-name"> <DirectionsIcon className='icon-ethereum-address' />
                                                {tokenAddressTrimmed}
                                            </p>
                                        </a>
                                    :
                                        <p className="ethereum-address-name"> <DirectionsIcon className='icon-ethereum-address' />
                                            {tokenAddressTrimmed}
                                        </p>
                                }
                            </Col>
                            <div className='container' style={{textAlign : 'center'}}>
                                <Col lg={12} style={{margin : '10px auto', textAlign : 'center'}} >
                                    {!isLoading 
                                        ?   
                                            <Button 
                                            disabled={this.props.disabled || disabled}
                                            onClick={() => this.createTokenWithdraw()}  
                                            outline 
                                            className="primary" ><p>
                                                <TickCircleIcon className="deposit-icon"/> Submit </p>
                                            </Button>
                                        :   
                                            <div>
                                                <Row>
                                                    <Col lg={5}>
                                                        <Button disabled={true} outline className="primary" >
                                                            <p>
                                                                <TickCircleIcon className="deposit-icon"/> 
                                                                {state} 
                                                            </p>
                                                        </Button>
                                                    </Col>
                                                    <Col lg={2}>
                                                        <img className={'loading-dots'} src={loading}></img>
                                                    </Col>
                                                    <Col lg={5}>
                                                        <Button disabled={state != 5} className="secondary" >
                                                            <p>
                                                                Done
                                                            </p>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <p> 
                                                    {withdrawMessage[state].message}
                                                </p>
                                            </div>
                                    }
                                    
                                </Col>
                            </div>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

function mapStateToProps(state){
    console.log(state.profile);
    return {
        profile: state.profile,
        wallet : (state.wallet.currency) ? state.wallet : state.profile.getApp().getSummaryData('walletSimple').data[0]
    };
}

WithdrawBox.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    connect(mapStateToProps)
)(WithdrawBox);
