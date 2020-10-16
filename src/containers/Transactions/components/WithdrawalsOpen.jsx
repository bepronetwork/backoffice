/* eslint-disable react/no-array-index-key */
import Skeleton from '@material-ui/lab/Skeleton';
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber'

class WithdrawalsOpen extends PureComponent {
 
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
        let withdraws = this.props.data;
        const { loading } = this.props;

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
                    <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                        <Row>
                            <Col md={4}>
                            {   loading ? (
                                <Skeleton variant="rect" height={29} style={{ marginTop: 10, marginBottom: 10 }}/> ) : (
                                <div className="dashboard__visitors-chart">
                                    <p className="dashboard__visitors-chart-number-second" style={
                                        {color : openWithdraws >= 0 ? '#76d076' : '#646777'}
                                    }><AnimationNumber decimals={0} number={openWithdraws}/></p>
                                </div>)}
                              
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

export default WithdrawalsOpen;
