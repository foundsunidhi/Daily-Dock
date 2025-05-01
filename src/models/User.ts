import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  empCode: { type: String, required: true, unique: true,match: /^viskk\d{4}$/, },
  role: { type: String, required: true },
  password: { type: String, required: true },
  }, { timestamps: true });

// Pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  const user = this as any;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err) {
    next(err as mongoose.CallbackError);
  }
});

const User = mongoose.model("User", userSchema);
export default User;


