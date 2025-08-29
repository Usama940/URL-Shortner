const { nanoid } = require("nanoid");
const URL = require("../Models/url");

async function generateNewShortUrl(req, res) {
  try {
    const body = req.body;

    if (!body.url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const shortID = nanoid(8);

    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
      createdBy: req.user._id,
    });

    const userUrls = await URL.find({ createdBy: req.user._id });

    return res.render("home", {
      newUrl: `http://localhost:8800/url/${shortID}`,
      urls: userUrls,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Something went wrong", details: err.message });
  }
}

async function handleRedirect(req, res) {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });

    if (!entry) return res.status(404).send("URL not found");

    entry.visitHistory.push({ timestamp: new Date() });
    await entry.save();

    return res.redirect(entry.redirectURL);
  } catch (err) {
    return res.status(500).send("Server error");
  }
}

module.exports = { generateNewShortUrl, handleRedirect };
