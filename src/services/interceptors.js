import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';
import { getAdminAuth } from 'utils/localStorage';

/**
 * Check if intercetor is enabled in Axios config
 * @param {*} config
 */
const isInterceptorEnabled = (config = {}) => {
  return !(has(config, 'interceptor') && !config.interceptor);
};

/**
 * Check if authentication is enabled in Axios config
 * @param {*} config
 */
const isAuthenticationEnabled = (config = {}) => {
  return !(has(config, 'authentication') && !config.authentication);
};

/**
 * Intercept Axios response
 * @param {*} response
 */
function responseInterceptor(response) {
  if (isInterceptorEnabled(response.config)) {
    const { data } = response.data;
    const { message, status, errors } = data;

    if (message && errors && errors[0].message) {
      const errorObj = !isEmpty(errors[0].errors)
        ? { name: message, message: errors[0].errors[0].message }
        : { name: message, message: errors[0].message };

      throw errorObj;
    } else if (message && status && parseInt(status, 10) !== 200) {
      const errorObj = {
        name: 'There is a problem with your request',
        message
      };

      throw errorObj;
    } else {
      return message;
    }
  }

  return 'Please apply response interceptor';
}

/**
 * Intercept Axios error
 * @param {String} msg Error message
 * @param {*} response Error response
 * @param {*} config Axios config
 */
function errorInterceptor(msg, response, config) {
  if (isInterceptorEnabled(config)) {
    const { message, errors } = response.data;

    if (message && errors && errors[0].message) {
      const errorObj = !isEmpty(errors[0].errors)
        ? { name: message, message: errors[0].errors[0].message }
        : { name: message, message: errors[0].message };

      throw errorObj;
    } else {
      return msg;
    }
  }

  return 'Please apply error interceptor';
}

/**
 * Intercept Axios authentication
 * @param {*} config Axios request
 */
function authenticationInterceptor(config = {}) {
  if (isAuthenticationEnabled(config)) {
    const adminAuth = getAdminAuth();

    if (!isEmpty(adminAuth)) {
      const { admin, bearerToken } = adminAuth;

      // eslint-disable-next-line no-param-reassign
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${bearerToken}`,
        payload: JSON.stringify({ id: admin })
      };
    }

    return config;
  }

  return 'Please apply auth interceptor';
}

export { responseInterceptor, errorInterceptor, authenticationInterceptor };
