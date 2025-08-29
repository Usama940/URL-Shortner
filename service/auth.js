const sessionIdToUserMap = new Map();

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

function getUSer(id) {
  return sessionIdToUserMap.get(id);
}

module.exports = {
  setUser,
  getUSer,
};
