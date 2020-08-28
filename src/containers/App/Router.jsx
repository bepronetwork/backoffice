import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from './MainWrapper';
import NotFound404 from '../DefaultPage/404/index';
import LogIn from '../Account/LogIn/index';
import Register from '../Account/Register/index';
import MainRoute from './MainRoute';
import CreateApp from '../Account/CreateApp';
import ResetPassword from '../Account/ResetPassword';

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/.well-known/assetlinks.json" />
        <Route exact path="/" component={LogIn} />
        <Route path="/404" component={NotFound404} />
        <Route path="/login" component={LogIn} />
        <Route path="/register" component={Register} />
        <Route path="/password/reset" component={ResetPassword} />
        <Route path="/initial" component={CreateApp} />
        <Route path="/" component={MainRoute} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
