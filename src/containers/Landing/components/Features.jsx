

import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import CheckIcon from 'mdi-react/CheckIcon';
const savings = `${process.env.PUBLIC_URL}/img/landing/features/savings.png`;
const joystick = `${process.env.PUBLIC_URL}/img/landing/features/joystick.png`;
const bitcoin = `${process.env.PUBLIC_URL}/img/landing/features/bitcoin.png`;

const back = `${process.env.PUBLIC_URL}/img/landing/back-3.png`;


const Features = () => (
    <section className="landing__section">
        <div className='landing__heading'>
            <img className="landing_3_back-1" src={back} />
        </div>
        <Container className='container__all__landing  m-t-100 container-auto-height'>
            <Row>
                <Col className={'images__features'} xs={{order : 2}} lg={{order : 1, size : 6}} style={{height : 500}}>
                    <div className='landing__widget'>
                        <span className='widget__span'>+100 Games</span>
                        <p className='landing__section-text text_widget'>Games Integrations</p>

                        <img src={joystick} className='widget__features'></img>
                    </div> 
                    <div className='landing__widget landing__widget-2'>
                        <img src={bitcoin} className='widget__features'></img>
                        <p className='landing__section-text text_widget'>Transparency & Immutability</p>
                    </div>
                    <div className='landing__widget landing__widget-3'>
                    <span className='widget__span'>+40 Currencies</span>
                    <p className='landing__section-text text_widget'>Integrated Wallet</p>
                        <img src={savings} className='widget__features'></img>
                    </div>

                </Col>
                <Col  xs={{order : 1}}  lg={{order : 2, size : 6}}>
                    <h3 className="landing__section-title"> Designed for the Future of Regulation & Technology </h3>
                    <p className='landing__section-text'>
                        BetProtocol enables entrepreneurs and developers to launch compliant and regulated cryptocurrency integrations and betting platforms.
                    </p>
                </Col>
            </Row>
           
          

        </Container>
       
    </section>
);


export default Features;
