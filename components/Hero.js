"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskedWords } from "@/components/motion-bits";
import { images } from "@/lib/images";
import { partners } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1];

/* Mown stripes roll out one band at a time, like turf being laid. */
const stripes = Array.from({ length: 10 });

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const fieldY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const copyFade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-pitch">
      {/* 1 — photo bed, slow Ken Burns push */}
      <motion.div
        style={{ y: fieldY, scale: fieldScale }}
        className="absolute inset-0"
      >
        <motion.div
          initial={{ scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images.hero}
            alt="Floodlit football turf at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-pitch/75" />

        {/* 2 — mown turf stripes wipe up from the ground */}
        <div className="absolute inset-x-0 bottom-0 flex h-[62%] origin-bottom">
          {stripes.map((_, i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.07, ease }}
              className={`h-full flex-1 origin-bottom ${
                i % 2 === 0 ? "bg-[#0a5c2e]/80" : "bg-[#0e7a3c]/70"
              }`}
            />
          ))}
        </div>

        {/* 3 — pitch markings draw themselves onto the turf */}
        <svg
          viewBox="0 0 1200 520"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-x-0 bottom-0 h-[62%] w-full"
          aria-hidden="true"
        >
          <motion.g
            fill="none"
            stroke="rgba(244,248,241,0.55)"
            strokeWidth="3"
            initial="hidden"
            animate="show"
            transform="matrix(1,0,0,0.5,0,240)"
          >
            <motion.rect
              x="70"
              y="-180"
              width="1060"
              height="680"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.6, delay: 0.9, ease }}
            />
            <motion.line
              x1="600"
              y1="-180"
              x2="600"
              y2="500"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 1.6, ease }}
            />
            <motion.circle
              cx="600"
              cy="160"
              r="130"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 1.8, ease }}
            />
            <motion.rect
              x="70"
              y="0"
              width="170"
              height="320"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 2.1, ease }}
            />
            <motion.rect
              x="960"
              y="0"
              width="170"
              height="320"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 2.1, ease }}
            />
          </motion.g>
        </svg>

        {/* 4 — a ball rolls across the halfway line */}
        <motion.div
          initial={{ x: "-12vw", opacity: 0 }}
          animate={{ x: "108vw", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 9,
            delay: 2.4,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "linear",
            opacity: { duration: 9, times: [0, 0.06, 0.9, 1], repeat: Infinity, repeatDelay: 4 }
          }}
          className="absolute bottom-[22%] left-0 h-10 w-10"
          aria-hidden="true"
        >
          <motion.div
            animate={{ rotate: 1080 }}
            transition={{ duration: 9, repeat: Infinity, repeatDelay: 4, ease: "linear" }}
            className="h-full w-full"
          >
            <svg viewBox="0 0 40 40" className="h-full w-full drop-shadow-lg">
              <circle cx="20" cy="20" r="19" fill="#f4f8f1" />
              <path
                d="M20 7l6 4.4-2.3 7H16.3L14 11.4 20 7zM7.5 16.6l5.2 3.8-2 6.9-5.1.1a15 15 0 011.9-10.8zm25 0a15 15 0 011.9 10.8l-5.1-.1-2-6.9 5.2-3.8zM14.4 33.2l3-4.7h5.2l3 4.7a15 15 0 01-11.2 0z"
                fill="#0d1c14"
              />
            </svg>
          </motion.div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-pitch to-transparent" />
      </motion.div>

      {/* 5 — copy */}
      <motion.div
        style={{ y: copyY, opacity: copyFade }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-28 pt-32 sm:px-8"
      >
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6 flex items-center gap-3 text-sm text-lime"
        >
          <span className="h-px w-10 bg-lime" />
          FIFA-quality football turf, built in India
        </motion.p>

        <MaskedWords
          text="Roll out the pitch."
          className="font-display text-[13vw] font-extrabold leading-[0.88] text-chalk sm:text-[9vw] lg:text-[7.5rem]"
        />
        <MaskedWords
          as="h2"
          text="Then never stop playing."
          delay={0.22}
          className="font-display text-[13vw] font-extrabold leading-[0.88] text-lime sm:text-[9vw] lg:text-[7.5rem]"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7, ease }}
          className="mt-10 flex max-w-3xl flex-col gap-7 sm:flex-row sm:items-center"
        >
          <p className="text-base leading-relaxed text-chalk/75 sm:max-w-sm">
            Football turf, athletic tracks, courts and indoor floors — designed, built,
            laid and maintained by one team.
          </p>
          <div className="flex shrink-0 gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-lime px-6 py-3 text-sm font-semibold text-pitch transition hover:bg-chalk"
            >
              Get a turf quote
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-chalk/30 px-6 py-3 text-sm font-semibold text-chalk transition hover:border-lime hover:text-lime"
            >
              See how we build
            </Link>
          </div>
        </motion.div>

        {/* floating spec card */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ delay: 1.4, duration: 0.8, ease }}
          className="absolute right-8 top-1/2 hidden w-64 -translate-y-1/2 overflow-hidden rounded-2xl border border-chalk/15 bg-pitch/70 backdrop-blur xl:block"
        >
          <Image
            src={images.heroInset}
            alt="Close-up of monofilament turf fibres and infill"
            width={800}
            height={1000}
            className="h-40 w-full object-cover"
          />
          <div className="p-5">
            <p className="text-sm font-semibold text-chalk">50 mm monofilament</p>
            <p className="mt-1 text-xs leading-relaxed text-chalk/60">
              Sand and rubber infill over a 12 mm shock pad. Tested for shock absorption on
              site before handover.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* 6 — partner ticker */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-chalk/10 bg-pitch/70 py-4 backdrop-blur">
        <div className="group flex overflow-hidden">
          {[0, 1].map((k) => (
            <div
              key={k}
              aria-hidden={k === 1}
              className="flex shrink-0 items-center gap-16 pr-16 animate-[marquee_45s_linear_infinite] group-hover:[animation-play-state:paused]"
            >
              {partners.map((p) => (
                <span
                  key={p}
                  className="font-display text-lg font-semibold tracking-tight text-chalk/50"
                >
                  {p}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
