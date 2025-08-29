const express = require("express");
const router = express.Router();
const { handelUserSignUp, handleUserLogin } = require("../Controller/user");

router.post("/signup", handelUserSignUp);
router.post("/login", handleUserLogin);

module.exports = router;
