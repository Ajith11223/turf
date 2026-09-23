/**
 * Creates (or updates) the single admin account.
 * Run: npm run seed:admin
 * Values come from ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME in .env
 */
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;

if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Set MONGODB_URI, ADMIN_EMAIL and ADMIN_PASSWORD in .env first.");
  process.exit(1);
}

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
    lastLoginAt: Date
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

await mongoose.connect(MONGODB_URI);

const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);

await User.findOneAndUpdate(
  { email: ADMIN_EMAIL.toLowerCase() },
  {
    name: ADMIN_NAME || "Site Admin",
    email: ADMIN_EMAIL.toLowerCase(),
    password: hash,
    role: "admin"
  },
  { upsert: true, new: true, setDefaultsOnInsert: true }
);

console.log(`Admin ready: ${ADMIN_EMAIL}`);
await mongoose.disconnect();
process.exit(0);
