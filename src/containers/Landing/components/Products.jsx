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
                    We leverage Blockchain Technology to let you create the best App for your users.
                    <br></br>
                    By creating an Hybrid Ecosystem we deliver the best User Experience alongside with Transparency & Security.                
                </p>
                <Row>
                    <Col md={6} lg={3}>
                        <Link to={'/register'}>
                            <div className='landing__product__widget available'>
                                <div className='description'>
                                    <h4> CryptoCurrency Integration</h4>
                                    <p> Accept Multiple CryptoCurrencies for your Platform </p>
                                </div>
                                <h2 style={{marginTop : 30}}> 0,5% <h5>Per Transaction</h5></h2>
                                <img className='image_widget' src={bitcoin}></img>
                                <img className="landing_2_back" style={{left : '0%',  bottom : '-20%',width : '200%'}} src={back_2} />
                            </div>
                        </Link>
                    </Col>
                    <Col md={6} lg={3}>
                        <Link to={'/register'}>
                            <div className='landing__product__widget available'>
                                <div className='description'>
                                    <h4> Casino </h4>
                                    <p> A Casino Application from Layout, Engines, Games to Deposits </p>
                                </div>
                                <Row>
                                    <Col sd={6}>
                                        <h2 style={{marginTop : 30}}> $999 <h5>Monthly</h5></h2>
                                    </Col>
                                    <Col sd={1} style={{padding : 0}}>
                                        <h2 style={{marginTop : 30}}> +</h2>
                                    </Col>
                                    <Col sd={5}>
                                        <h2 style={{marginTop : 30}}> 5% <h5>In GGR</h5></h2>
                                    </Col>
                                </Row>
                                <img className='image_widget' src={casino}></img>
                                <img className="landing_2_back" style={{left : '0%',  bottom : '-20%',width : '200%'}} src={back_2} />
                            </div>
                        </Link>
                     </Col>
                     <Col md={6} lg={3}>
                        <div className='landing__product__widget'>
                            <p className='coming-text'>Coming in May</p>
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
                            <p className='coming-text'>Coming in August</p>
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
