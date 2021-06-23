import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  avatarUrl: { type: String },
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  nickname: { type: String },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  birth: { type: String, required: true },
  gender: { type: String },
  allowingEmail: { type: Boolean },
  allowingSMS: { type: Boolean },
  company: { type: String },
  date_join: { type: Date },
  date_lastLogin: { type: Date },
  address: { type: String, required: true },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 7);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
