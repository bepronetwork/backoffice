import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';

/**
 * Check if intercetor is enabled in Axios config
 * @param {*} config
 */
const isInterceptorEnabled = (config = {}) => {
  return !(has(config, 'interceptor') && !config.interceptor);
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

export { responseInterceptor, errorInterceptor };
