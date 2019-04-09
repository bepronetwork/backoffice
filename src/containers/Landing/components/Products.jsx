import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

const back_2 = `${process.env.PUBLIC_URL}/img/landing/back-2.png`;
const bitcoin = `${process.env.PUBLIC_URL}/img/bitcoin.png`;
const sports = `${process.env.PUBLIC_URL}/img/sports.png`;
const casino = `${process.env.PUBLIC_URL}/img/casino.png`;
const prediction = `${process.env.PUBLIC_URL}/img/prediction.png`;


class Products extends React.Component{
    constructor(props){super(props); this.state = {}}

    changeContent = (type, item) => {
        this.setState({[type] : item});
    }

    render = () => {
        return(
            <section className="landing__section ">
          
             <Container className='container__all__landing container-auto-height'>  
                <h3 className="landing__section-title">What is BetProtocol?</h3>
                <p className='landing__section-text '>
                    BetProtocol enables entrepreneurs and developers to create betting platforms in minutes. No coding required. 
                    <br></br>
                    By leveraging Blockchain Technology these platforms are secure, scalable and regulated.
                </p>
                <p className=' roadmap-text landing__section-text' >
                    Roadmap                   
                </p>
                <Row>
                    <Col md={6} lg={3}>
                        {/*<Link to={'/register'}> */}
                            <div className='landing__product__widget available'>
                                <div className='description'>
                                    <h4> CryptoCurrency Integration</h4>
                                    <p> Accept cryptocurrency payments on your betting platform and access a $200B market. </p>
                                </div>
                                <h2 style={{marginTop : 30}}> 0,5% <h5>Per Transaction</h5></h2>
                                <img className='image_widget' src={bitcoin}></img>
                                <img className="landing_2_back" style={{left : '0%',  bottom : '-20%',width : '200%'}} src={back_2} />
                            </div>
                        {/*</Link>*/}
                    </Col>
                    <Col md={6} lg={3}>
                        <div className='landing__product__widget'>
                             <p className='coming-text'>Coming in May</p>
                             <div className='on-coming'>

                                <div className='description'>
                                    <h4> Casino </h4>
                                    <p> A Casino Application from Layout, Engines, Games to Deposits </p>
                                </div>
                            
                                <img className='image_widget' src={casino}></img>
                                <img className="landing_2_back" style={{left : '0%',  bottom : '-20%',width : '200%'}} src={back_2} />
                            </div>
                        </div>
                     </Col>
                     <Col md={6} lg={3}>
                        <div className='landing__product__widget'>
                            <p className='coming-text'>Coming in September</p>
                            <div className='on-coming'>
                                <div className='description'>
                                    <h4> SportsBooking </h4>
                                    <p> A SportsBooking from Layout, Engines, Odds to Deposits </p>
                                </div>
                                <img className='image_widget' src={sports}></img>
                                <img className="landing_2_back" style={{left : '0%',  bottom : '-20%',width : '200%'}} src={back_2} />
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3}>
                        <div className='landing__product__widget'>
                            <p className='coming-text'>Coming in 2020</p>
                            <div className='on-coming'>
                                <div className='description'>
                                    <h4> Prediction Markets </h4>
                                    <p> A Prediction API for the Type of Market you decide </p>
                                </div>
                                <img className='image_widget' src={prediction}></img>
                                <img className="landing_2_back" style={{left : '0%',  bottom : '-20%',width : '200%'}} src={back_2} />
                            </div>
                        </div>
                    </Col>
                </Row>
                
             </Container>
         </section>
        )
    }

}

export default Products;
