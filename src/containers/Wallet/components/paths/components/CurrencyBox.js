/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row , Button} from 'reactstrap';
import {  DirectionsIcon } from 'mdi-react';
import QRCodeContainer from './QRCode';
import AddressBox from './AddressBox';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import {formatCurrency} from '../../../../../utils/numberFormatation';


const Ava = `${process.env.PUBLIC_URL}/img/dashboard/ethereum.png`;
const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;



const defaultProps = {
    playBalance : 'N/A',
    ticker : 'N/A',
    tokenAddress : 'N/A',
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

    projectData = (props) => {

        let { wallet } = props;
        const currency = wallet.currency;
        let tokenAddress = wallet.bank_address;

        this.setState({...this.state, 
            decimals : wallet.currency.decimals,
            image : currency.image,
            playBalance :  wallet.playBalance ? wallet.playBalance : defaultProps.houseLiquidity,
            ticker : currency.ticker ? currency.ticker : defaultProps.ticker,
            tokenAddressLink : wallet.link_url,
            tokenAddress :  tokenAddress,
            tokenAddressTrimmed : tokenAddress ? `${tokenAddress.substring(0, 6)}...${tokenAddress.substring(tokenAddress.length - 2)}` : null

        })
    }

    render() {        
        const { image } = this.state;

        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card style={{marginTop : 50}}>
                    <CardBody className="dashboard__card-widget" >
                        <div  className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-title" style={{fontSize : 20, textAlign : 'center'}}> 
                                House Liquidity <span style={{fontSize : 20}}> {formatCurrency(parseFloat(this.state.playBalance))}</span> {this.state.ticker}
                            </p>
                            <hr></hr>
                        </div>
                        <Row>
                            <Col lg={12}>
                                <div className="dashboard__visitors-chart">
                                    <Row>
                                        <Col lg={6} style={{marginTop : 30}}>
                                            <p className="dashboard__visitors-chart-number-second" style={
                                                {color : '#646777'}
                                            }>
                                            <img style={{borderRadius : 0}} className="company-logo-card" src={image} alt="avatar" /> {this.state.ticker}
                                            </p>
                                        </Col>
                                        <Col lg={6}>
                                            {
                                                this.state.tokenAddressLink ?
                                                    <a target={'__blank'} className='ethereum-address-a' href={this.state.tokenAddressLink} style={{marginTop : 30}}>
                                                        <p className="ethereum-address-name"> <DirectionsIcon className='icon-ethereum-address' />
                                                            {this.state.tokenAddressTrimmed}
                                                        </p>
                                                    </a>
                                                :
                                                    <p className="ethereum-address-name"> <DirectionsIcon className='icon-ethereum-address' />
                                                        {this.state.tokenAddressTrimmed}
                                                    </p>
                                            }
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <div className='container' style={{textAlign : 'center'}}>
                                <Col lg={12} style={{margin : '10px auto', textAlign : 'center'}} >
                                    <QRCodeContainer value={this.state.tokenAddress}/>
                                    <AddressBox value={this.state.tokenAddress}/>
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
    // console.log("sadfaaaaaaa", state.profile)
    return {
        profile: state.profile,
        wallet : (state.wallet.currency) ? state.wallet : state.profile.getApp().getSummaryData('walletSimple').data[0]
    };
}

CurrencyBox.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    connect(mapStateToProps)
)(CurrencyBox);
