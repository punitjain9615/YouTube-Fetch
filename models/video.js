const mongoose = require("mongoose");
const mongooseFuzzySearching = require("mongoose-fuzzy-searching");

const videoSchema = new mongoose.Schema(
  {
    title: String,
    channelId: {
      type: String,
      trim: true,
    },
    channelTitle: {
      type: String,
      trim: true,
    },
    videoId: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    thumbNails: {
      default: {
        url: {
          type: String,
          trim: true,
        },
        with: {
          type: Number,
        },
        height: {
          type: Number,
        },
      },
      medium: {
        url: {
          type: String,
          trim: true,
        },
        with: {
          type: Number,
        },
        height: {
          type: Number,
        },
      },
      high: {
        url: {
          type: String,
          trim: true,
        },
        with: {
          type: Number,
        },
        height: {
          type: Number,
        },
      },
      publishedAt: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Using mongooseFuzzySearching to get the partial searches. 
videoSchema.plugin(mongooseFuzzySearching, {
  fields: ["description","title"],
});
module.exports = mongoose.model("video", videoSchema);
