import mongoose from "mongoose";

const recommendSchema = new mongoose.Schema({
  siteUrl: { type: String },
  users: [{ userId: String }],
  recommend: { type: Boolean },
  unrecommended: { type: Boolean },
});

const Recommend = mongoose.model("Recommend", recommendSchema);

export default Recommend;
