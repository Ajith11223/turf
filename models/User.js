import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    // select: false keeps the hash out of ordinary queries.
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ["admin", "staff"], default: "staff" },
    lastLoginAt: { type: Date }
  },
  { timestamps: true }
);

// Hash on save, so the seed script and any future admin tooling stay consistent.
UserSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = function comparePassword(plain) {
  return bcrypt.compare(plain, this.password);
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
