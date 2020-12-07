import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const Home = lazy(() => import('../pages/home'));

function AppRoutes() {
  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route component={Home} path="/home" />
      </Switch>
    </Suspense>
  );
}

export default AppRoutes;
