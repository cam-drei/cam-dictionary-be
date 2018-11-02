const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email:  { type: String, required: true, unique: true },
  password: String,
  // bmi: Integer,
  role: { type: String, default: "user", enum: ["admin", "user"] },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  isAccountActivated: { type: Boolean, default: false },
  accountActivationToken: String,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;