import React from 'react';
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import { connect } from "react-redux";
import _ from 'lodash';
import { UpdateIcon, DirectionsIcon } from 'mdi-react';
import { Progress } from 'reactstrap';
import Numbers from '../../../services/numbers';
import { ETHERSCAN_URL } from '../../../lib/etherscan';
import { AddressConcat } from '../../../lib/string';
const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;


const DEPLOYMENT_CONFIG = {
    none        : {
        isSet : true,
        message : 'Ready for Updating'
    },
    pauseContract  : {
        isSet : false,
        message : 'Pausing Contract'
    },
    withdrawAllFunds  : {
        isSet : false,
        message : 'Withdrawing the Funds to Contract Transfer'
    },
    deployContract  : {
        isSet : false,
        message : 'Smart-Contract Deployment being done...'
    },
    authorizeAddress : {
        isSet : false,
        message : 'Authorize Address to Control the App'
    },
    authorizeCroupier : {
        isSet : false,
        message : 'Authorize Croupier Address'
    },
    moveFundsToNewContract : {
        isSet : false,
        message : 'Move Funds to New Contract'
    },
    done : {
        isSet : false,
        message : 'Done with Success!'
    },
}


const defaultState = {
    isPaused : false,
    locks : {},
    tokens : [],
    currencyTicker : 'N/A',
    locks : {
       
    },
    progress : 0,
    deploymentConfig : DEPLOYMENT_CONFIG,
    deploymentState : DEPLOYMENT_CONFIG['none'].message,
    isLoading : false
}


class TokenManager extends React.Component{

    constructor(props){
        super(props);
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }
    
    projectData = async (props) => {
        const { profile } = this.props;
        let currencyTicker = props.profile.getApp().getCurrencyTicker();
        let isPaused = await props.profile.getApp().isPaused(); 
        let totalAmount = await props.profile.getApp().totalDecentralizedLiquidity(); 
        const tokens = (await profile.getApp().getEcosystemVariables()).data.message.currencies;
        console.log(tokens)
        this.setState({...this.state, 
            currencyTicker,
            isPaused,
            tokens,
            totalAmount
        })
    }

    onChange = ({type, value}) => {
        this.setState({...this.state, [`new_${type}`] : value })
    }

    unlockField = ({field}) => {
        this.setState({...this.state, locks : {...this.state.locks, [field] : false }})
    }

    lockField = ({field}) => {
        this.setState({...this.state, locks : {...this.state.locks, [field] : true }})
    }

    updateToken = async ({token}) => {
        var { profile } = this.props;
        this.setState({...this.state, isLoading : true});
        
        await profile.getApp().changeTokenAddress({token : token});
        /* Update All Info */
        await profile.getApp().updateAppInfoAsync();
        await profile.update();
        this.setState({...this.state, isLoading : false});
        this.projectData(this.props);
        return;
    }

    renderCurrencyBox = (token, isSet=true) => {
        return (
            <div style={{height : 'auto'}}>
                <Card>
                    <div style={{margin : 0}} className='landing__product__widget__small'>
                        <div className='description'>
                            <h4> {token.name}</h4>
                            <p> {token.ticker} </p>
                            <a target={'__blank'} className='ethereum-address-a' href={`${ETHERSCAN_URL}/token/${token.address}`}>
                                <p className="ethereum-address-name"> <DirectionsIcon className='icon-ethereum-address'/>
                                    {AddressConcat(token.address)}
                                </p>
                            </a>
                            <span> {token.decimals} Decimals </span>
                        </div>
                        <img className='image_widget' src={token.image}></img>
                    
                    </div>
                </Card>
                    {!isSet ? 
                        <Button color={'primary'} disabled={this.state.isLoading} onClick={() => this.updateToken({token})} className="icon" outline>
                            {!this.state.isLoading ?
                                <p><UpdateIcon className="deposit-icon"/> Change to {token.ticker} </p>
                            : 
                                <img src={loading} style={{width : 20, height : 20}}/>
                            }
                        </Button>
                    : null}
            </div>
        )
    }
    render = () => {
        const { deploymentState, progress, tokens, currencyTicker } = this.state;
        const token = tokens.find( t => t.ticker.toLowerCase() == currencyTicker.toLowerCase());
        const unlistedTokens = tokens.filter(t => t.ticker.toLowerCase() != currencyTicker.toLowerCase());

        if(!token){return null}
        return (
            <div>               
                <p className="dashboard__visitors-chart-title text-left" style={{fontSize : 18, marginBottom : 10}}> Current Token Bank </p>
                <p className='text-grey'> Your Bank token works as the cold storage currency behind all the ecosystem, after the change you should manipulate the trade of the bank tokens manually to the new ones </p>
                <p> ALERT : Change at your own risk, please contact our team if you do have any questions, don´t do anything without understanding the full protocol </p>
                <hr></hr>
                <Row>
                    <Col>
                        {this.renderCurrencyBox(token)}
                    </Col>
                </Row>
                <p className="dashboard__visitors-chart-title text-left text-red" style={{fontSize : 18, marginBottom : 10}}> Available Bank Tokens </p>
                <hr></hr>
                <Row>
                    {unlistedTokens.map( t => {
                        return (
                            <Col md={3}>
                                {this.renderCurrencyBox(t, false)}
                            </Col>
                        )
                    })}
                </Row>
          </div>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps)(TokenManager);

