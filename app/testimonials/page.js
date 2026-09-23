import Link from "next/link";
import Image from "next/image";
import TestimonialSlider from "@/components/TestimonialSlider";
import { Reveal, MaskedWords } from "@/components/motion-bits";
import { getTestimonials, getProjects } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata = {
  title: "Testimonials — Gallant Sports",
  description: "What principals, universities and facility owners say after handover."
};

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const [{ items: testimonials }, { items: projects }] = await Promise.all([
    getTestimonials(),
    getProjects({ limit: 3 })
  ]);

  return (
    <>
      <section className="relative overflow-hidden bg-pitch px-5 pb-20 pt-40 text-chalk sm:px-8 sm:pt-48">
        <Image
          src={images.projects.mangalam}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-6 flex items-center gap-3 text-sm text-lime">
            <span className="h-px w-10 bg-lime" />
            Testimonials
          </p>
          <MaskedWords
            text="The people who use the pitches every day."
            className="max-w-4xl font-display text-5xl font-extrabold sm:text-7xl"
          />
        </div>
      </section>

      <section className="border-b border-line bg-chalk py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <TestimonialSlider items={testimonials} interval={9000} />
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t._id || t.name} delay={(i % 3) * 0.08}>
                <figure className="flex h-full flex-col justify-between rounded-2xl border border-line bg-white p-8">
                  <p className="leading-relaxed text-ink/90">{t.quote}</p>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-5">
                    <Image
                      src={
                        t.avatar ||
                        `https://picsum.photos/seed/${encodeURIComponent(t.name)}/200/200`
                      }
                      alt={t.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <span>
                      <span className="block font-semibold text-turf">{t.name}</span>
                      <span className="block text-sm text-stone">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-chalk py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-3xl font-extrabold">The facilities behind the quotes</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p._id || p.name} delay={i * 0.08}>
                <div className="overflow-hidden rounded-2xl border border-line bg-white">
                  <div className="relative h-52">
                    <Image
                      src={p.image || images.hero}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg">{p.name}</h3>
                    <p className="mt-1 text-sm text-stone">{p.type}</p>
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
              Talk to a reference client
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
