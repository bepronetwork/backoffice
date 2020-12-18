import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const Login = lazy(() => import('pages/login'));

function AuthRoutes() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route component={Login} path="/login" />
      </Switch>
    </Suspense>
  );
}

export default AuthRoutes;
