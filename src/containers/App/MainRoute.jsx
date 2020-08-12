import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../scss/app.scss';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import Layout from '../Layout';
import { Route } from 'react-router-dom';
import Account from '../../controllers/Account';
import routesStructure from './routes';
import _ from 'lodash';
import { WalletContainer } from '../Wallet';
import WalletWidget from '../Wallet/components/paths/WalletWidget';
import UsersContainer from '../Users';
import StatsContainer from '../Stats';
import AffiliatesContainer from '../Affiliates';
import Developers from '../Developers';
import TransactionsContainer from '../Transactions';
import BetsContainer from '../Bets';
import GamePage from '../Applications/GamePage';
import UserPage from '../Users/UserPage';
import SettingsContainer from '../Settings';
import DefaultDashboard from '../Dashboards/Default/index';
import Applications from '../Applications';

const loadingBetprotocol = `${process.env.PUBLIC_URL}/img/loading-betprotocol.gif`;

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
            return obj.path === path
        })[0]
    }

    getrouteHistoryObjects = (object, full_path) => {
        let paths = full_path.split("/").filter(el =>  el !== "");
        let objectPaths = [];
    
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

        return (
            <>
            <Layout />
            <div className="container__wrap">
                {routeHistory.map( (routePath, i) => {
                    let last = (i === routeHistory.length - 1);
                    if(i === 0){
                        return <p className={`container__routing__info ${last ? 'routing__current' : null}`} key={i}> <a href = {routePath.path}> {routePath.name} </a> </p>
                    }else{
                        return (
                            <div className={''}>
                                <p className={`container__routing__info__dot ${last ? 'routing__current' : null}`}> &gt; </p>
                                <p className={`container__routing__info__dot ${last ? 'routing__current' : null}`}> {routePath.name}</p>
                            </div>
                        )

                    }
                })}
                <Route path={'/home'} component={DefaultDashboard}/>	
                <Route path={'/users'} component={wrappedUserRoutes}/>	
                <Route path={'/application'} component={wrappedApplicationRoutes}/>	
                <Route path={'/developers'} component={Developers}/>	
                <Route path={'/transactions'} component={TransactionsContainer}/>
                <Route path={'/bets'} component={BetsContainer}/>
                <Route path={'/stats'} component={StatsContainer}/>	
                <Route path={'/wallet'} component={wrappedWalletRoutes}/>	
                <Route path={'/settings'} component={SettingsContainer}/>	
                <Route path={'/account-settings'} component={SettingsContainer}/>	
                <Route path={'/affiliates'} component={AffiliatesContainer}/>	
            </div>
            </>
        )
    }

	render() {
        const { loaded, loading } = this.state;
        
		return (
            <div>
                {!loaded &&
					<div className={`load${loading ? '' : ' loaded'}`}>
					    <div class="load__icon-wrap">
                            <img src={loadingBetprotocol} alt="loading..."/>
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
            <Route path="/wallet/currency" component={WalletWidget} />
		</div>
	)
}


const wrappedUserRoutes = (props) => {
	return(
		<div>
			<Route exact path="/users" component={UsersContainer} />
			<Route path="/users/user" component={UserPage} />
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