import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  id:{ type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber:{type:Number, required: true},
  address:{type:String, required: true},
  email: { type: String, required: true, unique: true },
  birth:{type:Number, required: true},
  company: { type: String},
  date_join:{type:Date},
  date_lastLogin:{type:Date},
  allowing_email:{type:Boolean},
  allowing_sns:{type:Boolean},
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
