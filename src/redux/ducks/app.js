/* eslint-disable func-names */
import api, { master } from 'services/api';

import { createSlice } from '@reduxjs/toolkit';

// Reducer
const initialState = {
  app: null,
  isLoading: false,
  error: null
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    request: state => ({
      ...state,
      isLoading: true
    }),
    success: (_state, action) => ({
      app: action.payload,
      isLoading: false,
      error: null
    }),
    error: (_state, action) => ({
      app: null,
      isLoading: false,
      error: action.payload
    })
  }
});

export default appSlice.reducer;

const { request, success, error } = appSlice.actions;

/**
 * Get app data
 * @param {String} admin Admin id
 * @param {String} app  App id
 */
export function getApp({ admin, app }) {
  return async function (dispatch) {
    dispatch(request());
    try {
      const response = await api.post(
        `${master}/api/app/get/auth`,
        {
          admin,
          app
        },
        { interceptor: true, authentication: true }
      );

      dispatch(success(response));
    } catch (err) {
      dispatch(error(err));
    }
  };
}
