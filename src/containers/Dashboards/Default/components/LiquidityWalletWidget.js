/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';

import AnimationNumber from '../../../UI/Typography/components/AnimationNumber';
import { InformationIcon } from 'mdi-react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { compareIDS } from '../../../../lib/string';
import { emptyObject } from '../../../../lib/misc';
import {formatCurrency} from '../../../../utils/numberFormatation';
import Skeleton from '@material-ui/lab/Skeleton';

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
        const wallet = wallets.find(w => compareIDS(w.currency._id, currency._id));

        if(emptyObject(wallet)){return null};

        this.setState({...this.state, 
            playBalance : wallet.playBalance ? wallet.playBalance : defaultProps.playBalance,
            decimals : currency.decimals,
            ticker : currency.ticker ? currency.ticker : defaultProps.ticker
        })
    
    }

    render() {    
        
        const { isLoading } = this.props;
        
        return (
            <Col md={12} lg={12} xl={12}>
                <Card style={{ minWidth: 200 }}>
                    <CardBody className="dashboard__card-widget dashboard_borderTop" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                        <Row>
                            <Col lg={4}>
                                <img style={{borderRadius : 0}} className="company-logo-card" src={Ava} alt="avatar" />
                            </Col>
                            <Col lg={8} style={{ minWidth: 160 }}>
                            {isLoading ? (
                                <Skeleton 
                                variant="rect"
                                animation="wave"
                                height={29} 
                                style={{ marginTop: 10, marginBottom: 10 }}/> 
                                 ) : (
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-number-second" style={{color : '#646777'}}>
                                        <AnimationNumber decimals={6} number={ formatCurrency(this.state.playBalance)}/> 
                                        <span> {this.state.ticker}</span>
                                    </p>
                                </div>)}
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
