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

const adminSlice = createSlice({
  name: 'admin',
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
    reset: () => ({
      admin: null,
      isLoading: false,
      isAuthenticated: false,
      error: null
    })
  }
});

export default adminSlice.reducer;

const { request, success, error, reset } = adminSlice.actions;

/**
 * Admin login
 * @param {Object} credentials
 * @param {String} credentials.username
 * @param {String} credentials.password
 */
export function login({ username, password }) {
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
export function logout() {
  return function (dispatch) {
    removeAdminAuth();
    dispatch(reset());
  };
}

/**
 * Get admin authentication data
 * @param {String} admin Admin id
 */
export function getAdmin({ admin }) {
  return async function (dispatch) {
    dispatch(request());
    try {
      const response = await api.post(
        `${master}/api/admins/auth`,
        {
          admin
        },
        { interceptor: true, authentication: true }
      );

      dispatch(success(response));
    } catch (err) {
      dispatch(error(err));
    }
  };
}
