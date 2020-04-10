/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import Skeleton from '@material-ui/lab/Skeleton';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import { compareIDS } from '../../../../src/lib/string';
import { emptyObject } from '../../../../src/lib/misc';

const defaultProps = {
    playBalance : 0,
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

        const { isLoading } = this.props;

        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget">
                    {isLoading ? (
                    <Skeleton variant="rect" height={29} style={{ marginTop: 10, marginBottom: 10 }}/> 
                        ) : (
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-number-second" style={
                                {color : this.state.playBalance >= 0 ? '#76d076' : '#646777'}
                            }><AnimationNumber decimals={6} number={this.state.playBalance}/> <span> {this.state.ticker}</span></p>
                        </div>)}
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
