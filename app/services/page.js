import Link from "next/link";
import Image from "next/image";
import { Reveal, MaskedWords, ImageReveal } from "@/components/motion-bits";
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
      <section className="services-page-hero relative flex min-h-[100svh] items-center overflow-hidden bg-pitch px-5 py-28 text-chalk sm:px-8 sm:py-32">
        <Image
          src={images.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="services-hero-image object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pitch/70 via-pitch/35 to-pitch/10" />
        <div className="turf-stripes absolute inset-0 opacity-10" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal delay={0.05} y={14}>
            <p className="mb-6 flex items-center gap-3 text-sm text-lime">
              <span className="h-px w-10 bg-lime" />
              Our core services
            </p>
          </Reveal>
          <Reveal delay={0.13} y={14}>
            <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-chalk/65">
              COMPLETE SPORTS INFRASTRUCTURE
            </p>
          </Reveal>
          <MaskedWords
            as="h1"
            delay={0.18}
            text="One Partner. Complete Sports Solutions."
            className="max-w-5xl font-display text-5xl font-extrabold uppercase leading-[0.98] tracking-normal drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.48} y={16}>
            <p className="mt-8 max-w-xl leading-relaxed text-chalk/75">
              From a single court to a complete multi-sport facility, SPORTICON delivers
              integrated sports infrastructure solutions tailored to your requirements.
            </p>
          </Reveal>
          <Reveal delay={0.58} y={16}>
            <Link
              href="#core-services"
              className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-lime transition-colors hover:text-white"
            >
              Explore services
              <span aria-hidden="true">↓</span>
            </Link>
          </Reveal>
          {source === "fallback" && (
            <Reveal delay={0.68} y={14}>
              <p className="mt-6 inline-block rounded-full border border-chalk/25 px-3 py-1 text-xs text-chalk/60">
                Showing built-in sample content — the content API is unavailable
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <section id="core-services" className="service-turf-background relative isolate overflow-hidden py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-7xl space-y-16 px-5 sm:space-y-24 sm:px-8">
            {services.map((s, i) => (
                <article
                  key={s.slug || s._id}
                  className={`grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-16 ${
                    i % 2 ? "md:[&>figure]:order-2" : ""
                  }`}
                >
                  <figure className="group m-0">
                    <ImageReveal
                      src={s.image || images.services[s.slug] || images.hero}
                      alt={s.title}
                      className="h-[320px] rounded-2xl sm:h-[480px]"
                      imgClassName="transition-transform duration-700 group-hover:scale-105"
                    />
                  </figure>
                  <div className="py-3 lg:py-8">
                    <Reveal delay={0.06} y={16}>
                      <span className="mb-5 block h-1 w-12 rounded-full bg-lime" />
                    </Reveal>
                    <Reveal delay={0.12} y={18}>
                      <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
                        <Link
                          href={`/services/${s.slug}`}
                          className="service-turf-title transition-colors"
                        >
                          {s.title}
                        </Link>
                      </h2>
                    </Reveal>
                    {s.lead && (
                      <Reveal delay={0.2} y={18}>
                        <p className="mt-3 text-lg font-medium text-lime">{s.lead}</p>
                      </Reveal>
                    )}
                    <Reveal delay={0.28} y={18}>
                      <p className="mt-5 max-w-xl leading-relaxed text-chalk/85">{s.body}</p>
                    </Reveal>
                    {s.deliverables?.length > 0 && (
                      <Reveal delay={0.36} y={16}>
                        <ul className="mt-6 flex flex-wrap gap-2">
                          {s.deliverables.map((d) => (
                            <li
                              key={d}
                              className="rounded-full border border-chalk/30 px-3 py-1 text-xs text-chalk"
                            >
                              {d}
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                    )}
                    <Reveal delay={0.44} y={16}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="mt-7 inline-flex items-center gap-3 border-b border-chalk/40 pb-2 text-sm font-semibold text-lime transition-colors hover:border-lime hover:text-chalk"
                      >
                        Explore service
                        <span aria-hidden="true">→</span>
                      </Link>
                    </Reveal>
                  </div>
                </article>
            ))}
        </div>
      </section>

    </>
  );
}
