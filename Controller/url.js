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
    });

    return res.render("home", {
      newUrl: `http://localhost:8800/url/${shortID}`,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Something went wrong", details: err.message });
  }
}

module.exports = { generateNewShortUrl };
