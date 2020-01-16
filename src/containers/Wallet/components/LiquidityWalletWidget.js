/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row , Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import { ArrowDownIcon, ArrowCollapseDownIcon,  DirectionsIcon } from 'mdi-react';
import { InformationIcon } from 'mdi-react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { ETHEREUM_NET_DEFAULT } from '../../../config/apiConfig';
import store from '../../App/store';
import { setWalletView } from '../../../redux/actions/walletReducer';
const Ava = `${process.env.PUBLIC_URL}/img/dashboard/euro.png`;


const defaultProps = {
    ticker : 'N/A',
    platformBlockchain : 'N/A',
    totalLiquidity : 0,
    isIntegrated  : false,
    image : ''
}


class LiquidityWalletWidget extends PureComponent {
 
    constructor(props){
        super(props);
        this.state = { ...defaultProps};
        this.projectData(props);
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    goToWalletView = async (wallet) => {
        await store.dispatch(setWalletView(wallet));
    }

    projectData = (props) => {
        const { wallet } = props.data;
    
        if(wallet._id){
            this.setState({...this.state,
                wallet,
                totalLiquidity :  wallet.playBalance ? wallet.playBalance : defaultProps.totalLiquidity,
                ticker : wallet.currency.ticker ? wallet.currency.ticker : defaultProps.ticker,
                platformBlockchain : wallet.currency.name ? wallet.currency.name: defaultProps.platformBlockchain,
                platformAddressLink : `https://${ETHEREUM_NET_DEFAULT}.etherscan.io/token/` + wallet.currency.address,
                tokenAddress :  `${wallet.currency.address.substring(0, 6)}...${wallet.currency.address.substring(wallet.currency.address.length - 2)}`,
                isIntegrated : true,
                image : wallet.currency.image
            })
        }
       
    }

    render() {        
        const { image, wallet } = this.state;
        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                
                <Card>
                    <CardBody className="dashboard__card-widget dashboard_borderTop">
                        <Row>
                            <Col lg={3}>
                                <img style={{borderRadius : 0}} className="company-logo-card" src={image} alt="avatar" />
                            </Col>
                            <Col lg={5}>
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-number-second" style={
                                        {color : '#646777'}
                                    }><AnimationNumber decimals={6} number={this.state.totalLiquidity}/> <span> {this.state.ticker}</span></p>
                               </div>
                              
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-title">{new String(this.state.platformBlockchain).toUpperCase()} <span> Available </span></p>
                                </div>
                             
                                <a target={'__blank'} className='ethereum-address-a' href={this.state.platformAddressLink}>
                                    <p className="ethereum-address-name"> <DirectionsIcon className='icon-ethereum-address' />{this.state.tokenAddress}</p>
                                </a>
                            </Col>
                            <Col lg={4}>
                                <Link to='/wallet/deposit' >
                                    <Button onClick={() => this.goToWalletView(wallet)} disabled={!this.state.isIntegrated} style={{margin : 0, width : 120}} className="icon" outline color="primary"><p><ArrowCollapseDownIcon className="deposit-icon"/> Deposit </p></Button>
                                </Link>
                                <Link to='/wallet/withdraw' >
                                    <Button onClick={() => this.goToWalletView(wallet)} disabled={!this.state.isIntegrated} style={{margin : 0, marginTop : 10, width : 120}} className="icon"  color="primary"><p><ArrowDownIcon className="deposit-icon"/> Withdraw </p></Button>
                                </Link>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default LiquidityWalletWidget;
