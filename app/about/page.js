import Image from "next/image";
import { Reveal, MaskedWords, Counter, Marquee, ImageReveal } from "@/components/motion-bits";
import { stats, partners } from "@/lib/site";
import { getProjects } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata = {
  title: "About — Gallant Sports",
  description:
    "A 360° sports infrastructure company: consultation, construction, manufacturing, installation and maintenance."
};

const values = [
  {
    title: "Injury-free play",
    body: "Shock absorption and rotational resistance are tested on site, not quoted from a datasheet. A surface that hurts to fall on gets used less.",
    image: images.about.team
  },
  {
    title: "Built for 12 hours a day",
    body: "School facilities run from assembly to floodlit evening coaching. Every spec is sized for that load, not for a photo on handover day.",
    image: images.services["fencing-lighting"]
  },
  {
    title: "Water that goes somewhere",
    body: "Perforated drainage and rainwater harvesting are part of the base design, so play resumes within the hour after monsoon rain.",
    image: images.about.sustainability
  },
  {
    title: "Recycled where it counts",
    body: "Shock pads and play-area surfaces use reclaimed rubber, and old turf is lifted and repurposed for landscape rather than dumped.",
    image: images.services.manufacture
  }
];

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const { items: projects } = await getProjects({ limit: 9 });

  return (
    <>
      <section className="relative overflow-hidden bg-pitch px-5 pb-20 pt-40 text-chalk sm:px-8 sm:pt-48">
        <Image
          src={images.about.story}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-6 flex items-center gap-3 text-sm text-lime">
            <span className="h-px w-10 bg-lime" />
            About
          </p>
          <MaskedWords
            text="We started because good pitches kept arriving late and playing badly."
            className="max-w-5xl font-display text-4xl font-extrabold sm:text-6xl"
          />
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <ImageReveal
            src={images.about.team}
            alt="Gallant Sports crew on a completed football field"
            className="h-[380px] rounded-2xl lg:h-[540px]"
          />
          <Reveal delay={0.1} className="space-y-5 leading-relaxed text-stone">
            <p>
              Gallant Sports runs the whole chain: consultation, civil construction,
              manufacturing and maintenance. Owning each stage is the only way we found to
              stop the finger-pointing that follows a surface failure.
            </p>
            <p>
              More than 800 projects later, we build for schools, universities, government
              bodies and corporates spending CSR budgets — from a single rooftop court to
              federation-approved football and hockey fields.
            </p>
            <p>
              Our maintenance machines are the least glamorous part of the business and the
              part that decides whether a facility is still certified in year five. We would
              rather sell you a service calendar than a replacement surface.
            </p>
            <p className="font-display text-2xl font-extrabold text-ink">
              We build. You play.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-line bg-pitch py-20 text-chalk">
        <div className="turf-stripes absolute inset-0 opacity-25" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 sm:px-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <p className="font-display text-5xl font-extrabold text-lime">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-chalk/70">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <MaskedWords
            as="h2"
            text="How we decide things"
            className="font-display text-4xl font-extrabold sm:text-5xl"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 0.08}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white sm:flex-row">
                  <div className="relative h-44 sm:h-auto sm:w-44 sm:shrink-0">
                    <Image
                      src={v.image}
                      alt={v.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 176px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl">{v.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone">{v.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-t border-line bg-chalk py-16">
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

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-3xl font-extrabold">Selected projects</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p._id || p.name} delay={(i % 3) * 0.07}>
                <article className="group overflow-hidden rounded-2xl border border-line">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={p.image || images.hero}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-pitch">
                      {p.year}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl">{p.name}</h3>
                    <p className="mt-1 text-sm text-stone">
                      {p.place} · {p.area}
                    </p>
                    <p className="mt-3 text-sm font-medium text-turf">{p.type}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
