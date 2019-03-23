import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from 'mdi-react/FacebookIcon';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import LogInForm from './components/LogInForm';
import { Col, Container, Row } from 'reactstrap';
import { BasicNotification } from '../../../shared/components/Notification';
import NotificationSystem from 'rc-notification';
import * as qs from 'query-string';

const Back = `${process.env.PUBLIC_URL}/img/background-login.png`;

let notification = null;

const showNotification = (message) => {
	notification.notice({
		content: <BasicNotification
			title="There is a problem with your Login"
			message={message}
		/>,
		duration: 5,
		closable: true,
		style: { top: 0, left: 'calc(100vw - 100%)' },
		className: 'right-up',
	});
};

class LogIn extends React.Component{

	constructor(props){super(props); this.state = {}}

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
        const parsed = qs.parse(this.props.location.search);
		return (
			<div className={'container__all'}>
				<Row className={'container__all'} style={{marginTop : '10%'}}>
					<Col lg={6} className={'login_background'}>
						<img className="login_background" src={Back} />
					</Col>
					<Col lg={6}>
						<div className="account__wrapper">
							<div className="account__card">
							<h3 className="account__title" style={{marginBottom : '20%'}}> Login
							</h3>
							<LogInForm query={parsed} handleSubmit={(e) => e.preventDefault()} showNotification={this.showNotification} {...this.props} onSubmit={false} />
							</div>
						</div>
					</Col>
				</Row>
			</div>
		)
	}
};
  

export default LogIn;
