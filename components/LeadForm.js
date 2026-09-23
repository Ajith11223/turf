"use client";

import { useState } from "react";

const empty = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  city: "",
  sport: "",
  message: ""
};

const field =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-stone/70 focus:border-turf focus:outline-none";

export default function LeadForm() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setStatus({ state: "sending", message: "" });
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: window.location.pathname })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not send the enquiry.");
      setForm(empty);
      setStatus({
        state: "done",
        message: "Enquiry received. Someone from the team calls back within one working day."
      });
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <input required className={field} placeholder="First name" value={form.firstName} onChange={set("firstName")} />
      <input required className={field} placeholder="Last name" value={form.lastName} onChange={set("lastName")} />
      <input required type="email" className={field} placeholder="Email" value={form.email} onChange={set("email")} />
      <input required className={field} placeholder="Mobile" value={form.mobile} onChange={set("mobile")} />
      <input required className={field} placeholder="City" value={form.city} onChange={set("city")} />
      <select className={field} value={form.sport} onChange={set("sport")}>
        <option value="">Sport / surface</option>
        <option>Football turf</option>
        <option>Athletic track</option>
        <option>Basketball court</option>
        <option>Badminton / indoor</option>
        <option>Padel or pickleball</option>
        <option>Multi-sport</option>
      </select>
      <textarea
        className={`${field} sm:col-span-2`}
        rows={4}
        placeholder="Site size, timeline, anything already built"
        value={form.message}
        onChange={set("message")}
      />

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status.state === "sending"}
          className="rounded-full bg-turf px-7 py-3 text-sm font-semibold text-white transition hover:bg-pitch disabled:opacity-60"
        >
          {status.state === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        {status.message && (
          <p
            role="status"
            className={`text-sm ${status.state === "error" ? "text-red-600" : "text-turf"}`}
          >
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
