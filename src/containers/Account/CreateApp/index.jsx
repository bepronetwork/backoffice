import React from 'react';
import { connect } from 'react-redux';

import TextLoop from 'react-text-loop';
import NotificationSystem from 'rc-notification';
import { BasicNotification } from '../../../shared/components/Notification';

import {
  BackgroundBox,
  BetProtocolLogo,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Container,
  Footer,
  VerticalSection,
} from './styles';
import CreateAppForm from './components/CreateAppForm';

let notification = null;

const showNotification = message => {
  notification.notice({
    content: (
      <BasicNotification
        title="There is a problem with app creation"
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
  return (
    <TextLoop>
      {words.map(word => (
        <span style={{ color: 'white' }} key={word.id}>
          {word.text}
        </span>
      ))}
    </TextLoop>
  );
};

class CreateApp extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
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

  createApp = async data => {
    const { profile, history } = this.props;
    const { name, description, virtual } = data;

    try {
      this.setState({ isLoading: true });

      await profile.createApp({
        name: name,
        description: description,
        virtual: virtual,
        // TO DO : Create Metadata JSON Add on Inputs (Logo and Other Data)
        metadataJSON: JSON.stringify({}),
        // TO DO : Create MarketType Setup
        marketType: 0,
      });

      history.push('/home');

      this.setState({ isLoading: false });
    } catch (err) {
      this.setState({ isLoading: false });
      showNotification(err.message);
    }
  };

  render() {
    const { isLoading } = this.state;

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
                  <h1>Create your First Application</h1>
                  <CreateAppForm isLoading={isLoading} />
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
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

export default connect(mapStateToProps)(CreateApp);
