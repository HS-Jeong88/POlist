import mongoose, { isValidObjectId } from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  fileUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags.split(",").map((w) => (w.startsWith("#") ? w : `#${w}`));
});

// videoSchema.pre("save", async function () {
//   this.hashtags = this.hashtags[0].split(",").map((w) => (w.startsWith("#") ? w : `#${w}`));
// });

const Video = mongoose.model("Video", videoSchema);

export default Video;
