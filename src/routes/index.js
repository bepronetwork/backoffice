import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { getUserAuth } from '../utils/localStorage';

export default function Routes() {
  const history = useHistory();
  const { isAuthenticated } = useSelector(state => state.auth);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    function checkUserAuthentication() {
      const userAuth = getUserAuth();

      if (!isEmpty(userAuth)) {
        setAuthenticated(true);
        history.push('/');
      } else {
        history.push('/login');
      }
    }
    checkUserAuthentication();
  }, [isAuthenticated]);

  return authenticated ? <AppRoutes /> : <AuthRoutes />;
}
