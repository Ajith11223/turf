import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export const json = (data, status = 200) => NextResponse.json(data, { status });

export const fail = (message, status = 400) =>
  NextResponse.json({ error: message }, { status });

/**
 * Returns the session, or a ready-made 401 response.
 * Usage: const { session, response } = await requireAuth(); if (response) return response;
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    return { session: null, response: fail("Sign in to make changes.", 401) };
  }
  return { session, response: null };
}

/** Strips keys the client is not allowed to set. */
export function pick(body, fields) {
  const out = {};
  for (const f of fields) {
    if (body[f] !== undefined) out[f] = body[f];
  }
  return out;
}
