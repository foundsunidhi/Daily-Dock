import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  empCode: {
    type: String,
    required: true,
    unique: true,
    match: /^viskk\d{4}$/, // Must be like viskk1234
  },
  role: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
