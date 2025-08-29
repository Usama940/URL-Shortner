const user = require("../Models/user");

async function handelUserSignUp(req, res) {
  try {
    const { name, email, password } = req.body;

    await user.create({
      name,
      email,
      password,
    });

    return res.render("home", { message: "Signup successful!" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong!");
  }
}

module.exports = {
  handelUserSignUp,
};
