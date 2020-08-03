import React from 'react';
import Fade from '@material-ui/core/Fade';
import Skeleton from '@material-ui/lab/Skeleton';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import _ from 'lodash';

class UserPageSkeleton extends React.Component{

    renderDataTitle = ({ title }) => {

        return (
            <Card>
                <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                    <p className='text-small pink-text'> {title} </p>
                    <Skeleton variant="rect" height={12} style={{ marginTop: 10, marginBottom: 10 }}/>
                </CardBody>
            </Card>
        )
    }

    renderBalanceData = ({ title }) => {

        return (
            <Card>
                <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none", paddingBottom: 10, paddingRight: 10 }}>
                    <p className='text-small pink-text'> {title} </p>
                    <Skeleton variant="rect" height={12} style={{ marginTop: 10, marginBottom: 10 }}/>
                </CardBody>
            </Card>
        )
    }

    render = () => {
        
        return (
            <Fade in timeout={{ appear: 200, enter: 200, exit: 200 }}>
            <Container className="dashboard">
                <Row>
                    <Col md={4}>
                        <div className='user-page-top'>
                            <Card>
                                <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                                    <Row>
                                        <Col sd={12} md={12} lg={4}>
                                            {/* Avatar */}
                                            <div>
                                                <Skeleton variant="circle" height={100} width={100} style={{ marginTop: 10, marginBottom: 10 }}/>
                                            </div>
                                        </Col>
                                        <Col sd={12} md={12} lg={8}>
                                            {/* UserInfo */}
                                            <Skeleton variant="rect" height={12} style={{ marginTop: 10 }}/>
                                            <hr></hr>
                                            <Skeleton variant="rect" height={12} style={{ marginTop: 10 }}/>
                                            <Skeleton variant="rect" height={12} style={{ marginTop: 10 }}/>
                                            <Skeleton variant="rect" height={12} style={{ marginTop: 10 }}/>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col md={8}>
                        <Row>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderBalanceData({ title : 'Balance' })}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({ title : 'TurnOver' })}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({ title : 'Win Amount' })}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({ title : 'Profit' })}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({ title : 'Withdraws' })}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({ title : 'Deposits' })}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({ title : 'Affiliate Wallet' })}
                            </Col>
                            <Col sd={12} md={4} lg={3}>
                                {this.renderDataTitle({ title : 'Affiliates' })}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Card>
                    <CardBody className="dashboard__card-widget" style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none", padding: 10 }}>
                        <Skeleton variant="rect" height={50} style={{ marginTop: 10, marginBottom: 30 }}/>
                        { _.times(10, () => <Skeleton variant="rect" height={30} style={{ marginTop: 10, marginBottom: 20 }}/> ) }
                        
                    </CardBody>
                </Card>
              
            </Container>
        </Fade>
        )
    }

}

export default UserPageSkeleton;

