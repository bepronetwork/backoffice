import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { getAdminAuth } from 'utils/localStorage';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

/**
 * Global routes wrapper
 * @returns A set of auth based routes
 */
export default function Routes() {
  const history = useHistory();
  const { isAuthenticated, admin } = useSelector(state => state.admin);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    function checkAdminAuthentication() {
      const adminAuth = getAdminAuth();

      if (!isEmpty(adminAuth)) {
        setAuthenticated(true);
        history.push('/');
      } else {
        setAuthenticated(false);
        history.push('/login');
      }
    }
    checkAdminAuthentication();
  }, [isAuthenticated, admin, history]);

  return authenticated ? <AppRoutes /> : <AuthRoutes />;
}
