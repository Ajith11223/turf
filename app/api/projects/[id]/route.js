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

// GET /api/projects/:id — public.
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const project = await Project.findById(id).lean();
    if (!project) return fail("No project with that id.", 404);
    return json({ project });
  } catch {
    return fail("Could not load the project.", 400);
  }
}

// PATCH /api/projects/:id — staff only.
export async function PATCH(request, { params }) {
  const { response } = await requireAuth();
  if (response) return response;

  try {
    const { id } = await params;
    const body = await request.json();

    await connectDB();
    const project = await Project.findByIdAndUpdate(id, pick(body, EDITABLE), {
      new: true,
      runValidators: true
    });

    if (!project) return fail("No project with that id.", 404);
    return json({ project });
  } catch (err) {
    console.error("project update error:", err);
    return fail("Could not update the project.", 500);
  }
}

// DELETE /api/projects/:id — staff only.
export async function DELETE(request, { params }) {
  const { response } = await requireAuth();
  if (response) return response;

  try {
    const { id } = await params;
    await connectDB();
    const project = await Project.findByIdAndDelete(id);
    if (!project) return fail("No project with that id.", 404);
    return json({ ok: true });
  } catch (err) {
    console.error("project delete error:", err);
    return fail("Could not delete the project.", 500);
  }
}
