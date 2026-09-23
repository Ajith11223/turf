import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const required = ["firstName", "lastName", "email", "mobile", "city"];

// POST /api/leads — public. The contact form writes here.
export async function POST(request) {
  try {
    const body = await request.json();

    const missing = required.filter((k) => !body?.[k]?.toString().trim());
    if (missing.length) {
      return NextResponse.json(
        { error: `These fields are needed: ${missing.join(", ")}.` },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(body.email)) {
      return NextResponse.json({ error: "Check the email address." }, { status: 400 });
    }

    await connectDB();

    const lead = await Lead.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      mobile: body.mobile,
      city: body.city,
      sport: body.sport,
      message: body.message,
      source: body.source
    });

    return NextResponse.json({ id: lead._id, ok: true }, { status: 201 });
  } catch (err) {
    console.error("lead create error:", err);
    return NextResponse.json({ error: "Could not save the enquiry." }, { status: 500 });
  }
}

// GET /api/leads?page=1&limit=20 — signed-in staff only.
export async function GET(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Sign in to view leads." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(50, Number(searchParams.get("limit")) || 20);
    const status = searchParams.get("status");

    const query = status ? { status } : {};

    await connectDB();

    const [leads, total] = await Promise.all([
      Lead.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Lead.countDocuments(query)
    ]);

    return NextResponse.json({ leads, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("lead list error:", err);
    return NextResponse.json({ error: "Could not load leads." }, { status: 500 });
  }
}

// PATCH /api/leads  { id, status } — signed-in staff only.
export async function PATCH(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Sign in to update leads." }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Send an id and a status." }, { status: 400 });
    }

    await connectDB();
    const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

    if (!lead) {
      return NextResponse.json({ error: "No lead with that id." }, { status: 404 });
    }
    return NextResponse.json({ lead });
  } catch (err) {
    console.error("lead update error:", err);
    return NextResponse.json({ error: "Could not update the lead." }, { status: 500 });
  }
}
