import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../scss/app.scss';
import { connect, useSelector } from "react-redux";
import { compose } from 'lodash/fp'
import Layout from '../Layout';
import { Route, Link } from 'react-router-dom';
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

const MainRoute = ({ history, location }) => {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const profile = useSelector(state => state.profile);

	function enterWebsite(){
        setTimeout(() => setLoaded(true), 300);
        setLoading(false);
    }

    async function loginAccount(){        
        let Acc = profile;
        //If there is no Account
        if(_.isEmpty(Acc)){ Acc = new Account() };
        try{
            await Acc.auth();
        }catch(err){
            throw err;
        }
    }

    useEffect(() => {
        async function fetchAsyncData() {
            try{
                await loginAccount();
                enterWebsite();
            }catch(err){
                history.push('/login')
            }
        }

        fetchAsyncData()
    }, [])


    function getName(object, path) {
        return object.filter(obj => {
            return obj.path === path
        })[0]
    }

    function getrouteHistoryObjects(object, full_path){
        let paths = full_path.split("/").filter(el =>  el !== "");
        let objectPaths = [];
    
        for(var i = 0; i < paths.length; i++){
            let search_object = i < 1 ? object : objectPaths[i-1].children;
            objectPaths.push(getName(search_object, "/" + paths[i]));
        }
    
        return objectPaths;
    
    }
    
    const Main = () => {
        const routeHistory = getrouteHistoryObjects(routesStructure, location.pathname);
    
        if (!profile.hasAppStats()) { return null; }

        return (
            <>
            <Layout />
            <div className="container__wrap">
                {routeHistory.map( (routePath, i) => {
                    let last = (i === routeHistory.length - 1);
                    if(i === 0){
                        return <p className={`container__routing__info ${last ? 'routing__current' : null}`} key={i}> <Link to={routePath.path}> {routePath.name} </Link> </p>
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
                    <Main/>
                </div>
            : null
            }
            
        </div>

    )
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


export default MainRoute;