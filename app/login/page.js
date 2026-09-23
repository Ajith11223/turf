"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { images } from "@/lib/images";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed.");
      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  const field =
    "w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-stone/70 focus:border-turf focus:outline-none";

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        className={field}
        type="email"
        required
        autoComplete="email"
        placeholder="Work email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={field}
        type="password"
        required
        autoComplete="current-password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-full bg-turf px-6 py-3 text-sm font-semibold text-white transition hover:bg-pitch disabled:opacity-60"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>

      <p className="pt-2 text-xs leading-relaxed text-stone">
        Accounts are created by the administrator with{" "}
        <code className="text-ink">npm run seed:admin</code>. There is no public sign-up.
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <section className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-pitch px-5 py-32">
      <Image src={images.hero} alt="" fill sizes="100vw" className="object-cover opacity-25" />
      <div className="turf-stripes absolute inset-0 opacity-30" />

      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl sm:p-10">
        <Link href="/" className="mb-8 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-turf font-display text-lg font-extrabold text-white">
            G
          </span>
          <span className="font-display text-lg font-extrabold text-ink">Gallant Sports</span>
        </Link>
        <h1 className="text-3xl">Team sign in</h1>
        <p className="mb-8 mt-2 text-sm text-stone">
          For staff who manage project enquiries.
        </p>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
}
