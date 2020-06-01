import React from 'react';
import { Link } from 'react-router-dom';
import ResetPasswordForm from './components/ResetPasswordForm';
import { Col, Container, Row } from 'reactstrap';
import { BasicNotification } from '../../../shared/components/Notification';
import NotificationSystem from 'rc-notification';

const Back = `${process.env.PUBLIC_URL}/img/dashboard/background-login.png`;
let notification = null;

const showNotification = (message) => {
	notification.notice({
		content: <BasicNotification
			title="There is a problem with your Request"
			message={message}
		/>,
		duration: 5,
		closable: true,
		style: { top: 0, left: 'calc(100vw - 100%)' },
		className: 'right-up',
	});
};
class ResetPassword extends React.Component{

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
							
							<ResetPasswordForm showNotification={this.showNotification} handleSubmit={(e) => e.preventDefault()} {...this.props} onSubmit={false} />
								<div className="account__have-account">
									<p>Back to <Link to="/login">Login</Link></p>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		)
	}
};
  

export default ResetPassword;
