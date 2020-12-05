import api, { master } from './api';

/**
 * User login
 * @param {Object} credentials
 * @param {String} credentials.username
 * @param {String} credentials.password
 */
async function userLogin({ username, password }) {
  return api.post(
    `${master}/api/admins/login`,
    {
      username,
      password
    },
    { interceptor: true }
  );
}

/**
 * User login 2FA
 * @param {Object} credentials
 * @param {String} credentials.username
 * @param {String} credentials.password
 * @param {String} credentials.token
 */
async function userLogin2FA({ username, password, token }) {
  return api.post(
    `${master}/api/admins/login/2fa`,
    {
      username,
      password,
      token
    },
    { interceptor: true }
  );
}

export { userLogin, userLogin2FA };
