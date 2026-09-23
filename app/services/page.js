import Link from "next/link";
import Image from "next/image";
import { Reveal, MaskedWords, ImageReveal } from "@/components/motion-bits";
import { surfaces } from "@/lib/site";
import { getServices } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata = {
  title: "Services — Gallant Sports",
  description:
    "Design, civil works, manufacture, installation, fencing and lighting, and scheduled maintenance for sports surfaces."
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  // API first, sample data from lib/site.js if it is unreachable.
  const { items: services, source } = await getServices();

  return (
    <>
      <section className="relative overflow-hidden bg-pitch px-5 pb-20 pt-40 text-chalk sm:px-8 sm:pt-48">
        <Image
          src={images.services.installation}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="turf-stripes absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-6 flex items-center gap-3 text-sm text-lime">
            <span className="h-px w-10 bg-lime" />
            Services
          </p>
          <MaskedWords
            text="Six stages. One accountable team."
            className="max-w-4xl font-display text-5xl font-extrabold sm:text-7xl"
          />
          <p className="mt-8 max-w-xl leading-relaxed text-chalk/75">
            Most facilities fail at the handover between vendors. We removed the handovers —
            the people who draw it are the people who pour the base, lay the surface and come
            back to service it.
          </p>
          {source === "fallback" && (
            <p className="mt-6 inline-block rounded-full border border-chalk/25 px-3 py-1 text-xs text-chalk/60">
              Showing built-in sample content — the content API is unavailable
            </p>
          )}
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl space-y-20 px-5 sm:px-8">
          {services.map((s, i) => (
            <article
              key={s.slug || s._id}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                i % 2 ? "lg:[&>figure]:order-2" : ""
              }`}
            >
              <figure className="m-0">
                <ImageReveal
                  src={s.image || images.services[s.slug] || images.hero}
                  alt={s.title}
                  className="h-[300px] rounded-2xl sm:h-[420px]"
                />
              </figure>
              <Reveal delay={0.1}>
                <span className="font-display text-sm font-semibold text-turf">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl">
                  <Link href={`/services/${s.slug}`} className="hover:text-turf">
                    {s.title}
                  </Link>
                </h2>
                <p className="mt-3 text-lg text-turf">{s.lead}</p>
                <p className="mt-5 leading-relaxed text-stone">{s.body}</p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {s.deliverables.map((d) => (
                    <li
                      key={d}
                      className="rounded-full border border-line px-3 py-1 text-xs text-ink"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${s.slug}`}
                  className="mt-7 inline-block rounded-full border border-line px-6 py-2.5 text-sm font-semibold text-ink transition hover:border-turf hover:text-turf"
                >
                  Read more about {s.title.toLowerCase()}
                </Link>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-chalk py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-3xl font-extrabold">Surfaces you can pick from</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {surfaces.map((s, i) => (
              <Reveal key={s.name} delay={(i % 4) * 0.07}>
                <div className="overflow-hidden rounded-2xl border border-line bg-white">
                  <div className="relative h-44">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg">{s.name}</h3>
                    <p className="mt-2 text-sm text-stone">{s.spec}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <Link
              href="/contact"
              className="inline-block rounded-full bg-turf px-7 py-3 text-sm font-semibold text-white transition hover:bg-pitch"
            >
              Get a drawing for your site
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
