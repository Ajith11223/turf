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

// GET /api/services/:slug — public.
export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    await connectDB();
    const service = await Service.findOne({ slug: slug.toLowerCase() }).lean();
    if (!service) return fail("No service with that slug.", 404);
    return json({ service });
  } catch (err) {
    console.error("service read error:", err);
    return fail("Could not load the service.", 500);
  }
}

// PATCH /api/services/:slug — update. Staff only.
export async function PATCH(request, { params }) {
  const { response } = await requireAuth();
  if (response) return response;

  try {
    const { slug } = await params;
    const body = await request.json();

    await connectDB();
    const service = await Service.findOneAndUpdate(
      { slug: slug.toLowerCase() },
      pick(body, EDITABLE),
      { new: true, runValidators: true }
    );

    if (!service) return fail("No service with that slug.", 404);
    return json({ service });
  } catch (err) {
    console.error("service update error:", err);
    return fail("Could not update the service.", 500);
  }
}

// DELETE /api/services/:slug — staff only.
export async function DELETE(request, { params }) {
  const { response } = await requireAuth();
  if (response) return response;

  try {
    const { slug } = await params;
    await connectDB();
    const service = await Service.findOneAndDelete({ slug: slug.toLowerCase() });
    if (!service) return fail("No service with that slug.", 404);
    return json({ ok: true });
  } catch (err) {
    console.error("service delete error:", err);
    return fail("Could not delete the service.", 500);
  }
}
