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
      <section className="relative min-h-[100svh] overflow-hidden bg-[#0d1c14] text-chalk">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-110 contrast-105"
          />
        </div>

        <div className="absolute inset-0 bg-[#05170d]/20" />
        <div className="absolute inset-x-0 bottom-0 z-20 h-[62%] bg-gradient-to-t from-[#05170d]/45 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-28 pt-32 sm:px-8">
          <Reveal className="mb-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-white">
            <span className="h-px w-10 bg-white" />
            About Sporticon
          </Reveal>

          <MaskedWords
            text="ENGINEERING BETTER SPACES FOR SPORTS"
            className="max-w-5xl font-display text-[13vw] font-extrabold uppercase leading-[0.88] tracking-[-0.08em] text-white drop-shadow-[0_12px_30px_rgba(2,10,6,0.9)] sm:text-[9vw] lg:text-[7.5rem]"
          />

          <Reveal className="mt-8 max-w-3xl">
            <p className="text-base leading-relaxed text-white sm:text-xl">
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
            <Reveal delay={0.1} className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[#0d5a2d]">
              Who we are
            </Reveal>
            <Reveal delay={0.14} className="font-display text-4xl font-extrabold tracking-[-0.06em] text-ink sm:text-5xl">
              From Empty Spaces to Game-Ready Facilities.
            </Reveal>

            <div className="mt-6 space-y-5 text-lg leading-relaxed text-stone">
              <Reveal delay={0.18}>
                <p>
                  Sporticon Infra Private Limited is a sports infrastructure development company
                  dedicated to creating high-quality sporting facilities that combine performance,
                  durability, safety and innovation.
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <p>
                  With over a decade of industry experience and more than 250 completed
                  projects, we work with schools, educational institutions, sports academies,
                  clubs, government organisations, residential communities and private investors
                  across India.
                </p>
              </Reveal>
              <Reveal delay={0.26}>
                <p>
                  From the initial concept and planning to construction, installation and
                  maintenance, we bring together technical expertise and project coordination to
                  transform spaces into purpose-built sporting environments.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink">
                10+ Years Experience
              </span>
              <span className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink">
                End-to-End Delivery
              </span>
            </Reveal>
          </Reveal>
        </div>
      </section>

    </>
  );
}
