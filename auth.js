function getUserPasswordFromDB(username) {
    if (username === 'validUser') {
      return 'validPass';
    }
    return null;
  }
  function authenticate(username, password) {
    const validPassword = getUserPasswordFromDB(username);
    return validPassword === password;
  }
  module.exports = { authenticate, getUserPasswordFromDB };