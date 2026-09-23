import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { json, fail, requireAuth, pick } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EDITABLE = ["quote", "name", "role", "sport", "avatar", "rating", "order", "published"];

// GET /api/testimonials — public.
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const wantAll = searchParams.get("all") === "1";

    await connectDB();

    let query = { published: true };
    if (wantAll) {
      const { response } = await requireAuth();
      if (response) return response;
      query = {};
    }

    const testimonials = await Testimonial.find(query)
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return json({ testimonials });
  } catch (err) {
    console.error("testimonials list error:", err);
    return fail("Could not load testimonials.", 500);
  }
}

// POST /api/testimonials — staff only.
export async function POST(request) {
  const { response } = await requireAuth();
  if (response) return response;

  try {
    const body = await request.json();
    if (!body.quote || !body.name) return fail("A quote and a name are required.");

    await connectDB();
    const testimonial = await Testimonial.create(pick(body, EDITABLE));
    return json({ testimonial }, 201);
  } catch (err) {
    console.error("testimonial create error:", err);
    return fail("Could not create the testimonial.", 500);
  }
}
