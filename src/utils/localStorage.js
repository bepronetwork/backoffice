/**
 * Save user credentials on local storage
 * @param {String} admin User id
 * @param {String} bearerToken User bearer token
 */
function saveUserAuth(admin, bearerToken) {
  localStorage.setItem(
    'Auth',
    JSON.stringify({
      admin,
      bearerToken
    })
  );
}

/**
 * Remove user credentials from local storage
 */
function removeUserAuth() {
  localStorage.removeItem('Auth');
}

/**
 * Get user credentials from local storage
 */
function getUserAuth() {
  const userCredentials = localStorage.getItem('Auth');

  return JSON.parse(userCredentials || '{}');
}

export { saveUserAuth, removeUserAuth, getUserAuth };
