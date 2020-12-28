import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';

import { getAdminAuth } from 'utils/localStorage';
import { getAdmin } from 'redux/ducks/admin';

import Loading from 'pages/loading';

const Home = lazy(() => import('pages/home'));

function AppRoutes() {
  const dispatch = useDispatch();
  const { admin } = useSelector(state => state.admin);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    function checkAdminAuthentication() {
      const adminAuth = getAdminAuth();

      if (!isNull(admin) && !isEmpty(adminAuth)) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        dispatch(getAdmin({ admin: adminAuth.admin }));
      }
    }
    checkAdminAuthentication();
  }, [admin]);

  return authenticated ? (
    <Suspense fallback={null}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route component={Home} path="/home" />
      </Switch>
    </Suspense>
  ) : (
    <Loading />
  );
}

export default AppRoutes;
