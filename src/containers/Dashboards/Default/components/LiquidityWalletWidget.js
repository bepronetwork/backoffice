/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row , Button} from 'reactstrap';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import SettingsIcon from 'mdi-react/SettingsIcon';
import { ArrowDownIcon, ArrowCollapseDownIcon, ArrowUpDropCircleIcon } from 'mdi-react';
import AnimationNumber from '../../../UI/Typography/components/AnimationNumber';
const Ava = `${process.env.PUBLIC_URL}/img/euro.png`;


const defaultProps = {
    playBalance : 'N/A',
    ticker : 'N/A'
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
        let data = props.data.data;

        this.setState({...this.state, 
            playBalance : data.playBalance ? data.playBalance : defaultProps.playBalance,
            ticker : data.blockchain.ticker ? data.blockchain.ticker : defaultProps.ticker,
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
                            <Col lg={8}>
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-number-second" style={
                                        {color : '#646777'}
                                    }><AnimationNumber number={this.state.playBalance}/> <span>{this.state.ticker}</span></p>
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
