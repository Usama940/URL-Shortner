const express = require("express");
const router = express.Router();
const { handelUserSignUp } = require("../Controller/user");

router.post("/signup", handelUserSignUp);

module.exports = router;
