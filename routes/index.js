const videoDB = require("../models/video.js");
exports.search = async (req, res, next) => {
  try {
    const page = req.query.page || 0;
    const sortBy = "publishedAt";
    let videos;
    if (req.query.search) {
      // videos = await videoDB.fuzzySearch(req.query.title);
      // const filtered = videos.filter((video) => {
      //   return video._doc.confidenceScore? video._doc.confidenceScore> 10 : false;
      // });

      try {
        videos = await videoDB
          .find({ title: { $regex: `${req.query.search}` } })
          .sort({ [sortBy]: 1 }); // searching particular word using regex and then sorting on the basis of publishedDate.
        totalItems = videos.length;
      } catch (err) {
        console.log("Failed to show videos");
      }
    } else {
      try {
        videos = await videoDB.find().sort({ [sortBy]: 1 });
        totalItems = await videoDB.estimatedDocumentCount();
      } catch (err) {
        console.log("Failed to show videos");
      }
    }

    videos = videos.splice(page * 10, 10);
    const totalPages = Math.ceil(totalItems / 10);
    const hasPrev = page > 0;
    const hasNext = page < totalPages;

    const result = {
      videos,
      hasPrev,
      hasNext,
      totalItems,
      totalPages,
    };
    return result;
  } catch (err) {
    console.log("Sorry, Request not accepted!");
  }
};
