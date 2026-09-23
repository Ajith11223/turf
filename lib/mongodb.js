import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI)

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing. Copy .env.example to .env and fill it in.");
}

// Next.js hot-reloads modules in dev, so cache the connection on globalThis
// to avoid opening a new pool on every request.
let cached = globalThis._mongoose;

if (!cached) {
  cached = globalThis._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 8000
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    console.log(err)
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default connectDB;
