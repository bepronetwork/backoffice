/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import Numbers from '../../../services/numbers';



const defaultProps = {
    totalLiquidity : 0,
    ticker : 'N/A',
}

class LiquidityInfo extends PureComponent {
    
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
            totalLiquidity : data.blockchain.totalLiquidity ? data.blockchain.totalLiquidity : defaultProps.totalLiquidity,
            ticker : data.blockchain.ticker ? data.blockchain.ticker : defaultProps.ticker,
        })
    }

    render() {
        
        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget">
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-number-second" style={
                                {color : this.state.playBalance >= 0 ? '#76d076' : '#646777'}
                            }><AnimationNumber  number={this.state.totalLiquidity}/> <span> {this.state.ticker}</span></p>
                        </div>
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-title"> Liquidity <span> Available </span></p>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default LiquidityInfo;
