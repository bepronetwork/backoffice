import React, { PureComponent } from 'react';
import { Col, Card, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import WizardFormOne from './WizardFormOne';
import WizardFormThree from './WizardFormThree';
import { connect } from "react-redux";
import { compose } from 'lodash/fp';
import NotificationSystem from 'rc-notification';
import { BasicNotification } from '../../../../shared/components/Notification';
import WizardFormTwo from './WizardFormTwo';
import { fromServicesToCodes } from '../../../../controllers/services/services';
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

class WizardForm extends PureComponent {
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

    sendServices = async () => {
        try{

            let services = fromServicesToCodes(this.props.widgets);
            let res = await this.props.profile.addServices(services);
            let{
                status,
                message
            } = res.data;

            if(status != 200){throw res.data}
        }catch(err){
            // TO DO : Show notification Error
        }
    }

    nextPage = () => {
        this.setState({...this.state, page: this.state.page + 1 });
    };

    previousPage = () => {
        this.setState({...this.state, page: this.state.page - 1 });
    };

    render() {
        const { onSubmit } = this.props;
        const { page } = this.state;

    return (
        <Row>
            <Col md={12} lg={12}>
            <Card>
                <div className="wizard">
                    <div className="wizard__steps">
                        <div className={`wizard__step${page === 1 ? ' wizard__step--active' : ''}`}><p>Choose Integrations</p></div>
                        <div className={`wizard__step${page === 2 ? ' wizard__step--active' : ''}`}><p>Chose Widgets</p></div>
                        <div className={`wizard__step${page === 3 ? ' wizard__step--active' : ''}`}><p>Integrate</p></div>
                    </div>
                    <div className="wizard__form-wrapper">
                        {page === 1 && <WizardFormOne showNotification={this.showNotification}
                            onSubmit={this.nextPage}
                            handleSubmit={(e) => e.preventDefault()} {...this.props} 
                            />}
                        {page === 2 && <WizardFormTwo 
                            showNotification={this.showNotification} 
                            previousPage={this.previousPage}
                            handleSubmit={(e) => e.preventDefault()} {...this.props} 
                            onSubmit={this.nextPage}
                            />}
                        {page === 3 && <WizardFormThree 
                            showNotification={this.showNotification} 
                            previousPage={this.previousPage}
                            sendServices={this.sendServices}
                            handleSubmit={(e) => e.preventDefault()} {...this.props} />}
                    </div>
                </div>
            </Card>
            </Col>
        </Row>
        );
    }
}


function mapStateToProps(state){
    return {
        profile: state.profile,
        widgets: state.widgets
    };
}


export default compose(connect(mapStateToProps))(WizardForm);
