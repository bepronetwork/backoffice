import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const back = `${process.env.PUBLIC_URL}/img/landing/back.jpg`;

const img = `${process.env.PUBLIC_URL}/img/landing/macbook.png`;

const Header = ({ onClick }) => (
	<div className="landing__header">
		<Container>
			<Row>
			
				<Col md={6} style={{textAlign : 'left'}}>
					<h2 className="landing__header-title"> Start your Betting Application with <b>Scale</b> and <b>Security</b>
          			</h2>
					<p className="landing__header-subhead">We provide <b>Engines</b>, easy to use <b>API</b>, <b>Licensing</b> and <b>Management</b> for your needs {' '}
						
          </p>
					<Link className="landing__btn landing__btn--header" to="/documentation/introduction" target="_blank">
						Start today
          			</Link>
					
				</Col>
				<Col lg={6} className={'login_background'}>
					<img className="login_background" src={back} />
				</Col>
			</Row>
		</Container>
	</div>
);

Header.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default Header;
