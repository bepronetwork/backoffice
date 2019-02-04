import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from 'mdi-react/FacebookIcon';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import LogInForm from './components/LogInForm';
import { Col, Container, Row } from 'reactstrap';
const Back = `${process.env.PUBLIC_URL}/img/background-login.jpg`;

class LogIn extends React.Component{

	constructor(props){super(props)}

	render = () => {
		return (
			<div className={'container__all'}>
				<Row className={'container__all'} style={{marginTop : '10%'}}>
					<Col lg={6} className={'login_background'}>
						<img className="login_background" src={Back} />
					</Col>
					<Col lg={6}>
						<div className="account__wrapper">
							<div className="account__card">
							<h3 className="account__title" style={{marginBottom : '20%'}}>Welcome to BetProtocol
							</h3>
							<LogInForm {...this.props} onSubmit={false} />
							</div>
						</div>
					</Col>
				</Row>
			</div>
		)
	}
};
  

export default LogIn;
