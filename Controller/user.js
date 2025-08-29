const User = require("../Models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");
const URL = require("../Models/url"); // import URL model

async function handelUserSignUp(req, res) {
  try {
    const { name, email, password } = req.body;

    const newUser = await User.create({ name, email, password });

    // Fetch URLs of the new user (empty)
    const userUrls = await URL.find({ createdBy: newUser._id });

    return res.render("home", {
      message: "Signup successful!",
      user: newUser,
      urls: userUrls,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong!");
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.render("login", { err: "Invalid username or password" });
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);

    // Fetch URLs of current user
    const userUrls = await URL.find({ createdBy: user._id });

    return res.render("home", {
      message: "Login successful!",
      user,
      urls: userUrls,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong!");
  }
}

module.exports = { handelUserSignUp, handleUserLogin };
