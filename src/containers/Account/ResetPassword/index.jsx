import React from 'react';
import { Link } from 'react-router-dom';
import ResetPasswordForm from './components/ResetPasswordForm';
import { Col, Row } from 'reactstrap';
import { BasicNotification } from '../../../shared/components/Notification';
import NotificationSystem from 'rc-notification';
import { BackgroundBox, VerticalSection, Container, BetProtocolLogo, Card, CardHeader, CardContent } from './styles';
import TextLoop from 'react-text-loop';

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
								<h1>Reset your Password</h1>
							<ResetPasswordForm showNotification={this.showNotification} handleSubmit={(e) => e.preventDefault()} {...this.props} onSubmit={false} />
								<div className="account__have-account">
									<p>Back to <Link to="/login">Login</Link></p>
								</div>
							</CardContent>
						</Card>
					</Container>
				</VerticalSection>
			</BackgroundBox>
		</>
		
		)
	}
};
  

export default ResetPassword;
