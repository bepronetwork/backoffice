import React from 'react';
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import { connect } from "react-redux";
import _ from 'lodash';
import { UpdateIcon } from 'mdi-react';
import { Progress } from 'reactstrap';
import Numbers from '../../../services/numbers';
import { getContractData } from '../../../services/etherscan';
const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;
const update = `${process.env.PUBLIC_URL}/img/dashboard/update.png`;


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
    totalAmount : 0,
    currencyTicker : 'N/A',
    locks : {
       
    },
    progress : 0,
    deploymentConfig : DEPLOYMENT_CONFIG,
    deploymentState : DEPLOYMENT_CONFIG['none'].message,
    isLoading : false
}


class PlatformUpdates extends React.Component{

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
        this.setState({...this.state, 
            currencyTicker,
            isPaused,
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

    getUpdateStateForProgress = ({deploymentConfig, state}) => {
        let new_deploymentConfig = {
            ...deploymentConfig, [state] : {
                ...deploymentConfig[state],
                isSet : true,
            }
        };

        let progress = this.getProgress(new_deploymentConfig);

        this.setState({...this.state, 
            deploymentState  : DEPLOYMENT_CONFIG[state].message,
            deploymentConfig : new_deploymentConfig,
            progress
        });

        return new_deploymentConfig;
    }

    getProgress(args){
        return (Object.keys(Object.filter(args, v => v.isSet)).length)/(Object.keys(args).length)*100;
    }

    update = async () => {
        var { profile } = this.props;
        var { totalAmount, deploymentConfig } = this.state;
        this.setState({...this.state, isLoading : true});
        const { services } = profile.getApp().getParams();
        let res = (await profile.getApp().getEcosystemVariables()).data.message;

        let params = {
            tokenAddress : profile.getApp().getInformation('platformTokenAddress'), 
            decimals : profile.getApp().getDecimals(), 
            authorizedAddress : res.addresses[0].address,
            currencyTicker : profile.getApp().getCurrencyTicker(), 
            blockchainTicker : profile.getApp().getInformation('platformBlockchain')
        }

        let state = 'pauseContract';
        /* 1 - Pause Contract */
    
        deploymentConfig = this.getUpdateStateForProgress({state, deploymentConfig});
        await profile.getApp().pauseContract();

        /* 2 - Move Funds to Owner Address */
        state = 'withdrawAllFunds';
        deploymentConfig = this.getUpdateStateForProgress({state, deploymentConfig});
        //await profile.getApp().withdrawAmount({amount : totalAmount});

        /* 3 - Deploy Contract */
        state = 'deployContract';
        deploymentConfig = this.getUpdateStateForProgress({state, deploymentConfig});

        /* 4 - Authorize Address of Owner */
        state = 'authorizeAddress';
        deploymentConfig = this.getUpdateStateForProgress({state, deploymentConfig});
        await profile.authorizeAddress({address : params.ownerAddress, platformParams : params});

        /* 5 - Authorize Croupiers on the Platform */
        state = 'authorizeCroupier';
        deploymentConfig = this.getUpdateStateForProgress({state, deploymentConfig});
        await profile.authorizeCroupier({address : params.authorizedAddress, platformParams : params});

        /* Update All Info */
        await profile.getApp().updateAppInfoAsync();
        await profile.update();

        /* 7 - Move Funds to New Contract */
        state = 'moveFundsToNewContract';
        deploymentConfig = this.getUpdateStateForProgress({state, deploymentConfig});

        /* Add Max Deposit */

        /* Add Max Withdrawal */


        /* 7 - Move Funds to New Contract */
        state = 'done';
        deploymentConfig = this.getUpdateStateForProgress({state, deploymentConfig})

        this.setState({...this.state, isLoading : false});
        this.projectData(this.props);
        return;
    }

    render = () => {
        const { deploymentState, progress } = this.state;

        return (
            <div>               
                <p className="dashboard__visitors-chart-title text-left" style={{fontSize : 18, marginBottom : 10}}> Platform Updates </p>
                <hr></hr>
                <Row>
                    <Col md={6}>
                        <Card>
                             <CardBody>
                                <Row>
                                    <Col md={4}>
                                        <img className='application__game__image' src={update}/>
                                     
                                    </Col>
                                    <Col md={8}>
                                        <h5 className="text"> Move To a New Contract </h5>
                                        <p className={"small-text bold-text"}> Update to a New Contract with the latest updates </p>
                                        <hr></hr>
                                        <Button color={'primary'} disabled={this.state.isLoading}  onClick={() => this.update()} className="icon" outline>
                                            {!this.state.isLoading ?
                                                <p><UpdateIcon className="deposit-icon"/> Update to new Contract </p>
                                            : 
                                                <img src={loading} style={{width : 20, height : 20}}/>
                                            }
                                        </Button>
                                    </Col>
                                </Row>
                                <div>
                                    <h4 style={{marginTop : 20, marginBottom : 40}} className={"dashboard__total-stat"}>
                                        {parseInt(progress)}% {deploymentState}
                                    </h4>
                                    <div className="progress-wrap">
                                        <Progress value={progress} style={{width : 100}} />
                                    </div>  
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
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

export default connect(mapStateToProps)(PlatformUpdates);

