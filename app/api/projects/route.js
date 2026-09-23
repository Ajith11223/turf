import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { json, fail, requireAuth, pick } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EDITABLE = [
  "name",
  "place",
  "type",
  "area",
  "year",
  "image",
  "featured",
  "order",
  "published"
];

// GET /api/projects?limit=6&featured=1 — public card list.
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(50, Number(searchParams.get("limit")) || 24);
    const wantAll = searchParams.get("all") === "1";

    await connectDB();

    let query = { published: true };
    if (wantAll) {
      const { response } = await requireAuth();
      if (response) return response;
      query = {};
    }
    if (searchParams.get("featured") === "1") query.featured = true;

    const projects = await Project.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(limit)
      .lean();

    return json({ projects });
  } catch (err) {
    console.error("projects list error:", err);
    return fail("Could not load projects.", 500);
  }
}

// POST /api/projects — staff only.
export async function POST(request) {
  const { response } = await requireAuth();
  if (response) return response;

  try {
    const body = await request.json();
    if (!body.name) return fail("A project name is required.");

    await connectDB();
    const project = await Project.create(pick(body, EDITABLE));
    return json({ project }, 201);
  } catch (err) {
    console.error("project create error:", err);
    return fail("Could not create the project.", 500);
  }
}
