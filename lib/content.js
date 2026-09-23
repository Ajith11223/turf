import { headers } from "next/headers";
import {
  services as staticServices,
  projects as staticProjects,
  testimonials as staticTestimonials
} from "@/lib/site";

/**
 * Pages read their content through these helpers.
 *
 * Each one calls the site's own API. If the API is down, MongoDB is unreachable
 * or the collection is still empty, it quietly returns the sample data from
 * lib/site.js instead — so the site always renders something, even before you
 * have run the seed.
 */

async function baseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  const proto = h.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

async function apiGet(path) {
  const res = await fetch(`${await baseUrl()}${path}`, {
    cache: "no-store",
    headers: { accept: "application/json" }
  });
  if (!res.ok) throw new Error(`API ${path} returned ${res.status}`);
  return res.json();
}

export async function getServices() {
  try {
    const { services } = await apiGet("/api/services");
    if (Array.isArray(services) && services.length) {
      return { items: services, source: "api" };
    }
    throw new Error("empty");
  } catch {
    return { items: staticServices, source: "fallback" };
  }
}

export async function getService(slug) {
  try {
    const { service } = await apiGet(`/api/services/${slug}`);
    if (service) return { item: service, source: "api" };
    throw new Error("empty");
  } catch {
    const item = staticServices.find((s) => s.slug === slug);
    return { item: item || null, source: "fallback" };
  }
}

export async function getProjects({ limit = 24 } = {}) {
  try {
    const { projects } = await apiGet(`/api/projects?limit=${limit}`);
    if (Array.isArray(projects) && projects.length) {
      return { items: projects, source: "api" };
    }
    throw new Error("empty");
  } catch {
    return { items: staticProjects.slice(0, limit), source: "fallback" };
  }
}

export async function getTestimonials() {
  try {
    const { testimonials } = await apiGet("/api/testimonials");
    if (Array.isArray(testimonials) && testimonials.length) {
      return { items: testimonials, source: "api" };
    }
    throw new Error("empty");
  } catch {
    return { items: staticTestimonials, source: "fallback" };
  }
}

/** Slugs for generateStaticParams / sitemaps, falling back to the sample set. */
export async function getServiceSlugs() {
  const { items } = await getServices();
  return items.map((s) => s.slug).filter(Boolean);
}
