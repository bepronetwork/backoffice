/* eslint-disable func-names */
import api, { master } from '../../services/api';
import { saveUserAuth, removeUserAuth } from '../../utils/localStorage';

// Action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

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

// Reducer
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.data,
        isAuthenticated: true,
        error: null
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.error,
        user: action.data
      };

    default:
      return state;
  }
}

/**
 * User login
 * @param {Object} credentials
 * @param {String} credentials.username
 * @param {String} credentials.password
 */
export function userLogin({ username, password }) {
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
      saveUserAuth(id, bearerToken);

      dispatch(loginSuccess(response));
    } catch (error) {
      removeUserAuth();
      dispatch(loginError(error));
    }
  };
}
