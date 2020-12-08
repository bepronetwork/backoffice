import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { getUserAuth } from '../utils/localStorage';

export default function Routes() {
  const auth = useSelector(state => state.auth);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    function checkAuthentication() {
      const userAuth = getUserAuth();

      if (!isEmpty(userAuth)) {
        setAuthenticated(true);
      }
    }

    checkAuthentication();
  }, [auth]);

  return authenticated ? <AppRoutes /> : <AuthRoutes />;
}
