"use client";

import { useCallback, useEffect, useState } from "react";
import Modal from "@/components/Modal";

/**
 * One config drives every tab: which endpoint to call, which fields to render,
 * and how to label a row. Adding a new editable collection means adding an
 * entry here plus the matching API route.
 */
const COLLECTIONS = {
  services: {
    label: "Services",
    list: "/api/services?all=1",
    create: "/api/services",
    // Services are addressed by slug, everything else by _id.
    itemUrl: (item) => `/api/services/${item.slug}`,
    key: "services",
    title: (i) => i.title,
    subtitle: (i) => i.lead,
    blank: {
      slug: "",
      title: "",
      lead: "",
      body: "",
      detail: "",
      deliverables: [],
      image: "",
      order: 0,
      published: true
    },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug (URL)", type: "text", required: true, hint: "lowercase-with-dashes" },
      { name: "lead", label: "One-line summary", type: "text" },
      { name: "body", label: "Card text", type: "textarea", rows: 4 },
      {
        name: "detail",
        label: "Detail page copy",
        type: "textarea",
        rows: 8,
        hint: "One paragraph per line. Shown only on the single-service page."
      },
      { name: "deliverables", label: "Deliverables", type: "list", hint: "One per line" },
      { name: "image", label: "Image URL", type: "text", hint: "/images/foo.jpg or a full https URL" },
      { name: "order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" }
    ]
  },

  projects: {
    label: "Project cards",
    list: "/api/projects?all=1",
    create: "/api/projects",
    itemUrl: (item) => `/api/projects/${item._id}`,
    key: "projects",
    title: (i) => i.name,
    subtitle: (i) => [i.place, i.type].filter(Boolean).join(" · "),
    blank: {
      name: "",
      place: "",
      type: "",
      area: "",
      year: "",
      image: "",
      featured: false,
      order: 0,
      published: true
    },
    fields: [
      { name: "name", label: "Project name", type: "text", required: true },
      { name: "place", label: "Location", type: "text" },
      { name: "type", label: "What was built", type: "text" },
      { name: "area", label: "Area", type: "text", hint: "e.g. 11,200 sq m" },
      { name: "year", label: "Year", type: "text" },
      { name: "image", label: "Image URL", type: "text" },
      { name: "featured", label: "Featured", type: "checkbox" },
      { name: "order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" }
    ]
  },

  testimonials: {
    label: "Testimonials",
    list: "/api/testimonials?all=1",
    create: "/api/testimonials",
    itemUrl: (item) => `/api/testimonials/${item._id}`,
    key: "testimonials",
    title: (i) => i.name,
    subtitle: (i) => i.role,
    blank: {
      quote: "",
      name: "",
      role: "",
      sport: "",
      avatar: "",
      rating: 5,
      order: 0,
      published: true
    },
    fields: [
      { name: "quote", label: "Quote", type: "textarea", rows: 6, required: true },
      { name: "name", label: "Person", type: "text", required: true },
      { name: "role", label: "Role / organisation", type: "text" },
      { name: "sport", label: "Sport", type: "text" },
      { name: "avatar", label: "Photo URL", type: "text" },
      { name: "rating", label: "Rating (1–5)", type: "number" },
      { name: "order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" }
    ]
  },

  leads: {
    label: "Enquiries",
    list: "/api/leads?limit=50",
    create: null,
    itemUrl: (item) => `/api/leads/${item._id}`,
    key: "leads",
    title: (i) => `${i.firstName} ${i.lastName}`,
    subtitle: (i) => [i.city, i.sport, i.email].filter(Boolean).join(" · "),
    blank: {},
    fields: [
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["new", "contacted", "quoted", "won", "lost"]
      },
      { name: "city", label: "City", type: "text" },
      { name: "mobile", label: "Mobile", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "sport", label: "Sport", type: "text" },
      { name: "message", label: "Message", type: "textarea", rows: 5 }
    ]
  }
};

const input =
  "w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-stone/70 focus:border-turf focus:outline-none";

function Field({ field, value, onChange }) {
  const common = { id: field.name, className: input };

  return (
    <label className="block" htmlFor={field.name}>
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {field.label}
        {field.required && <span className="text-turf"> *</span>}
      </span>

      {field.type === "textarea" && (
        <textarea
          {...common}
          rows={field.rows || 4}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "list" && (
        <textarea
          {...common}
          rows={4}
          value={Array.isArray(value) ? value.join("\n") : value ?? ""}
          onChange={(e) =>
            onChange(
              e.target.value
                .split("\n")
                .map((v) => v.trim())
                .filter(Boolean)
            )
          }
        />
      )}

      {field.type === "select" && (
        <select {...common} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}

      {field.type === "checkbox" && (
        <input
          id={field.name}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-5 w-5 rounded border-line accent-[#14a44d]"
        />
      )}

      {field.type === "number" && (
        <input
          {...common}
          type="number"
          value={value ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      )}

      {(!field.type || field.type === "text") && (
        <input
          {...common}
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.hint && <span className="mt-1 block text-xs text-stone">{field.hint}</span>}
    </label>
  );
}

export default function AdminPanel({ user }) {
  const [tab, setTab] = useState("services");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null); // the draft object in the modal
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [notice, setNotice] = useState("");

  const config = COLLECTIONS[tab];

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(COLLECTIONS[tab].list, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load this list.");
      setItems(data[COLLECTIONS[tab].key] || []);
    } catch (err) {
      setError(err.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    load();
  }, [load]);

  function openNew() {
    setIsNew(true);
    setEditing({ ...config.blank });
  }

  function openEdit(item) {
    setIsNew(false);
    setEditing({ ...item });
  }

  function closeModal() {
    setEditing(null);
    setSaving(false);
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const url = isNew ? config.create : config.itemUrl(editing);
      const res = await fetch(url, {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed.");
      closeModal();
      setNotice(isNew ? "Created." : "Saved.");
      load();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  async function remove(item) {
    try {
      const res = await fetch(config.itemUrl(item), { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed.");
      setConfirmDelete(null);
      setNotice("Deleted.");
      load();
    } catch (err) {
      setError(err.message);
      setConfirmDelete(null);
    }
  }

  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(""), 2500);
    return () => clearTimeout(id);
  }, [notice]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {Object.entries(COLLECTIONS).map(([key, c]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              tab === key
                ? "bg-turf text-white"
                : "border border-line bg-white text-ink hover:border-turf hover:text-turf"
            }`}
          >
            {c.label}
          </button>
        ))}

        {config.create && (
          <button
            onClick={openNew}
            className="ml-auto rounded-full border border-turf px-5 py-2 text-sm font-semibold text-turf transition hover:bg-turf hover:text-white"
          >
            Add {config.label.replace(/s$/, "").toLowerCase()}
          </button>
        )}
      </div>

      {notice && (
        <p className="mt-6 rounded-lg bg-turf/10 px-4 py-3 text-sm text-turf">{notice}</p>
      )}
      {error && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}

      {loading ? (
        <p className="mt-10 text-sm text-stone">Loading…</p>
      ) : items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line bg-white p-12 text-center">
          <p className="text-stone">
            Nothing here yet. Run <code className="text-ink">npm run seed:content</code> to
            push the sample content into MongoDB, or add the first one now.
          </p>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
          {items.map((item) => (
            <li
              key={item._id || item.slug}
              className="flex flex-wrap items-center justify-between gap-4 px-6 py-5"
            >
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-medium text-ink">
                  {config.title(item)}
                  {item.published === false && (
                    <span className="rounded-full bg-chalk px-2 py-0.5 text-xs text-stone">
                      draft
                    </span>
                  )}
                  {item.status && (
                    <span className="rounded-full bg-turf/10 px-2 py-0.5 text-xs text-turf">
                      {item.status}
                    </span>
                  )}
                </p>
                <p className="mt-1 truncate text-sm text-stone">{config.subtitle(item)}</p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => openEdit(item)}
                  className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition hover:border-turf hover:text-turf"
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirmDelete(item)}
                  className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-stone transition hover:border-red-400 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit / create */}
      <Modal
        open={Boolean(editing)}
        onClose={closeModal}
        size="lg"
        title={
          isNew
            ? `New ${config.label.replace(/s$/, "").toLowerCase()}`
            : `Edit ${config.title(editing || {}) || ""}`
        }
        footer={
          <>
            <button
              onClick={closeModal}
              className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-turf hover:text-turf"
            >
              Cancel
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="rounded-full bg-turf px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-pitch disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </>
        }
      >
        {editing && (
          <div className="grid gap-5">
            {config.fields.map((f) => (
              <Field
                key={f.name}
                field={f}
                value={editing[f.name]}
                onChange={(v) => setEditing((d) => ({ ...d, [f.name]: v }))}
              />
            ))}
          </div>
        )}
      </Modal>

      {/* Delete confirmation */}
      <Modal
        open={Boolean(confirmDelete)}
        onClose={() => setConfirmDelete(null)}
        size="sm"
        title="Delete this entry?"
        footer={
          <>
            <button
              onClick={() => setConfirmDelete(null)}
              className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-turf hover:text-turf"
            >
              Keep it
            </button>
            <button
              onClick={() => remove(confirmDelete)}
              className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Delete
            </button>
          </>
        }
      >
        <p className="text-sm leading-relaxed text-stone">
          {confirmDelete ? config.title(confirmDelete) : ""} will be removed from the site
          straight away. This cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
