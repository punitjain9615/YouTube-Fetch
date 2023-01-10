// Requiring modules and other utilities to run NODE App
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const createError = require("http-errors");
const videoDB = require("./models/video.js");
const port = process.env.PORT || 3000;
dotenv.config({ path: "./config.env" });
const { fetchVideos } = require("./utils/fetch-video.js");
const { search } = require("./routes/index.js");
const { replaceTemplate } = require("./utils/replaceTemplate.js");

// Replacing the DATABASE_URI to set the correct URI for MongoDB
const DB = process.env.DATABASE_URI.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
const app = express();
const templateIndex = fs.readFileSync(`${__dirname}/templates/index.html`, "utf-8");
const card = fs.readFileSync(`${__dirname}/templates/video-card.html`, "utf-8");
// It'll automatically fetch video using cron
fetchVideos();

// Connect the DATABASE
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log(`failed to connect to MongoDB: ${err}`);
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HOME URL to get responses
app.get("/", async (req, res, next) => {
  const getInfo = await search(req, res, next);
  const videoInfo = getInfo.videos;
  const cardHTML = await videoInfo
    .map((element) => replaceTemplate(card, element))
    .join("");
  const renderHTML = templateIndex.replace(/{%VIDEO%}/, cardHTML);
  res.end(renderHTML);
});

// Error handling
app.use((req, res, next) => {
  next(createError(404));
});

app.listen(port, () => {
  console.log("Server Started");
});
