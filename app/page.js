import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import TestimonialSlider from "@/components/TestimonialSlider";
import LeadForm from "@/components/LeadForm";
import { Reveal, MaskedWords, Counter, Marquee, ImageReveal, TiltCard } from "@/components/motion-bits";
import { stats, process as buildSteps, surfaces, partners } from "@/lib/site";
import { getServices, getProjects, getTestimonials } from "@/lib/content";
import { images } from "@/lib/images";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Content comes from the API; lib/content.js falls back to the sample data
  // in lib/site.js whenever the API or the database is unavailable.
  const [{ items: services }, { items: projects }, { items: testimonials }] =
    await Promise.all([getServices(), getProjects({ limit: 8 }), getTestimonials()]);

  return (
    <>
      <Hero />

      {/* Stats */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="bg-white p-8">
              <p className="font-display text-5xl font-extrabold text-turf">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-stone">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Surfaces */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <MaskedWords
              as="h2"
              text="Surfaces we lay"
              className="font-display text-4xl font-extrabold sm:text-5xl"
            />
            <p className="max-w-sm text-sm leading-relaxed text-stone">
              Each one is specified for the sport, the climate and the hours of play it has
              to take.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {surfaces.map((s, i) => (
              <Reveal key={s.name} delay={(i % 4) * 0.07}>
                <article className="group overflow-hidden rounded-2xl border border-line bg-white">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl">{s.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone">{s.spec}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process on pitch green */}
      <section className="relative overflow-hidden bg-pitch py-24 text-chalk sm:py-32">
        <div className="turf-stripes absolute inset-0 opacity-25" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <MaskedWords
            as="h2"
            text="One team from the first drawing to the tenth service visit."
            className="max-w-3xl font-display text-4xl font-extrabold sm:text-5xl"
          />
          <div className="mt-16 grid gap-px bg-chalk/15 sm:grid-cols-2 lg:grid-cols-4">
            {buildSteps.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08} className="bg-pitch p-8">
                <span className="font-display text-sm font-semibold text-lime">{p.step}</span>
                <h3 className="mt-6 text-2xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-chalk/70">{p.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services with photos */}
      <section className="bg-chalk py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <MaskedWords
              as="h2"
              text="What we do"
              className="font-display text-4xl font-extrabold sm:text-5xl"
            />
            <Link href="/services" className="text-sm font-semibold text-turf hover:text-pitch">
              All services
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <TiltCard className="h-full">
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:border-turf"
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
                    <div className="p-7">
                      <h3 className="text-2xl">{s.title}</h3>
                      <p className="mt-2 text-sm font-medium text-turf">{s.lead}</p>
                      <p className="mt-4 text-sm leading-relaxed text-stone">{s.body}</p>
                      <span className="mt-5 inline-block text-sm font-semibold text-turf">
                        Read more
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Split feature */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <ImageReveal
            src={images.about.story}
            alt="Installation crew rolling out football turf"
            className="h-[420px] rounded-2xl lg:h-[560px]"
          />
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-extrabold sm:text-5xl">
              Turf that still plays like new in year five
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-stone">
              <p>
                A pitch fails long before the fibres wear out. It fails when the infill
                compacts, when the drainage silts up and nobody comes back to check.
              </p>
              <p>
                So we build the base ourselves, test shock absorption on site before
                handover, and put every facility on a service calendar signed at the start.
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "FIFA Quality tested yarn",
                "12 mm shock pad as standard",
                "Perforated drainage + harvesting",
                "8-year product warranty"
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-lime" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Projects */}
      <section className="overflow-hidden bg-chalk py-24 sm:py-32">
        <div className="mx-auto mb-12 max-w-7xl px-5 sm:px-8">
          <MaskedWords
            as="h2"
            text="Recently handed over"
            className="font-display text-4xl font-extrabold sm:text-5xl"
          />
        </div>
        <Marquee className="py-2">
          {projects.map((p) => (
            <article
              key={p._id || p.name}
              className="w-[340px] shrink-0 overflow-hidden rounded-2xl border border-line bg-white"
            >
              <div className="relative h-48">
                <Image
                  src={p.image || images.hero}
                  alt={p.name}
                  fill
                  sizes="340px"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl">{p.name}</h3>
                <p className="mt-1 text-sm text-stone">
                  {p.place} · {p.area}
                </p>
                <p className="mt-3 text-sm font-medium text-turf">{p.type}</p>
              </div>
            </article>
          ))}
        </Marquee>
      </section>

      {/* Partners */}
      <section className="overflow-hidden border-y border-line bg-white py-16">
        <p className="mx-auto mb-8 max-w-7xl px-5 text-sm text-stone sm:px-8">
          Manufacturing partners
        </p>
        <Marquee slow>
          {partners.map((p) => (
            <span key={p} className="font-display text-2xl font-semibold text-ink/35">
              {p}
            </span>
          ))}
        </Marquee>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.5fr_1fr]">
          <Reveal>
            <h2 className="font-display text-4xl font-extrabold sm:text-5xl">
              What clients say
            </h2>
            <Link
              href="/testimonials"
              className="mt-6 inline-block text-sm font-semibold text-turf hover:text-pitch"
            >
              Read all
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <TestimonialSlider items={testimonials} />
          </Reveal>
        </div>
      </section>

      {/* Lead form */}
      <section className="relative overflow-hidden bg-pitch py-24 text-chalk sm:py-32">
        <Image
          src={images.hero}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1fr]">
          <Reveal>
            <h2 className="font-display text-4xl font-extrabold sm:text-5xl">
              Have a site? Let us call you back.
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-chalk/70">
              Tell us the area, the sports you want on it and when you need it playable.
              You get a drawing and a budget band, not a brochure.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-white p-6 text-ink sm:p-8">
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
