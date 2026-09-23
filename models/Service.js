import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    title: { type: String, required: true, trim: true },
    lead: { type: String, trim: true },
    body: { type: String, trim: true },
    // Long-form copy shown only on the single-service page.
    detail: { type: String, trim: true },
    deliverables: { type: [String], default: [] },
    faqs: {
      type: [{ q: String, a: String }],
      default: []
    },
    image: { type: String, trim: true },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

ServiceSchema.index({ order: 1, createdAt: 1 });

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
