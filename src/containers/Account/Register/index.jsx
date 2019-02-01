import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import { Col, Container, Row } from 'reactstrap';
const Back = `${process.env.PUBLIC_URL}/img/background-login.jpg`;

class Register extends React.Component{

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
							<h3 className="account__title" style={{marginBottom : '20%'}}>Welcome to BPRO
							</h3>
							<RegisterForm {...this.props} onSubmit={false} />
								<div className="account__have-account">
									<p>Already have an account? <Link to="/login">Login</Link></p>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		)
	}
};
  

export default Register;
