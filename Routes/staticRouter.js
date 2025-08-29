const express = require("express");

const router = express.Router();
router.get("/", async (req, res) => {
  return res.render("home");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

module.exports = router;
