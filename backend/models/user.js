const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: { type: String },
  otpExpiresAt: { type: Date },
  timestamp: { type: String, default: () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) }
},
)
UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 8);
});

module.exports = mongoose.model("User", UserSchema);
