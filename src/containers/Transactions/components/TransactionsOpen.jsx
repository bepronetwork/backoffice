/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import Numbers from '../../../services/numbers';
const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;

class TransactionsOpen extends PureComponent {
 
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            isLoading : false
        };
    }

    allowWithdrawAll = async () => {
        this.setState({...this.state, isLoading : true})

        await this.props.allowWithdrawAll();

        this.setState({...this.state, isLoading : false})

    }

    render() {        
        let withdraws = this.props.data.data;

        let openWithdraws = withdraws.reduce( (acc, w) => {
            if(w.status == 'Queue'){
                return acc + 1;
            }else{
                return acc;
            }
        }, 0)

        const disabled = this.state.isLoading || (openWithdraws == 0);
        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget">
                        <Row>
                            <Col md={4}>
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-number-second" style={
                                        {color : openWithdraws >= 0 ? '#76d076' : '#646777'}
                                    }><AnimationNumber decimals number={openWithdraws}/></p>
                                </div>
                              
                            </Col>                         
                        </Row>
                       
                        <div className="dashboard__visitors-chart">
                            <p className="dashboard__visitors-chart-title"> On Queue Withdraws <span> All </span></p>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default TransactionsOpen;
