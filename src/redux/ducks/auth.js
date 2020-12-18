/* eslint-disable func-names */
import api, { master } from 'services/api';
import { saveAdminAuth, removeAdminAuth } from 'utils/localStorage';

// Action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

// Actions
export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

export function loginSuccess(results) {
  return {
    type: LOGIN_SUCCESS,
    data: results,
    error: null
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    data: null,
    error
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

// Reducer
const initialState = {
  isLoading: false,
  isAuthenticated: false,
  admin: null,
  error: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true };

    case LOGIN_SUCCESS:
      return {
        isLoading: false,
        admin: action.data,
        isAuthenticated: true,
        error: null
      };

    case LOGIN_ERROR:
      return {
        isLoading: false,
        isAuthenticated: false,
        error: action.error,
        admin: action.data
      };
    case LOGOUT:
      return {
        isLoading: false,
        isAuthenticated: false,
        error: null,
        admin: null
      };

    default:
      return state;
  }
}

/**
 * Admin login
 * @param {Object} credentials
 * @param {String} credentials.username
 * @param {String} credentials.password
 */
export function adminLogin({ username, password }) {
  return async function (dispatch) {
    dispatch(loginRequest());
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

      dispatch(loginSuccess(response));
    } catch (error) {
      removeAdminAuth();
      dispatch(loginError(error));
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
