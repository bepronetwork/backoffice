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
import _ from 'lodash';

let notification = null;

Object.filter = (obj, predicate) => 
    Object.keys(obj)
    .filter( key => predicate(obj[key]) )
    .reduce( (res, key) => (res[key] = obj[key], res)
, {} );

const showNotification = (message) => {
	notification.notice({
		content: 
            <BasicNotification
                title="Your App was Not Created"
                message={message}
            />,
		duration: 5,
		closable: true,
		style: { top: 0, left: 'calc(100vw - 100%)' },
		className: 'right-up',
	});
};


const DEPLOYMENT_CONFIG = {
    none        : {
        isSet : true,
        message : 'Ready for Deployment'
    },
    deployment  : {
        isSet : false,
        message : 'Smart-Contract Deployment being done...'
    },
    authorizeAddress  : {
        isSet : false,
        message : 'Authorize Address to Control the App'
    },
    authorizeCroupier  : {
        isSet : false,
        message : 'Authorize Address to Monitor the Owner'
    },
    choooseServices : {
        isSet : false,
        message : 'Alowing your Services..'
    },
    deployingApplication : {
        isSet : false,
        message : 'Deploying and Hosting your App..'
    },
}

const defaultProps = {
    page: 1,
    blockchains : [],
    currencies : [],
    authorizedAddress : '0x',
    progress : 0,
    deploymentConfig : DEPLOYMENT_CONFIG,
    deploymentState : DEPLOYMENT_CONFIG['none'].message
}


class WizardForm extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = defaultProps;
    }

    componentDidMount() {
        NotificationSystem.newInstance({}, n => notification = n);
        this.projectData();
    }

    componentWillUnmount() {
        notification.destroy();
    }

    showNotification = (message) => {
        showNotification(message)
    }

    projectData = async () => {
        const { profile } = this.props;
        let app = profile.getApp();
        let res = await app.getEcosystemVariables();
        const { addresses, blockchains, currencies } = res.data.message;
        this.setState({...this.state, 
            blockchains,
            authorizedAddress : addresses[0].address,
            currencies
        })

    }

    sendServices = async ({services}) => {
        try{

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

    deployAndHostApplication = async () => {
        try{

            let res = await this.props.profile.getApp().deployAndHostApplication();
            let{
                status,
                message
            } = res.data;

            if(status != 200){throw res.data}
        }catch(err){
            // TO DO : Show notification Error
        }
    }


    getProgress(args){
        return (Object.keys(Object.filter(args, v => v.isSet)).length)/(Object.keys(args).length)*100;
    }

    getUpdateStateForProgress = ({deploymentConfig, state}) => {
        let new_deploymentConfig = {
            ...deploymentConfig, [state] : {
                ...deploymentConfig[state],
                isSet : true,
            }
        } 
        let progress = this.getProgress(new_deploymentConfig);

        this.setState({...this.state, 
            deploymentState  : DEPLOYMENT_CONFIG[state].message,
            deploymentConfig : new_deploymentConfig,
            progress
        });

        return new_deploymentConfig;
    }

    deployApp = async () => {
        try{
            const { profile, appCreation } = this.props;
            this.setState({...this.state, isLoading : true});
            var { authorizedAddress, deploymentConfig } = this.state;
            let user = !_.isEmpty(profile) ? profile : null ;       

            const { services, blockchain, currency } = appCreation;
            /* 1 - Deploy the Smart-Contract */
            let state = 'deployment';
            deploymentConfig = this.getUpdateStateForProgress({state, deploymentConfig});

            let params = {
                tokenAddress : currency.address, 
                decimals : currency.decimals,
                authorizedAddress,
                currencyTicker : currency.ticker, 
                blockchainTicker : blockchain.ticker
            }

            /* 2 - Authorize Address of Owner */
            state = 'authorizeAddress';
            deploymentConfig = this.getUpdateStateForProgress({state, deploymentConfig});
            await profile.authorizeAddress({address : params.ownerAddress, platformParams : params});

            /* 3 - Authorize Croupiers on the Platform */
            state = 'authorizeCroupier';
            deploymentConfig = this.getUpdateStateForProgress({state, deploymentConfig});
            await profile.authorizeCroupier({address : authorizedAddress, platformParams : params});

            /* 4 - Update Service on the Platform */
            state = 'choooseServices';
            deploymentConfig = this.getUpdateStateForProgress({state, deploymentConfig})
            await this.sendServices({services});

            
            /* 5 - Deploying and Hosting Application */
            state = 'deployingApplication';
            deploymentConfig = this.getUpdateStateForProgress({state, deploymentConfig})
            await this.deployAndHostApplication();

            /* Update all */
            await profile.getData();
            this.setState({...this.state, isLoading : false});
        }catch(err){
            console.log(err)
            this.setState({...this.state, isLoading : false});

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
        const { page, isLoading } = this.state;

    return (
        <Row>
            <Col md={12} lg={12}>
            <Card>
                <div className="wizard">
                    <div className="wizard__steps">
                        <div className={`wizard__step${page === 1 ? ' wizard__step--active' : ''}`}><p>Choose Integrations</p></div>
                        <div className={`wizard__step${page === 2 ? ' wizard__step--active' : ''}`}><p>Setup Platform</p></div>
                        <div className={`wizard__step${page === 3 ? ' wizard__step--active' : ''}`}><p>Deploy</p></div>
                    </div>
                    <div className="wizard__form-wrapper">
                        {page === 1 && <WizardFormOne showNotification={this.showNotification}
                            onSubmit={this.nextPage}
                            handleSubmit={(e) => e.preventDefault()} {...this.props} 
                            />}
                        {page === 2 && <WizardFormTwo 
                            showNotification={this.showNotification} 
                            previousPage={this.previousPage}
                            currencies={this.state.currencies}
                            blockchains={this.state.blockchains}
                            handleSubmit={(e) => e.preventDefault()} {...this.props} 
                            onSubmit={this.nextPage}
                            />}
                        {page === 3 && <WizardFormThree 
                            isLoading={isLoading}
                            deployApp={this.deployApp}
                            authorizedAddress={this.state.authorizedAddress}
                            addresses={this.state.addresses}
                            blockchains={this.state.blockchains}
                            deploymentState={this.state.deploymentState}
                            progress={this.state.progress}
                            currencies={this.state.currencies}
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
        appCreation : state.appCreation
    };
}


export default compose(connect(mapStateToProps))(WizardForm);
