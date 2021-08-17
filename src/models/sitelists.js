import mongoose from "mongoose";

const siteSchema = new mongoose.Schema({
  siteName: { type: String, required: true },
  siteUrl: { type: String, required: true },
  siteDetail: String,
  inputId: String,
  // setId: { type: String },
  inputPw: String,
  // setPw: { type: String },
  checkbox: Boolean,
  grade: String,
  attendance: Boolean,
  memo: String,
  owner: { type: String },
});

const Site = mongoose.model("sitelist", siteSchema);

export default Site;
