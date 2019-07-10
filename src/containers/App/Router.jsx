import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from './MainWrapper';
import NotFound404 from '../DefaultPage/404/index';
import LockScreen from '../Account/LockScreen/index';
import LogIn from '../Account/LogIn/index';
import Register from '../Account/Register/index';
import Landing from '../Landing/index';
import TeamLanding from '../Landing/Team'
import MainRoute from './MainRoute';
import CreateApp from '../Wizards/CreateApp';




const Router = () => (
	<MainWrapper>
		<main>
		<Switch>
			<Route exact path="/" component={Landing} />
                        <Route exact path="//" component={Landing} />
			<Route path="/about-us" component={TeamLanding} />
			<Route path="/404" component={NotFound404} />
			<Route path="/lock_screen" component={LockScreen} />
			<Route path="/login" component={LogIn} />
			<Route path="/register" component={Register} />
			<Route path='/initial' component={CreateApp}/>
			<Route path="/" component={MainRoute} />
		</Switch>
		</main>
	</MainWrapper>
);


export default Router;
