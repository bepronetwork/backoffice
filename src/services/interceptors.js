import has from 'lodash/has';

/**
 * Check if intercetor is enabled in Axios config
 * @param {*} config
 */
const isInterceptorEnabled = (config = {}) => {
  return !(has(config, 'interceptor') && !config.interceptor);
};

/**
 * Handle Axios success response
 * @param {*} response
 */

const successHandler = response => {
  if (isInterceptorEnabled(response.config)) {
    const { data } = response.data;
    return data.message;
  }
  return 'Please apply sucessHandler interceptor';
};

/**
 * Handle Axios error response
 * @param {*} response
 */

const errorHandler = error => {
  if (isInterceptorEnabled(error.config)) {
    const { message } = error;
    return message;
  }
  return 'Please apply sucessHandler interceptor';
};

export { successHandler, errorHandler };
