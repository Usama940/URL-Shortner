const User = require("../Models/user");
const { getUSer } = require("../service/auth");

async function restrictToLoggedINUserOnly(req, res, next) {
  const UserUid = req.cookies.uid;
  if (!UserUid) return res.redirect("/login");

  const user = await getUSer(UserUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedINUserOnly,
};
