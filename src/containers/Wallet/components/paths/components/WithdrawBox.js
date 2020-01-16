/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row , Button} from 'reactstrap';
import {  BarcodeIcon, TickCircleIcon, DirectionsIcon } from 'mdi-react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import ReciptBox from './ReciptBox';
import TextInput from '../../../../../shared/components/TextInput';
import { ETHEREUM_NET_DEFAULT } from '../../../../../config/apiConfig';
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
            platformAddress : 'N/A',
            playBalance : 0,
            amount : 100
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
        let tokenAddress = wallet.currency.address;
        let platformAddress = wallet.bank_address;

        this.setState({...this.state, 
            state : 1,
            image : currency.image,
            playBalance :  wallet.playBalance ? wallet.playBalance : this.state.houseLiquidity,
            ticker : currency.ticker ? currency.ticker : this.state.ticker,
            platformAddress : platformAddress ? platformAddress : this.state.platformAddress,
            platformAddressLink : `https://${ETHEREUM_NET_DEFAULT}.etherscan.io/token/` + tokenAddress,
            tokenAddress :  tokenAddress,
            tokenAddressTrimmed : `${tokenAddress.substring(0, 6)}...${tokenAddress.substring(tokenAddress.length - 2)}`

        })
    }

    createTokenWithdraw = async  ({amount}) => {
        try{
            const { wallet } = this.props;
            const { currency } = wallet;

            this.props.disable();
            this.setState({...this.state, isLoading : true, state : 1});
            /* 3 -  Request Withdraw Platform */
            await this.props.profile.requestWithdraw({tokenAmount : parseFloat(amount), currency});
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
    }

    render() {        
        const { amount, image } = this.state;

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
                                                defaultValue={amount}
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
                                                <Button 
                                                disabled={this.props.disabled}
                                                onClick={() => this.createTokenWithdraw({amount})}  
                                                outline 
                                                className="primary" ><p>
                                                    <TickCircleIcon className="deposit-icon"/> Metamask </p>
                                                </Button>
                                            :   
                                                <div>
                                                    <Row>
                                                        <Col lg={5}>
                                                            <Button disabled={true} outline className="primary" >
                                                                <p>
                                                                    <TickCircleIcon className="deposit-icon"/> 
                                                                    {this.state.state} 
                                                                </p>
                                                            </Button>
                                                        </Col>
                                                        <Col lg={2}>
                                                            <img className={'loading-dots'} src={loading}></img>
                                                        </Col>
                                                        <Col lg={5}>
                                                            <Button disabled={this.state.state != 5} className="secondary" >
                                                                <p>
                                                                    Done
                                                                </p>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                    <p> 
                                                        {withdrawMessage[this.state.state].message}
                                                    </p>
                                                </div>
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

WithdrawBox.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    connect(mapStateToProps)
)(WithdrawBox);
