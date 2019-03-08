import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const back = `${process.env.PUBLIC_URL}/img/front.png`;
const revenue = `${process.env.PUBLIC_URL}/img/widgets/revenue.png`;
const games = `${process.env.PUBLIC_URL}/img/widgets/games.png`;
const users = `${process.env.PUBLIC_URL}/img/widgets/users.png`;
const stats = `${process.env.PUBLIC_URL}/img/widgets/stats.png`;
const deposit = `${process.env.PUBLIC_URL}/img/widgets/deposit.png`;
const ggr = `${process.env.PUBLIC_URL}/img/widgets/ggr.png`;

const Header = ({ onClick }) => (
	<div className="landing__header">
      
		<Container>
			<Row>
			
				<Col sd={12} md={6} style={{textAlign : 'left'}}>
					<h2 className="landing__header-title"> Start your Betting Application with <b>Scale</b> and <b>Security</b>
          			</h2>
					<p className="landing__header-subhead">Where the Future of Commerce meets Betting Engines{' '}	
                    </p>

					<Link style={{width : 200, marginLeft : 20}} className="btn btn-primary account__btn"  to="/register">
						Start today
          			</Link>
					
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
