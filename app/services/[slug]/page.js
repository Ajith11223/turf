import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal, MaskedWords, ImageReveal } from "@/components/motion-bits";
import { getService, getServices } from "@/lib/content";
import { images } from "@/lib/images";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { item } = await getService(slug);
  if (!item) return { title: "Service not found — Gallant Sports" };
  return {
    title: `${item.title} — Gallant Sports`,
    description: item.lead || item.body?.slice(0, 150)
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;

  // Reads /api/services/:slug. If the API or the database is unavailable it
  // falls back to the sample service in lib/site.js, so the page still renders.
  const { item: service, source } = await getService(slug);
  if (!service) notFound();

  const { items: all } = await getServices();
  const others = all.filter((s) => s.slug !== service.slug).slice(0, 3);
  const hero = service.image || images.services[service.slug] || images.hero;

  return (
    <>
      <section className="relative overflow-hidden bg-pitch px-5 pb-20 pt-40 text-chalk sm:px-8 sm:pt-48">
        <Image src={hero} alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
        <div className="turf-stripes absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-7xl">
          <Link href="/services" className="mb-6 inline-block text-sm text-lime hover:text-chalk">
            ← All services
          </Link>
          <MaskedWords
            text={service.title}
            className="max-w-4xl font-display text-5xl font-extrabold sm:text-7xl"
          />
          {service.lead && (
            <p className="mt-6 max-w-2xl text-xl text-chalk/80">{service.lead}</p>
          )}
          {source === "fallback" && (
            <p className="mt-6 inline-block rounded-full border border-chalk/25 px-3 py-1 text-xs text-chalk/60">
              Showing built-in sample content — the content API is unavailable
            </p>
          )}
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-stone">
              {service.body && <p>{service.body}</p>}
              {(service.detail || "")
                .split("\n")
                .map((p) => p.trim())
                .filter(Boolean)
                .map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
            </div>

            {service.deliverables?.length > 0 && (
              <>
                <h2 className="mt-14 text-2xl">What you get</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-3 rounded-xl border border-line p-4 text-sm text-ink"
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-lime" />
                      {d}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {service.faqs?.length > 0 && (
              <>
                <h2 className="mt-14 text-2xl">Questions we usually get</h2>
                <dl className="mt-6 divide-y divide-line border-y border-line">
                  {service.faqs.map((f, i) => (
                    <div key={i} className="py-5">
                      <dt className="font-semibold text-ink">{f.q}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-stone">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <ImageReveal src={hero} alt={service.title} className="h-80 rounded-2xl" />
            <div className="mt-6 rounded-2xl border border-line bg-chalk p-7">
              <h3 className="text-xl">Want this on your site?</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">
                Send us the area and the sports you want on it. You get a drawing and a
                budget band back.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-block rounded-full bg-turf px-6 py-3 text-sm font-semibold text-white transition hover:bg-pitch"
              >
                Start an enquiry
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t border-line bg-chalk py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="font-display text-3xl font-extrabold">Next stages</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group overflow-hidden rounded-2xl border border-line bg-white"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={s.image || images.services[s.slug] || images.hero}
                      alt={s.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl">{s.title}</h3>
                    <p className="mt-2 text-sm text-stone">{s.lead}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
