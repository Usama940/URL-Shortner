const express = require("express");
const { generateNewShortUrl } = require("../Controller/url");
const URL = require("../Models/url");

const router = express.Router();

router.post("/", generateNewShortUrl);

router.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });

    if (!entry) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.redirect(entry.redirectURL);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Something went wrong", details: err.message });
  }
});

module.exports = router;
