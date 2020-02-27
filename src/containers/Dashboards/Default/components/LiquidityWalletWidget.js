/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';

import AnimationNumber from '../../../UI/Typography/components/AnimationNumber';
import { InformationIcon } from 'mdi-react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { compareIDS } from '../../../../lib/string';
import { emptyObject } from '../../../../lib/misc';
const Ava = `${process.env.PUBLIC_URL}/img/dashboard/euro.png`;


const defaultProps = {
    playBalance : 0,
    ticker : 'N/A',
    decimals : 6
}

class LiquidityWalletWidget extends PureComponent {
 
    constructor(props){
        super(props);
        this.state = { ...defaultProps};
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }
    
    projectData = (props) => {
        const { currency } = props;
        if(emptyObject(currency)){return null};

        let wallets = props.data.data.wallet;
        const wallet = wallets.find( w => compareIDS(w.currency, currency._id));

        if(emptyObject(wallet)){return null};

        this.setState({...this.state, 
            playBalance : wallet.playBalance ? wallet.playBalance : defaultProps.playBalance,
            decimals : currency.decimals,
            ticker : currency.ticker ? currency.ticker : defaultProps.ticker
        })
    
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
                            <Col lg={8} style={{minWidth: `140px`}}>
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-number-second" style={{color : '#646777'}}>
                                        <AnimationNumber decimals={6} number={this.state.playBalance}/> 
                                        <span> {this.state.ticker}</span>
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
