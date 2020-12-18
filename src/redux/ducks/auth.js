/* eslint-disable func-names */
import api, { master } from 'services/api';
import { saveAdminAuth, removeAdminAuth } from 'utils/localStorage';

import { createSlice } from '@reduxjs/toolkit';

// Reducer
const initialState = {
  admin: null,
  isLoading: false,
  isAuthenticated: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    request: state => ({
      ...state,
      isLoading: true
    }),
    success: (_state, action) => ({
      admin: action.payload,
      isLoading: false,
      isAuthenticated: true,
      error: null
    }),
    error: (_state, action) => ({
      admin: null,
      isLoading: false,
      isAuthenticated: false,
      error: action.payload
    }),
    logout: () => ({
      admin: null,
      isLoading: false,
      isAuthenticated: false,
      error: null
    })
  }
});

export default authSlice.reducer;

const { request, success, error, logout } = authSlice.actions;

/**
 * Admin login
 * @param {Object} credentials
 * @param {String} credentials.username
 * @param {String} credentials.password
 */
export function adminLogin({ username, password }) {
  return async function (dispatch) {
    dispatch(request());
    try {
      const response = await api.post(
        `${master}/api/admins/login`,
        {
          username,
          password
        },
        { interceptor: true }
      );

      const { id, bearerToken } = response;
      saveAdminAuth(id, bearerToken);

      dispatch(success(response));
    } catch (err) {
      removeAdminAuth();
      dispatch(error(err));
    }
  };
}

/**
 * Admin logout
 */
export function adminLogout() {
  return function (dispatch) {
    removeAdminAuth();
    dispatch(logout());
  };
}
