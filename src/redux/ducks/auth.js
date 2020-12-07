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
  user: {}
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true };

    default:
      return state;
  }
}
