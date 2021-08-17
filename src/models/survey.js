import mongoose from "mongoose";

const surveySchema = new mongoose.Schema({
  surveyCategory: String,
  surveyName: String,
  type: {
    Required: Boolean,
    typeName: String,
    subject: String,
    explanation: String,
    option: [{ option: String }],
    RequiredNum: { min: Number, max: Number },
    answer: String,
  },
  groupName: String,
  userId: String,
});

const Survey = mongoose.model("Survey", surveySchema);

export default Survey;
