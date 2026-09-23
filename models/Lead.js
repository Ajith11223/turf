import mongoose from "mongoose";//m

const LeadSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    sport: { type: String, trim: true },
    message: { type: String, trim: true, maxlength: 2000 },
    source: { type: String, trim: true },
    status: {
      type: String,
      enum: ["new", "contacted", "quoted", "won", "lost"],
      default: "new"
    }
  },
  { timestamps: true }
);

LeadSchema.index({ createdAt: -1 });

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
