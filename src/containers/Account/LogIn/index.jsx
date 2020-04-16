import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from 'mdi-react/FacebookIcon';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import LogInForm from './components/LogInForm';
import { Col, Container, Row } from 'reactstrap';
import { BasicNotification } from '../../../shared/components/Notification';
import NotificationSystem from 'rc-notification';
import * as qs from 'query-string';
import StepWizard from 'react-step-wizard';
import Input2FA from '../../Inputs/Input2FA';
import ConnectionSingleton from '../../../api/Connection';
import Account from '../../../controllers/Account';

const Back = `${process.env.PUBLIC_URL}/img/dashboard/background-login.png`;

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

const defaultState = {
    SW : {}
}

class LogIn extends React.Component{

	constructor(props){super(props); this.state = defaultState}

	componentDidMount() {
		NotificationSystem.newInstance({}, n => notification = n);
	}

	componentWillUnmount() {
		notification.destroy();
	}

	showNotification = (message) => {
		showNotification(message)
    }

    
    changeContent = (type, item) => {
        this.setState({[type] : item});
    }

    getInitialRoute = (permission) => {

        switch (true) {
            case permission.super_admin:
                return "/home";
            
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
    }
    
    setInstance = SW => this.setState({ ...this.state, SW });

    goTo2FA = () => this.state.SW.nextStep();

    login2FA = async ({token}) => {
        const { username, password } = this.state;

        try{
            this.setState({...this.state, isLoading : true})
            let account = new Account({username, password, token});
            const res = await account.login2FA();

            this.props.history.push(this.getInitialRoute(res.data.message.permission))
            
            this.setState({...this.state, isLoading : false})
        }catch(err){
            this.setState({...this.state, isLoading : false})
            this.showNotification(err.message);
        }
    }
    
    login = async () => {
        try{
            this.setState({...this.state, isLoading : true})
            let account = new Account(this.state);
            const res = await account.login();

            this.props.history.push(this.getInitialRoute(res.data.message.permission));

            this.setState({...this.state, isLoading : false})
        }catch(err){
            this.setState({...this.state, isLoading : false})
            if(err.status == 37){
                this.goTo2FA();
            }else{
                this.showNotification(err.message);
            }
        }
    }

	render = () => {
        const { SW } = this.state;
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
                                <StepWizard
                                    instance={this.setInstance}
                                >
                                    <LogInForm isLoading={this.state.isLoading} login={this.login} changeContent={this.changeContent} query={parsed} SW={SW} handleSubmit={(e) => e.preventDefault()} showNotification={this.showNotification} {...this.props} onSubmit={false} />
                                    <Input2FA  isLoading={this.state.isLoading} SW={SW} confirm={this.login2FA}/>
                                </StepWizard>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		)
	}
};
  

export default LogIn;
