import React from 'react';
import LogInForm from './components/LogInForm';
import { BasicNotification } from '../../../shared/components/Notification';
import NotificationSystem from 'rc-notification';
import * as qs from 'query-string';
import StepWizard from 'react-step-wizard';
import Input2FA from '../../Inputs/Input2FA';
import Account from '../../../controllers/Account';
import {
  BackgroundBox,
  VerticalSection,
  BetProtocolLogo,
  Container,
  Card,
  CardHeader,
  CardContent,
  Footer,
} from './styles';
import TextLoop from 'react-text-loop';

let notification = null;

const showNotification = message => {
  notification.notice({
    content: (
      <BasicNotification
        title="There is a problem with your Login"
        message={message}
      />
    ),
    duration: 5,
    closable: true,
    style: { top: 0, left: 'calc(100vw - 100%)' },
    className: 'right-up',
  });
};

const defaultState = {
  SW: {},
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
        <span style={{ color: 'white' }} key={word.id}>
          {word.text}
        </span>
      ))}
    </TextLoop>
  );
};

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount() {
    NotificationSystem.newInstance({}, n => (notification = n));
  }

  componentWillUnmount() {
    notification.destroy();
  }

  showNotification = message => {
    showNotification(message);
  };

  onChangeUsername = value => {
    if (value) {
      this.setState({
        username: value,
      });
    } else {
      this.setState({
        username: null,
      });
    }
  };

  onChangePassword = value => {
    if (value) {
      this.setState({
        password: value,
      });
    } else {
      this.setState({
        password: null,
      });
    }
  };

  getInitialRoute = permission => {
    switch (true) {
      case permission.super_admin:
        return '/home';

      case permission.financials:
        return '/home';

      case permission.customization:
        return '/application';

      case permission.withdraw:
        return '/wallet';

      case permission.user_withdraw:
        return '/transactions';

      default:
        return '/home';
    }
  };

  setInstance = SW => this.setState({ ...this.state, SW });

  goTo2FA = () => this.state.SW.nextStep();

  login2FA = async ({ token }) => {
    const { username, password } = this.state;

    try {
      this.setState({ ...this.state, isLoading: true });
      let account = new Account({ username, password, token });
      const res = await account.login2FA();

      this.props.history.push(
        this.getInitialRoute(res.data.message.permission),
      );

      this.setState({ ...this.state, isLoading: false });
    } catch (err) {
      this.setState({ ...this.state, isLoading: false });
      this.showNotification(err.message);
    }
  };

  login = async () => {
    try {
      this.setState({ ...this.state, isLoading: true });
      let account = new Account(this.state);
      const res = await account.login();

      this.props.history.push(
        this.getInitialRoute(res.data.message.permission),
      );

      this.setState({ ...this.state, isLoading: false });
    } catch (err) {
      this.setState({ ...this.state, isLoading: false });
      if (err.status == 37) {
        this.goTo2FA();
      } else {
        this.showNotification(err.message);
      }
    }
  };

  render = () => {
    const { SW } = this.state;
    const parsed = qs.parse(this.props.location.search);

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
                  <h1>Login</h1>
                  <StepWizard instance={this.setInstance}>
                    <LogInForm
                      isLoading={this.state.isLoading}
                      login={this.login}
                      onChangeUsername={this.onChangeUsername}
                      onChangePassword={this.onChangePassword}
                      query={parsed}
                      SW={SW}
                      handleSubmit={e => e.preventDefault()}
                      showNotification={this.showNotification}
                      {...this.props}
                    />
                    <Input2FA
                      isLoading={this.state.isLoading}
                      SW={SW}
                      confirm={this.login2FA}
                    />
                  </StepWizard>
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

export default LogIn;
