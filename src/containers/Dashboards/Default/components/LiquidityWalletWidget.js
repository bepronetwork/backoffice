/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';

import AnimationNumber from '../../../UI/Typography/components/AnimationNumber';
import { InformationIcon } from 'mdi-react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
const Ava = `${process.env.PUBLIC_URL}/img/dashboard/euro.png`;


const defaultProps = {
    playBalance : 'N/A',
    totalLiquidity : 'N/A',
    ticker : 'N/A',
    totalDecentralizedLiquidity : 'N/A',
    bankroll : 'N/A'
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
    
    projectData = (props) => {
        let data = props.data.data;

        if(data.blockchain){
            this.setState({...this.state, 
                totalLiquidity :  data.playBalance ? data.playBalance : defaultProps.totalLiquidity,
                bankroll : data.blockchain.decentralized.houseBalance ? data.blockchain.decentralized.houseBalance : defaultProps.bankroll,
                totalDecentralizedLiquidity :  data.blockchain.decentralized.totalLiquidity ? data.blockchain.decentralized.totalLiquidity : defaultProps.totalDecentralizedLiquidity,
                playBalance : data.playBalance ? data.playBalance : defaultProps.playBalance,
                ticker : data.blockchain.ticker ? data.blockchain.ticker : defaultProps.ticker,
            })
        }
    }



    render() {        
        
        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget dashboard_borderTop">
                        <Row>
                            <Col lg={4}>
                                <img style={{borderRadius : 0}} className="company-logo-card" src={Ava} alt="avatar" />
                            </Col>
                            <Col lg={8}>
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-number-second" style={
                                        {color : '#646777'}
                                    }>
                                        <AnimationNumber number={this.state.totalLiquidity}/> 
                                        <span> {this.state.ticker}</span>
                                        <p className='small-text-info'>
                                            <AnimationNumber number={this.state.totalDecentralizedLiquidity}/> 
                                            <Tooltip title="Liquidity in Smart-Contract">
                                                <IconButton aria-label="Liquidity in Smart-Contract">
                                                    <InformationIcon size={20}/>
                                                </IconButton>
                                            </Tooltip>
                                            <span><AnimationNumber number={this.state.bankroll}/></span> 
                                        </p>
                                    </p>
                                </div>
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-title"> {this.state.ticker} <span> Available </span></p>
                                </div>
                            </Col>
                           
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default LiquidityWalletWidget;
