const cron = require("node-cron");
const { fetchApi } = require("./fetchApi.js");
const video = require("../models/video.js");
const APIS = process.env.YOUTUBE_APIS.split(",");
const query = process.env.QUERY;

exports.fetchVideos = async () => {
  cron.schedule("10 * * * * *", async () => {
    try {
      let taskComplete = false;

      for (let apiKey of APIS) {
        try {
          if (taskComplete === true) {
            break; // if the task is completed then we can break out of the loop
          }
          const videos = await fetchApi(apiKey, query);
          await video.create(videos);
          taskComplete = true; 
        } catch (err) {
          console.log("Error saving video in Dababase");
        }
      }
    } catch (err) {
      console.log("Sorry, API Quota exhausted for all APIS KEYS!");
    }
  });
};
