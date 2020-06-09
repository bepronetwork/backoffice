import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import { Col, Row } from 'reactstrap';
import { BasicNotification } from '../../../shared/components/Notification';
import NotificationSystem from 'rc-notification';
import TextLoop from 'react-text-loop';
import { BackgroundBox, VerticalSection, Container, BetProtocolLogo, Card, CardHeader, CardContent, Footer } from './styles';

const Back = `${process.env.PUBLIC_URL}/img/dashboard/background-login.png`;
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

const words = [
    { id: 0, text: 'BetProtocol' },
    { id: 1, text: 'Scalable' },
    { id: 2, text: 'Secure & Audited' },
    { id: 3, text: 'No Coding Required' },
  ];
  
  const Description = (props) => {
    const { wordList } = props;
  
    return (
      <TextLoop>
        {wordList.map((word) => (
          <span key={word.id}>{word.text}</span>
        ))}
      </TextLoop>
    );
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
			<>
			<BackgroundBox>
			   <VerticalSection>
				   <ul>
					   <BetProtocolLogo />
					   <Description wordList={words} />
				   </ul>
				   <Container>
					   <Card>
					   <CardHeader />
						   <CardContent>
								<h1>Register</h1>
								<RegisterForm showNotification={this.showNotification} handleSubmit={(e) => e.preventDefault()} {...this.props} onSubmit={false} />
								<div className="account__have-account">
									<p>Already have an account? <Link to="/login">Login</Link></p>
								</div>
						   </CardContent>
					   </Card>
					   <Footer>
						   <span>
							   <b>@BetProtocol</b> Technology is a SaaS Platform that provides
							   infrastructure for Gaming Applications
						   </span>
					   </Footer>
				   </Container>

			   </VerticalSection>
			</BackgroundBox>
		   </>
		)
	}
};

{/* <div className={'container__all'}>
				<Row className={'container__all'} style={{marginTop : '10%'}}>
					<Col lg={6} className={'login_background'}>
						<img className="login_background" src={Back} />
					</Col>
					<Col lg={6}>
						<div className="account__wrapper">
							<div className="account__card">
							
							<RegisterForm showNotification={this.showNotification} handleSubmit={(e) => e.preventDefault()} {...this.props} onSubmit={false} />
								<div className="account__have-account">
									<p>Already have an account? <Link to="/login">Login</Link></p>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</div>
   */}

export default Register;
