import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  groupName: { type: String },
  groupMember: [{ memberId: String, authority: String }],
  siteList: [
    {
      siteUrl: { type: String },
      siteName: { type: String },
      setId: { type: String },
      setPw: { type: String },
      checkbox: { type: Boolean },
      grade: { type: String },
      attendance: { type: Boolean },
      selectLoginId: { type: String },
      owner: { type: String },
    },
  ],
});

const Group = mongoose.model("Group", groupSchema);

export default Group;
