"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll
} from "framer-motion";
import { nav, contact } from "@/lib/site";
import { CloseButton } from "@/components/Modal";
import { images } from "@/lib/images";

const panel = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.55,
      ease: [0.76, 0, 0.24, 1],
      when: "beforeChildren",
      staggerChildren: 0.06
    }
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
      when: "afterChildren",
      staggerChildren: 0.03,
      staggerDirection: -1
    }
  }
};

const item = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { y: "60%", opacity: 0, transition: { duration: 0.25 } }
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // The home hero is dark, every other page starts white.
  const onDarkHero = pathname === "/" && !solid;

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setSolid(y > 24);
    if (open) return;
    setHidden(y > previous && y > 140);
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("body-lock", open);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("body-lock");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const text = open || onDarkHero ? "text-chalk" : "text-ink";
  const muted = open || onDarkHero ? "text-chalk/75" : "text-stone";

  return (
    <>
      <motion.header
        animate={hidden ? "hidden" : "visible"}
        variants={{ visible: { y: 0 }, hidden: { y: "-115%" } }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
          solid && !open
            ? "border-b border-[#0d7f6b]/20 bg-[#f5f8f2]/95 shadow-[0_12px_32px_rgba(13,28,20,0.12)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3 rounded-full ring-1 ring-[#0d7f6b]/0 transition hover:ring-[#0d7f6b]/20">
            <Image
              src="/images/sporticon-logo.svg"
              alt="Sporticon logo"
              width={220}
              height={56}
              priority
              className="h-8 w-auto sm:h-10"
            />
          </Link>

          <nav className={`hidden items-center gap-1 rounded-full border px-2 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm lg:flex ${
            solid && !open ? "border-[#0d7f6b]/10 bg-white/80" : "border-white/10 bg-white/5"
          }`}>
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  pathname === n.href
                    ? solid && !open
                      ? "bg-[#0d1c14] text-white shadow-sm"
                      : "bg-white text-[#0d1c14] shadow-sm"
                    : solid && !open
                      ? "text-[#0d1c14] hover:bg-[#0d7f6b]/5"
                      : `${muted} hover:bg-white/5 hover:text-white`
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold transition hover:translate-y-[-1px] sm:block ${
                solid && !open
                  ? "bg-[#0d1c14] text-white shadow-[0_12px_30px_rgba(13,28,20,0.20)]"
                  : "bg-gradient-to-r from-[#1dbd91] to-[#0d7f6b] text-white shadow-[0_12px_30px_rgba(13,127,107,0.35)] hover:shadow-[0_16px_35px_rgba(13,127,107,0.45)]"
              }`}
            >
              Plan a pitch
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-modal"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`relative z-[60] grid h-11 w-11 place-items-center rounded-full border transition-all ${
                open || onDarkHero
                  ? "border-white/40 bg-white/10 shadow-[0_8px_24px_rgba(255,255,255,0.08)]"
                  : "border-white/15 bg-white/10 shadow-[0_8px_24px_rgba(13,28,20,0.12)]"
              }`}
            >
              <span className="relative block h-3.5 w-5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={
                      open
                        ? i === 1
                          ? { opacity: 0 }
                          : { rotate: i === 0 ? 45 : -45, y: i === 0 ? 6 : -6 }
                        : { rotate: 0, y: 0, opacity: 1 }
                    }
                    transition={{ duration: 0.3 }}
                    style={{ top: i * 6 }}
                    className={`absolute left-0 block h-0.5 w-5 ${
                      open || onDarkHero ? "bg-white" : "bg-[#0d1c14]"
                    }`}
                  />
                ))}
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            variants={panel}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-[55] overflow-hidden bg-pitch"
          >
            <Image
              src={images.hero}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-20"
            />
            <div className="turf-stripes absolute inset-0 opacity-30" />

            <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between px-5 pb-10 pt-28 sm:px-8">
              {/* Explicit close, in addition to the hamburger toggle and Escape */}
              <motion.div variants={item} className="absolute right-5 top-24 sm:right-8">
                <CloseButton
                  onClick={() => setOpen(false)}
                  label="Close menu"
                  tone="dark"
                />
              </motion.div>

              <nav className="flex flex-col">
                {nav.map((n, i) => (
                  <div key={n.href} className="overflow-hidden border-b border-chalk/15">
                    <motion.div variants={item}>
                      <Link href={n.href} className="group flex items-baseline gap-5 py-4 sm:py-5">
                        <span className="w-8 text-sm text-chalk/50">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-4xl font-extrabold text-chalk transition-colors group-hover:text-lime sm:text-6xl">
                          {n.label}
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </nav>

              <motion.div
                variants={item}
                className="mt-10 grid gap-6 text-sm text-chalk/70 sm:grid-cols-3"
              >
                <div>
                  <p className="mb-1 text-chalk">Call</p>
                  {contact.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="block hover:text-lime"
                    >
                      {p}
                    </a>
                  ))}
                </div>
                <div>
                  <p className="mb-1 text-chalk">Email</p>
                  <a href={`mailto:${contact.email}`} className="hover:text-lime">
                    {contact.email}
                  </a>
                </div>
                <div>
                  <p className="mb-1 text-chalk">Office</p>
                  <p className="max-w-xs">{contact.address}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
