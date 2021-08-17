import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user_id: String,
  userId: String,
  siteUrl: { type: String },
  siteName: String,
  siteDetail: String,
  groupName: String,
  date: { type: Date },
  CRUD: String,
  check: { type: Boolean, default: false },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
