import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    email: { type: String, unique: true, required: true, match: [/^\S+@\S+\.\S+$/, "Invalid email address"] },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "warehouse_manager"], default: "user"},
    status: { type: String, enum: ["active", "inactive"], default: "inactive"},
    otp: { type: String },
    otpExpiresAt: { type: Date },
    isVerified: { type: Boolean, default: false },
  }, { timestamps: true, _id: false }
)

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const userModel = mongoose.model("user", userSchema)
export default userModel
