import mongoose from "mongoose";

// Powers the "listed card" sections on the home and about pages.
const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    place: { type: String, trim: true },
    type: { type: String, trim: true },
    area: { type: String, trim: true },
    year: { type: String, trim: true },
    image: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

ProjectSchema.index({ order: 1, createdAt: -1 });

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
