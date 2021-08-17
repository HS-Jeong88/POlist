import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  avatarUrl: { type: String },
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  nickname: { type: String },
  phoneNumber: { type: String, required: true },
  zipCode: { type: String, required: true },
  address: { type: String, required: true },
  detailAddress: { type: String },
  email: { type: String, required: true, unique: true },
  birth: { type: String, required: true },
  gender: { type: String },
  allowingEmail: { type: Boolean },
  allowingSMS: { type: Boolean },
  date_join: { type: Date, default: Date.now },
  date_lastLogin: { type: Date },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 7);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
