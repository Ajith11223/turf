import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const COOKIE_NAME = "gs_token";
const EXPIRES = process.env.JWT_EXPIRES_IN || "7d";

function secret() {
  const value = process.env.JWT_SECRET;
  if (!value) throw new Error("JWT_SECRET is missing from the environment.");
  return new TextEncoder().encode(value);
}

/** Creates a signed token. `payload` should stay small: id, email, role. */
export async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("gallant-sports")
    .setExpirationTime(EXPIRES)
    .sign(secret());
}

/** Returns the payload, or null when the token is missing, tampered or expired. */
export async function verifyToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret(), { issuer: "gallant-sports" });
    return payload;
  } catch {
    return null;
  }
}

/** Reads the session inside server components and route handlers. */
export async function getSession() {
  const store = await cookies();
  return verifyToken(store.get(COOKIE_NAME)?.value);
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7
};
