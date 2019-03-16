import React, { PureComponent } from 'react';
import { Col, Card, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import WizardFormOne from './WizardFormOne';
import WizardFormThree from './WizardFormThree';
import NotificationSystem from 'rc-notification';
import { BasicNotification } from '../../../../shared/components/Notification';
let notification = null;


const showNotification = (message) => {
	notification.notice({
		content: <BasicNotification
			title="Your App was Not Created"
			message={message}
		/>,
		duration: 5,
		closable: true,
		style: { top: 0, left: 'calc(100vw - 100%)' },
		className: 'right-up',
	});
};

export default class WizardForm extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
    }

    componentWillUnmount() {
        notification.destroy();
    }

    showNotification = (message) => {
        showNotification(message)
    }


    nextPage = () => {
        this.setState({ page: this.state.page + 1 });
    };

    previousPage = () => {
        this.setState({ page: this.state.page - 1 });
    };

    render() {
        const { onSubmit } = this.props;
        const { page } = this.state;

    return (
        <Row>
            <Col md={12} lg={12}>
                <Card>
                    <div className="wizard">
                    
                        <div className="wizard__form-wrapper">
                            {page === 1 && <WizardFormOne showNotification={this.showNotification} handleSubmit={(e) => e.preventDefault()} {...this.props} onSubmit={false}  />}
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
        );
    }
}

