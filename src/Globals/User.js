module.exports = {
  setCurrentUser(user) {
    User = user
  },
  getCurrentUser() {
    if(User !== null) {
      return User
    }
  },
};