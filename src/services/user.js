import api, { master } from './api';

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

export { userLogin2FA };
