import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';
import '../../scss/app.scss';
import Router from './Router';
import store from './store';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import ScrollToTop from './ScrollToTop';
import { config as i18nextConfig } from '../../translations';
import Layout from '../Layout';
import { Route, Switch } from 'react-router-dom';
import Account from '../../controllers/Account';
import routesStructure from './routes';
import _ from 'lodash';
import UsersContainer from '../Users';
import Applications from '../Applications';
import StatsContainer from '../Stats'
import WalletContainer from '../Wallet';
import AffiliatesContainer from '../Affiliates';
import SettingsContainer from '../Settings';
import DepositWidget from '../Wallet/components/paths/DepositWidget';
import DefaultDashboard from '../Dashboards/Default/index';
import Developers from '../Developers';
import TransactionsContainer from '../Transactions';
import WithdrawWidget from '../Wallet/components/paths/WithdrawWidget';
import GamePage from '../Applications/GamePage';

class MainRoute extends React.Component {
	constructor() {
		super();
		this.state = {
            loaded : false,
            loading : true
		};
	}

	asyncCalls = async () => {
        try{
            await this.loginAccount();
            this.enterWebsite();
        }catch(err){
            console.log(err);
            this.props.history.push('/login')
        }
	}

	enterWebsite = () => {
        setTimeout(() => this.setState({ loaded: true }), 300);
        this.setState({ loading: false });
    }

    async loginAccount(){        
        let Acc = this.props.profile;
        //If there is no Account
        if(_.isEmpty(Acc)){ Acc = new Account() };
        try{
            await Acc.auth();
        }catch(err){
            throw err;
        }
    }

    getName(object, path){
        return object.filter(obj => {
            return obj.path == path
        })[0]
    }

    getrouteHistoryObjects = (object, full_path) => {
        let paths = full_path.split("/").filter(el =>  el != "");
        let objectPaths = new Array();
    
        for(var i = 0; i < paths.length; i++){
            let search_object = i < 1 ? object : objectPaths[i-1].children;
            objectPaths.push(this.getName(search_object, "/" + paths[i]));
        }
    
        return objectPaths;
    
    }
    
    
	componentDidMount() {
		this.asyncCalls();
    }
    
    Main = (props) => {
        let { profile } = this.props;
        let routeHistory = this.getrouteHistoryObjects(routesStructure, props.location.pathname);
        if(!profile.hasAppStats()) { return null; }

        return(
            <div>
                <Layout />
                <div className="container__wrap">
                    {routeHistory.map( (routePath, i) => {
                        let last = (i == routeHistory.length - 1);
                        if(i == 0){
                            return <p className={`container__routing__info ${last ? 'routing__current' : null}`}> {routePath.name}</p>
                        }else{
                            return (
                                <div className={''}>
                                    <p className={`container__routing__info__dot ${last ? 'routing__current' : null}`}> > </p>
                                    <p className={`container__routing__info__dot ${last ? 'routing__current' : null}`}> {routePath.name}</p>
                                </div>
                            )
    
                        }
                    })}
                    <Route path={'/home'} component={DefaultDashboard}/>	
                    <Route path={'/users'} component={UsersContainer}/>	
                    <Route path={'/application'} component={wrappedApplicationRoutes}/>	
                    <Route path={'/developers'} component={Developers}/>	
                    <Route path={'/transactions'} component={TransactionsContainer}/>	
                    <Route path={'/stats'} component={StatsContainer}/>	
                    <Route path={'/wallet'} component={wrappedWalletRoutes}/>	
                    <Route path={'/settings'} component={SettingsContainer}/>	
                    <Route path={'/account-settings'} component={SettingsContainer}/>	
                    <Route path={'/affiliates'} component={AffiliatesContainer}/>	
                </div>
            </div>
        )
    }

	render() {
        const { loaded, loading } = this.state;
        
		return (
            <div>
                {!loaded &&
					<div className={`load${loading ? '' : ' loaded'}`}>
					<div className="load__icon-wrap">
						<svg className="load__icon">
						<path fill="#894798" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
						</svg>
					</div>
					</div>
                }
                {loaded ? 
                    <div>
                        {this.Main(this.props)}
                    </div>
                : null
                }
                
            </div>
    )};
}

const wrappedWalletRoutes = (props) => {
	return(
		<div>
			<Route exact path="/wallet" component={WalletContainer} />
			<Route path="/wallet/deposit" component={DepositWidget} />
            <Route path="/wallet/withdraw" component={WithdrawWidget} />
		</div>
	)
}

const wrappedApplicationRoutes = (props) => {
	return(
		<div>
			<Route exact path="/application" component={Applications} />
			<Route path="/application/game" component={GamePage} />
		</div>
	)
}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default compose(
    connect(mapStateToProps)
)(MainRoute);