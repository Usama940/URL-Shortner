const express = require("express");
const URL = require("./Models/url");
const cookieParser = require("cookie-parser");

const path = require("path");
const connectToMongoDB = require("./connect");

const app = express();
const PORT = 8000;

const urlRoute = require("./Routes/url");
const staticRoute = require("./Routes/staticRouter");
const userRoute = require("./Routes/user");
const { restrictToLoggedINUserOnly } = require("./middlewere/auth");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/url", restrictToLoggedINUserOnly, urlRoute);

connectToMongoDB(
  "mongodb+srv://usama242r:1234usama1234@cluster0.quqbz.mongodb.net/short-url"
)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo connection error:", err));

app.get("/test", async (req, res) => {
  try {
    const allUrls = await URL.find({});
    return res.render("home", { urls: allUrls });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching URLs");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
