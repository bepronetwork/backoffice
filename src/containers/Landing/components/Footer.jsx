import React from 'react';
import { Col, Row, Container } from 'reactstrap';

const logo = `${process.env.PUBLIC_URL}/img/landing/logo.png`;

const Footer = () => (
  <footer className="landing__footer">
		<Container>
			<Row>
				<Col md={8} style={{textAlign : 'left'}}>
                    <p className="landing__menu-logo">
                        <img src={logo} className={'landing__logo'} alt="" />
                    </p>
                    <h5 style={{maxWidth : 300, marginTop : 50}}>BetProtocol App is SaaS Platform built on Top of @BetProtocol</h5>
				</Col>
				<Col lg={4}>
                    <h4 style={{marginBottom : 20}}>Make your Way</h4>
                    <a href={'https://medium.com/@betprotocol'} target={'__blank'}
                    >
                        <h5>Blog</h5>
                      
                    </a>
                    <a href={'https://docs.betprotocol.com'} target={'__blank'}
                    >
                        <h5>Docs</h5>
                      
                    </a>
                    <a href={'#'} target={'__blank'}
                    >
                        <h5>About Us</h5>
                      
                    </a>
				</Col>
			</Row>
		</Container>
  </footer>
);

export default Footer;
