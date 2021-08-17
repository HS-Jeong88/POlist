import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  groupName: { type: String, unique: true },
  members: [{ userid: String, admin: Boolean }],
  date_join: Date,
  date_leave: Date,
  alert: [{ who: String, what: String, when: Date }],
  record: [{ who: String, what: String, when: Date }],
  team: [
    {
      teamName: String,
      memberId: String,
      authority: String,
      managerMemo: String,
    },
  ],
});

const Group = mongoose.model("Group", groupSchema);

export default Group;
