import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import { Reveal, MaskedWords, ImageReveal } from "@/components/motion-bits";
import { contact } from "@/lib/site";
import { images } from "@/lib/images";

export const metadata = {
  title: "Contact — Gallant Sports",
  description: "Tell us about your site and get a drawing and a budget band."
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-pitch px-5 pb-20 pt-40 text-chalk sm:px-8 sm:pt-48">
        <Image
          src={images.surfaces.turf}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="turf-stripes absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-6 flex items-center gap-3 text-sm text-lime">
            <span className="h-px w-10 bg-lime" />
            Contact
          </p>
          <MaskedWords
            text="Send us the site. We will send back a plan."
            className="max-w-4xl font-display text-5xl font-extrabold sm:text-7xl"
          />
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.7fr_1fr]">
          <Reveal className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold text-ink">Delhi NCR office</h2>
              <p className="mt-2 max-w-xs leading-relaxed text-stone">{contact.address}</p>
              <a
                href={contact.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-turf hover:text-pitch"
              >
                Open in Maps
              </a>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-ink">Phone</h2>
              {contact.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="mt-2 block text-stone hover:text-turf"
                >
                  {p}
                </a>
              ))}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-ink">Email</h2>
              <a href={`mailto:${contact.email}`} className="mt-2 block text-stone hover:text-turf">
                {contact.email}
              </a>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-ink">Hours</h2>
              <p className="mt-2 text-stone">{contact.hours}</p>
            </div>
            <ImageReveal
              src={images.contact.office}
              alt="Gallant Sports office location"
              className="h-56 rounded-2xl"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-chalk p-7 sm:p-10">
              <h2 className="text-2xl">Project enquiry</h2>
              <p className="mb-8 mt-2 text-sm text-stone">
                The more you tell us about the site, the more useful the first reply is.
              </p>
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
