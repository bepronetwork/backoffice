import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextInput from '../../../shared/components/TextInput';
import { EmailIcon } from 'mdi-react';
const back = `${process.env.PUBLIC_URL}/img/front.png`;
const revenue = `${process.env.PUBLIC_URL}/img/widgets/revenue.png`;
const games = `${process.env.PUBLIC_URL}/img/widgets/games.png`;
const users = `${process.env.PUBLIC_URL}/img/widgets/users.png`;
const stats = `${process.env.PUBLIC_URL}/img/widgets/stats.png`;
const deposit = `${process.env.PUBLIC_URL}/img/widgets/deposit.png`;
const ggr = `${process.env.PUBLIC_URL}/img/widgets/ggr.png`;

const Header = (props) => (
	<div className="landing__header">
      
		<Container>
			<Row>
			
				<Col sd={12} md={6} style={{textAlign : 'left'}}>
					<h2 className="landing__header-title"> Start your own Betting Application <b>Today</b>
          			</h2>
					<p className="landing__header-subhead"> Scalable, Secure, Regulated. No Coding Required.
                    </p>
                    <div style={{marginLeft : 20, marginBottom  : 20, width : 400}}>
                        <Row>
                            <Col lg={6}>
                                <div className='widget__landing__one'>
                                    <h2 className="landing_other landing__header-title"> For <b>Owners</b>
          			                </h2>
                                      <hr></hr>
                                    <p className='list__landing text-purple'>Get a Platform Running in 10 minutes</p>
                                    <p className='list__landing text-purple'>Pay Less than $20k per year</p>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className='widget__landing__two'>
                                    <h2 className="landing_other__text_white landing__header-title"> For <b>Investors</b>
                                    </h2>
                                    <hr style={{backgroundColor : 'white'}}></hr>
                                    <p className='list__landing text-white'>Hold BPRO Token</p>
                                    <p className='list__landing text-white'>Provide Liquidity to Operators</p>
                                    
                                </div>
                            </Col>

                        </Row>
                    </div>
                    <button type="button"  style={{width : 200, marginLeft : 20}} className="btn btn-primary account__btn vrlps-trigger">
                        🏇 Get Early Access
                    </button>
				</Col>
				<Col sd={12} md={6} className={'login_background'}>
					<img className="login_background" src={back} />
				</Col>
			</Row>
            <div className={'widget__container-main'}>
                <div className='widget__container'> 
                
                    <Row style={{width: '200%'}}>
                            <img className='widget__landing widget__landing-3' src={games}/>
                            <img className='widget__landing widget__landing-3' src={stats}/>
                            <img className='widget__landing widget__landing-3' src={ggr}/>

                    </Row> 
                  
                </div>
            </div>
		</Container>
	</div>
);

Header.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default Header;
