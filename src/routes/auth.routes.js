import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const Login = lazy(() => import('../pages/login'));

function AuthRoutes() {
  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route component={Login} path="/login" exact />
      </Switch>
    </Suspense>
  );
}

export default AuthRoutes;
