import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import CheckIcon from 'mdi-react/CheckIcon';
const app = `${process.env.PUBLIC_URL}/img/app.png`;
const bpro = `${process.env.PUBLIC_URL}/img/betprotocol-logo-white.png`;
const revenue = `${process.env.PUBLIC_URL}/img/widgets/revenue.png`;
const users = `${process.env.PUBLIC_URL}/img/widgets/users.png`;
const deposit = `${process.env.PUBLIC_URL}/img/widgets/deposit.png`;

const Pricing = () => (
    <section className="landing__section">
       
        <Container className='container__all__landing pricing__section container-auto-height'>
            <div className={'widget__container-main'}>
                <div className='widget__container_2'> 
                    <Row >
                            <img className='widget__landing widget__landing-3' src={users}/>
                            <img className='widget__landing widget__landing-3' src={revenue}/>
                            <img className='widget__landing widget__landing-3' src={deposit}/>

                    </Row>
                </div>
            </div>
            <h3 className="landing__section-title" style={{textAlign : 'center', margin : 'auto'}}>Our Pricing</h3>
            <p className='landing__section-text' style={{textAlign : 'center'}}>
                Simple, Transparent and the best in the Market .
            </p>
            <Row>
                <Col lg={6}>
                    <div className='landing__widget-competitor'>
                        <p className="section-title"> Competitors </p>
                        <img src={app}></img>
                        <Row>
                            <Col sd={6}>
                                <p className='title'>
                                    Setup Fee
                                </p>
                                <p className='text'>
                                    $ 100.000
                                </p>
                            </Col>
                      
                            <Col sd={6}>
                                <p className='title'>
                                    Monthly Cost
                                </p>
                                <p className='text'>
                                    $ 15.000
                                </p>
                            </Col>
                        </Row>
                       
                        <p className='title'>
                            GGR FEE
                        </p>
                        <p className='text'>
                            20%
                        </p>
                    </div>
                </Col>
               
                <Col lg={6}>
                    <div className='landing__widget-betprotocol'>
                        <p className="section-title"> BetProtocol </p>
                        <img src={bpro}></img>
                        <Row>
                            <Col sd={6}>
                                <p className='title'>
                                    Setup Fee
                                </p>
                                <p className='text'>
                                    $ 0
                                </p>
                            </Col>
                     
                            <Col sd={6}>
                                <p className='title'>
                                    Monthly Cost
                                </p>
                                <p className='text'>
                                    $ 999
                                </p>
                            </Col>
                        </Row>
                       
                        <p className='title'>
                            GGR FEE
                        </p>
                        <p className='text'>
                            4.9%
                        </p>
                    </div>
                    <p className="section-title"> <strong>30x </strong>Cheaper </p>

                </Col>
            </Row>
        </Container>
    </section>
);

export default Pricing;
