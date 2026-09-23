/**
 * Pushes the sample content in lib/site.js into MongoDB.
 * Run: npm run seed:content
 *
 * Safe to re-run: it upserts on slug (services) and name (projects, testimonials),
 * so existing edits made in the admin are overwritten only for those documents.
 * Pass --fresh to empty the three collections first.
 */
import "dotenv/config";
import mongoose from "mongoose";
import { services, projects, testimonials } from "../lib/site.js";

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
  console.error("Set MONGODB_URI in .env first.");
  process.exit(1);
}

const fresh = process.argv.includes("--fresh");

const ServiceSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const ProjectSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const TestimonialSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);
const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
const Testimonial =
  mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);

await mongoose.connect(MONGODB_URI);

if (fresh) {
  await Promise.all([
    Service.deleteMany({}),
    Project.deleteMany({}),
    Testimonial.deleteMany({})
  ]);
  console.log("Cleared services, projects and testimonials.");
}

for (const [i, s] of services.entries()) {
  await Service.updateOne(
    { slug: s.slug },
    { $set: { ...s, order: i, published: true } },
    { upsert: true }
  );
}

for (const [i, p] of projects.entries()) {
  await Project.updateOne(
    { name: p.name },
    { $set: { ...p, order: i, published: true, featured: i < 3 } },
    { upsert: true }
  );
}

for (const [i, t] of testimonials.entries()) {
  await Testimonial.updateOne(
    { name: t.name },
    { $set: { ...t, order: i, published: true, rating: 5 } },
    { upsert: true }
  );
}

console.log(
  `Seeded ${services.length} services, ${projects.length} projects, ${testimonials.length} testimonials.`
);

await mongoose.disconnect();
process.exit(0);
