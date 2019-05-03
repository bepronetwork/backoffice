/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row , Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import { ArrowDownIcon, ArrowCollapseDownIcon,  DirectionsIcon } from 'mdi-react';
const Ava = `${process.env.PUBLIC_URL}/img/euro.png`;



const defaultProps = {
    playBalance : 'N/A',
    ticker : 'N/A',
    platformBlockchain : 'N/A'
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

    projectData = (props) => {
        let data = props.data;
        let tokenAddress = data.wallet.data.blockchain.tokenAddress;
        
        this.setState({...this.state, 
            playBalance : data.wallet.data.playBalance ? data.wallet.data.playBalance : defaultProps.playBalance,
            ticker : data.wallet.data.blockchain.ticker ? data.wallet.data.blockchain.ticker : defaultProps.ticker,
            platformBlockchain : data.app.getInformation('platformBlockchain') ? data.app.getInformation('platformBlockchain') : defaultProps.platformBlockchain,
            platformAddressLink : 'https://ropsten.etherscan.io/token/' + data.wallet.data.blockchain.tokenAddress,
            tokenAddress :  `${tokenAddress.substring(0, 6)}...${tokenAddress.substring(tokenAddress.length - 2)}`
        })
    }


    render() {        
        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget dashboard_borderTop">
                        <Row>
                            <Col lg={3}>
                                <img style={{borderRadius : 0}} className="company-logo-card" src={Ava} alt="avatar" />
                            </Col>
                            <Col lg={5}>
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-number-second" style={
                                        {color : '#646777'}
                                    }><AnimationNumber number={this.state.playBalance}/> <span>{this.state.ticker}</span></p>
                                </div>
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-title">{new String(this.state.platformBlockchain).toUpperCase()} <strong>|</strong> {this.state.ticker} <span> Available </span></p>
                                </div>
                                <a target={'__blank'} className='ethereum-address-a' href={this.state.platformAddressLink}>
                                    <p className="ethereum-address-name"> <DirectionsIcon className='icon-ethereum-address' />{this.state.tokenAddress}</p>
                                </a>
                            </Col>
                            <Col lg={4}>
                                <Link to='/wallet/deposit' >
                                    <Button style={{margin : 0, width : 120}} className="icon" outline color="primary"><p><ArrowCollapseDownIcon className="deposit-icon"/> Deposit </p></Button>
                                </Link>
                                <Button style={{margin : 0, marginTop : 10, width : 120}} className="icon"  color="primary"><p><ArrowDownIcon className="deposit-icon"/> Withdraw </p></Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default LiquidityWalletWidget;
