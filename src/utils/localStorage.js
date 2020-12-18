/**
 * Save admin credentials on local storage
 * @param {String} admin Admin id
 * @param {String} bearerToken User bearer token
 */
function saveAdminAuth(admin, bearerToken) {
  localStorage.setItem(
    'Auth',
    JSON.stringify({
      admin,
      bearerToken
    })
  );
}

/**
 * Remove admin credentials from local storage
 */
function removeAdminAuth() {
  localStorage.removeItem('Auth');
}

/**
 * Get admin credentials from local storage
 */
function getAdminAuth() {
  const adminCredentials = localStorage.getItem('Auth');

  return JSON.parse(adminCredentials || '{}');
}

export { saveAdminAuth, removeAdminAuth, getAdminAuth };
