import mongoose from "mongoose";

const siteSchema = new mongoose.Schema({
  checkbox: { type: Boolean },
  grade: { type: String },
  attendance: { type: Boolean },
  sitaName: { type: String },
  siteUrl: { type: String },
  selectLoginId: { type: String },
});

const Site = mongoose.model("sitelist", siteSchema);

export default Site;
