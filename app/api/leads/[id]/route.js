import connectDB from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { json, fail, requireAuth, pick } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EDITABLE = ["status", "message", "sport", "city", "mobile", "email"];

// GET /api/leads/:id — staff only.
export async function GET(request, { params }) {
  const { response } = await requireAuth();
  if (response) return response;

  const { id } = await params;
  await connectDB();
  const lead = await Lead.findById(id).lean();
  if (!lead) return fail("No enquiry with that id.", 404);
  return json({ lead });
}

// PATCH /api/leads/:id — staff only.
export async function PATCH(request, { params }) {
  const { response } = await requireAuth();
  if (response) return response;

  try {
    const { id } = await params;
    const body = await request.json();

    await connectDB();
    const lead = await Lead.findByIdAndUpdate(id, pick(body, EDITABLE), {
      new: true,
      runValidators: true
    });

    if (!lead) return fail("No enquiry with that id.", 404);
    return json({ lead });
  } catch (err) {
    console.error("lead update error:", err);
    return fail("Could not update the enquiry.", 500);
  }
}

// DELETE /api/leads/:id — staff only.
export async function DELETE(request, { params }) {
  const { response } = await requireAuth();
  if (response) return response;

  const { id } = await params;
  await connectDB();
  const lead = await Lead.findByIdAndDelete(id);
  if (!lead) return fail("No enquiry with that id.", 404);
  return json({ ok: true });
}
