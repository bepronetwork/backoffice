/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import { DirectionsIcon } from 'mdi-react';
import { ETHEREUM_NET_DEFAULT } from '../../../config/apiConfig';
import store from '../../App/store';
import { setWalletView } from '../../../redux/actions/walletReducer';

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
        this.props.history.push('/wallet/currency');   
    }

    projectData = (props) => {
        const { wallet } = props.data;
    
        if(wallet._id){
            this.setState({...this.state,
                wallet,
                totalLiquidity :  wallet.playBalance ? wallet.playBalance : defaultProps.totalLiquidity,
                ticker : wallet.currency.ticker ? wallet.currency.ticker : defaultProps.ticker,
                platformBlockchain : wallet.currency.name ? wallet.currency.name: defaultProps.platformBlockchain,
                platformAddressLink : `https://${ETHEREUM_NET_DEFAULT}.etherscan.io/token/` + wallet.bank_address,
                tokenAddress :  `${wallet.bank_address.substring(0, 6)}...${wallet.bank_address.substring(wallet.bank_address.length - 2)}`,
                isIntegrated : true,
                image : wallet.currency.image
            })
        }
       
    }

    render() {        
        const { image, wallet } = this.state;
        return (
            <div style={{flexGrow: 10}}>
                <Card>
                    <button className='clean_button' onClick={ () => this.goToWalletView(wallet)}>
                        <CardBody className="dashboard__card-widget dashboard_borderTop">
                            <div className="flex-container">
                                <div style={{flexGrow: 2}}>
                                    <img style={{borderRadius : 0, position: "initial"}} className="company-logo-card" src={image} alt="avatar" />
                                    <div className="dashboard__visitors-chart" style={{ marginTop: 20}}>
                                        <p className="dashboard__visitors-chart-title" style={{fontSize : 25}}> {this.state.ticker} </p>
                                    </div>
                                </div>
                                <div style={{flexGrow: 8}}>
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
                                </div>

                            </div>
                        </CardBody>
                    </button>
                </Card>
                
            </div>
        );
    }
}

export default LiquidityWalletWidget;
