import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { json, fail, requireAuth, pick } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EDITABLE = ["quote", "name", "role", "sport", "avatar", "rating", "order", "published"];

// PATCH /api/testimonials/:id — staff only.
export async function PATCH(request, { params }) {
  const { response } = await requireAuth();
  if (response) return response;

  try {
    const { id } = await params;
    const body = await request.json();

    await connectDB();
    const testimonial = await Testimonial.findByIdAndUpdate(id, pick(body, EDITABLE), {
      new: true,
      runValidators: true
    });

    if (!testimonial) return fail("No testimonial with that id.", 404);
    return json({ testimonial });
  } catch (err) {
    console.error("testimonial update error:", err);
    return fail("Could not update the testimonial.", 500);
  }
}

// DELETE /api/testimonials/:id — staff only.
export async function DELETE(request, { params }) {
  const { response } = await requireAuth();
  if (response) return response;

  try {
    const { id } = await params;
    await connectDB();
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) return fail("No testimonial with that id.", 404);
    return json({ ok: true });
  } catch (err) {
    console.error("testimonial delete error:", err);
    return fail("Could not delete the testimonial.", 500);
  }
}
