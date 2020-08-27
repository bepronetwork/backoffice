import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import { BasicNotification } from '../../../shared/components/Notification';
import NotificationSystem from 'rc-notification';
import TextLoop from 'react-text-loop';
import {
  BackgroundBox,
  VerticalSection,
  Container,
  BetProtocolLogo,
  Card,
  CardHeader,
  CardContent,
  Footer,
} from './styles';

let notification = null;

const showNotification = message => {
  notification.notice({
    content: (
      <BasicNotification
        title="There is a problem with your Registering"
        message={message}
      />
    ),
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

const Description = props => {
  const { wordList } = props;

  return (
    <TextLoop>
      {wordList.map(word => (
        <span key={word.id}>{word.text}</span>
      ))}
    </TextLoop>
  );
};
class Register extends React.Component {
  componentDidMount() {
    NotificationSystem.newInstance({}, n => (notification = n));
  }

  componentWillUnmount() {
    notification.destroy();
  }

  showNotification = message => {
    showNotification(message);
  };

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
                  <RegisterForm
                    showNotification={this.showNotification}
                    {...this.props}
                  />
                  {/* <div className="account__have-account">
                    <p>
                      Already have an account? <Link to="/login">Login</Link>
                    </p>
                  </div> */}
                </CardContent>
              </Card>
              <Footer>
                <span>
                  <b>@BetProtocol</b> Technology is a SaaS Platform that
                  provides infrastructure for Gaming Applications
                </span>
              </Footer>
            </Container>
          </VerticalSection>
        </BackgroundBox>
      </>
    );
  };
}

export default Register;
