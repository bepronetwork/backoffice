import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import { Col, Container, Row } from 'reactstrap';
import { BasicNotification } from '../../../shared/components/Notification';
import NotificationSystem from 'rc-notification';

const Back = `${process.env.PUBLIC_URL}/img/background-login.jpg`;
let notification = null;

const showNotification = (message) => {
	notification.notice({
		content: <BasicNotification
			title="There is a problem with your Registering"
			message={message}
		/>,
		duration: 5,
		closable: true,
		style: { top: 0, left: 'calc(100vw - 100%)' },
		className: 'right-up',
	});
};
class Register extends React.Component{

	constructor(props){super(props)}

	componentDidMount() {
		NotificationSystem.newInstance({}, n => notification = n);
	}

	componentWillUnmount() {
		notification.destroy();
	}

	showNotification = (message) => {
		showNotification(message)
	}

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
							<h3 className="account__title" style={{marginBottom : '20%'}}>Register at B-Pro
							</h3>
							<RegisterForm showNotification={this.showNotification} handleSubmit={(e) => e.preventDefault()} {...this.props} onSubmit={false} />
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
