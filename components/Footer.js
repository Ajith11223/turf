import Link from "next/link";
import { nav, contact } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-pitch text-chalk">
      <div className="turf-stripes absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-lime font-display text-lg font-extrabold text-pitch">
                G
              </span>
              <span className="font-display text-lg font-extrabold">Gallant Sports</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-chalk/70">
              We design, build, install and maintain sports surfaces across India — from
              school multi-courts to federation-approved football and hockey fields.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Pages</h4>
            <ul className="mt-4 space-y-2 text-sm text-chalk/70">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-lime">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/login" className="hover:text-lime">
                  Team login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Reach us</h4>
            <address className="mt-4 space-y-2 text-sm not-italic text-chalk/70">
              <p>{contact.address}</p>
              {contact.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="block hover:text-lime"
                >
                  {p}
                </a>
              ))}
              <a href={`mailto:${contact.email}`} className="block hover:text-lime">
                {contact.email}
              </a>
            </address>
          </div>
        </div>

        <p className="mt-14 border-t border-chalk/15 pt-6 text-xs text-chalk/50">
          © {new Date().getFullYear()} Gallant Sports. Demo build — sample content and
          placeholder photography.
        </p>
      </div>
    </footer>
  );
}
