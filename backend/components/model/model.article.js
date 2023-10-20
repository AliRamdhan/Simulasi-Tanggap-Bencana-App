const mongoose = require("mongoose");

const articleSchema = mongoose.model("article", {
  articleTitle: { type: String, required: true },
  articlePicture: { type: String, required: true },
  articleContent: { type: String, required: true },
  articleAuthor: { type: String, default: "Tanggap Lab" },
  articleType: {
    type: String,
    enum: ["Bencana", "Evakuasi"],
    required: true,
  },
  articleTopic: {
    type: String,
    enum: [
      "Banjir",
      "Gempa Bumi",
      "Tanah Longsor",
      "Gunung Meletus",
      "Tsunami",
    ],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = articleSchema;
