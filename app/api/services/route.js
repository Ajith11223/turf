import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { json, fail, requireAuth, pick } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EDITABLE = [
  "slug",
  "title",
  "lead",
  "body",
  "detail",
  "deliverables",
  "faqs",
  "image",
  "order",
  "published"
];

// GET /api/services — public list, published only unless ?all=1 with a session.
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

    const services = await Service.find(query).sort({ order: 1, createdAt: 1 }).lean();
    return json({ services });
  } catch (err) {
    console.error("services list error:", err);
    return fail("Could not load services.", 500);
  }
}

// POST /api/services — create. Staff only.
export async function POST(request) {
  const { response } = await requireAuth();
  if (response) return response;

  try {
    const body = await request.json();
    if (!body.title || !body.slug) return fail("A title and a slug are required.");

    await connectDB();

    const exists = await Service.findOne({ slug: body.slug.toLowerCase() });
    if (exists) return fail("That slug is already used by another service.", 409);

    const service = await Service.create(pick(body, EDITABLE));
    return json({ service }, 201);
  } catch (err) {
    console.error("service create error:", err);
    return fail("Could not create the service.", 500);
  }
}
