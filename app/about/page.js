import Image from "next/image";
import { Reveal, MaskedWords, Counter, Marquee, ImageReveal } from "@/components/motion-bits";
import { stats, partners } from "@/lib/site";
import { getProjects } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata = {
  title: "About — Sporticon",
  description:
    "Engineering Better Spaces for Sports — Sporticon Infra Private Limited creates high-quality sports infrastructure across India."
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
      <section className="relative overflow-hidden bg-[#0d1c14] text-chalk">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-80"
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,28,20,0.92)_0%,rgba(13,28,20,0.82)_38%,rgba(13,28,20,0.42)_100%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <Reveal className="mb-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-lime">
            <span className="h-px w-10 bg-lime" />
            About Sporticon
          </Reveal>

          <MaskedWords
            text="ENGINEERING BETTER SPACES FOR SPORTS"
            className="max-w-5xl font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-[5rem]"
          />

          <Reveal className="mt-8 max-w-3xl">
            <p className="text-lg leading-relaxed text-white/80 sm:text-xl">
              Sporticon Infra Private Limited is a sports infrastructure development company
              dedicated to creating high-quality sporting facilities that combine performance,
              durability, safety and innovation.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f5f7f4] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="relative overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_25px_80px_rgba(13,28,20,0.08)]">
            <div className="group relative h-[420px] overflow-hidden sm:h-[500px]">
              <div className="h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-105">
                <Image
                  src="/images/hero.jpeg"
                  alt="Sporticon sports facility development"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1c14]/65 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                250+ completed projects
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col justify-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[#0d5a2d]">
              Who we are
            </p>
            <h2 className="font-display text-4xl font-extrabold tracking-[-0.06em] text-ink sm:text-5xl">
              From Empty Spaces to Game-Ready Facilities.
            </h2>

            <div className="mt-6 space-y-5 text-lg leading-relaxed text-stone">
              <p>
                Sporticon Infra Private Limited is a sports infrastructure development company
                dedicated to creating high-quality sporting facilities that combine performance,
                durability, safety and innovation.
              </p>
              <p>
                With over a decade of industry experience and more than 250 completed
                projects, we work with schools, educational institutions, sports academies,
                clubs, government organisations, residential communities and private investors
                across India.
              </p>
              <p>
                From the initial concept and planning to construction, installation and
                maintenance, we bring together technical expertise and project coordination to
                transform spaces into purpose-built sporting environments.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink">
                10+ Years Experience
              </span>
              <span className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink">
                End-to-End Delivery
              </span>
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}
