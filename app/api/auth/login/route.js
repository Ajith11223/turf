import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { signToken, COOKIE_NAME, cookieOptions } from "@/lib/auth";

export const runtime = "nodejs";

// POST /api/auth/login  { email, password }
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Enter both your email and password." },
        { status: 400 }
      );
    }

    await connectDB();

    // The hash is select:false on the schema, so ask for it explicitly.
    const user = await User.findOne({ email: String(email).toLowerCase().trim() }).select(
      "+password"
    );

    // Same message for unknown email and wrong password — do not leak which one it was.
    const ok = user && (await user.comparePassword(password));
    if (!ok) {
      return NextResponse.json(
        { error: "That email and password do not match an account." },
        { status: 401 }
      );
    }

    user.lastLoginAt = new Date();
    await user.save({ validateBeforeSave: false });

    const token = await signToken({
      sub: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role
    });

    const response = NextResponse.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
    response.cookies.set(COOKIE_NAME, token, cookieOptions);
    return response;
  } catch (err) {
    console.error("login error:", err);
    return NextResponse.json({ error: "Login failed. Try again." }, { status: 500 });
  }
}
