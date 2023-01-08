const { google } = require("googleapis");
const dayjs = require("dayjs");
exports.fetchApi = async (apiKey, q) => {
  try {
    const youtubeService = google.youtube({
      version: "v3",
      auth: apiKey,
    });

    const publishedAfter = dayjs().subtract(1, "minute").toISOString(); // To get the date in particular format.

    const {
      data: { items },
    } = await youtubeService.search.list({
      part: "snippet",
      maxResults: 100,
      order: "date",
      q: q,
      relevanceLanguage: "en",
      publishedAfter: publishedAfter,
    }); // Getting the data from YouTube. 

    const videos = items.map((item) => ({
      title: item.snippet.title,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      videoId: item.id.videoId,
      description: item.snippet.description,
      thumbNails: {
        default: item.snippet.thumbnails.default,
        medium: item.snippet.thumbnails.medium,
        high: item.snippet.thumbnails.high,
      },
      publishedAt: item.snippet.publishedAt,
    })); // Creating new object to get data which we need particular from the youtubeApi

    return videos;
  } catch (err) {
    console.log("Failed to fetch video from Youtube", err);
  }
};
