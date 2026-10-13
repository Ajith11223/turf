"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BlurText, MaskedWords } from "@/components/motion-bits";
import StarBorder from "@/src/component/StarBorder";
import { images } from "@/lib/images";
import { partners } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1];

/* Mown stripes roll out one band at a time, like turf being laid. */
const stripes = Array.from({ length: 10 });
const glowDots = Array.from({ length: 6 });

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
        className="absolute inset-0 z-0"
      >
        <motion.div
          initial={{ scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={images.hero}
            alt="Floodlit football turf at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-110 contrast-105"
          />
        </motion.div>
        <div className="absolute inset-0 z-10 bg-[#05170d]/35" />

        <div className="pointer-events-none absolute inset-0 z-15 opacity-70">
          {glowDots.map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.15, scale: 0.8 }}
              animate={{
                opacity: [0.12, 0.38, 0.18, 0.28],
                scale: [0.8, 1.2, 0.95, 1.1],
                x: [0, 18, -12, 10, 0],
                y: [0, -22, 12, -16, 0]
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.7
              }}
              style={{
                left: `${12 + i * 16}%`,
                top: `${18 + (i % 3) * 22}%`,
                width: `${90 + i * 26}px`,
                height: `${90 + i * 26}px`
              }}
              className="absolute rounded-full bg-lime/10 blur-3xl"
            />
          ))}
        </div>

        {/* 2 — mown turf stripes wipe up from the ground */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex h-[62%] origin-bottom opacity-35">
          {stripes.map((_, i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.07, ease }}
              className={`h-full flex-1 origin-bottom ${
                i % 2 === 0 ? "bg-[#0a5c2e]/20" : "bg-[#0e7a3c]/15"
              }`}
            />
          ))}
        </div>

        {/* 3 — pitch markings draw themselves onto the turf */}
        <svg
          viewBox="0 0 1200 520"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-x-0 bottom-0 z-30 h-[62%] w-full"
          aria-hidden="true"
        >
          <motion.g
            fill="none"
            stroke="rgba(244,248,241,0.12)"
            strokeWidth="1.7"
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
          initial={{ x: "-10vw", y: 0, opacity: 0 }}
          animate={{ x: "112vw", y: [0, -18, 12, 0], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 8,
            delay: 2.4,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: "easeInOut",
            opacity: { duration: 8, times: [0, 0.08, 0.88, 1], repeat: Infinity, repeatDelay: 2.5 }
          }}
          className="absolute bottom-[22%] left-0 z-40 h-12 w-12"
          aria-hidden="true"
        >
          <motion.div
            animate={{ rotate: 1080 }}
            transition={{ duration: 8, repeat: Infinity, repeatDelay: 2.5, ease: "linear" }}
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

        <div className="absolute inset-x-0 bottom-0 z-50 h-40 bg-gradient-to-t from-pitch to-transparent" />
      </motion.div>

      {/* 4 — copy */}
      <motion.div
        style={{ y: copyY, opacity: copyFade }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-28 pt-32 sm:px-8"
      >
        <MaskedWords
          text="Building the Future of Sports Infrastructure."
          className="font-display text-[13vw] font-extrabold leading-[0.88] text-white drop-shadow-[0_10px_24px_rgba(2,10,6,0.8)] sm:text-[9vw] lg:text-[7.5rem]"
          style={{ textShadow: "0 8px 30px rgba(0,0,0,0.45)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7, ease }}
          className="mt-10 flex max-w-3xl flex-col gap-7 sm:flex-row sm:items-center"
        >
          <BlurText
            text="We design, build and maintain world-class sports facilities that bring performance, durability and innovation together."
            className="text-base leading-relaxed text-white/85 sm:max-w-xl"
            delay={65}
            stepDuration={0.4}
          />
          <div className="flex shrink-0 gap-3">
            <StarBorder
              as={Link}
              href="https://wa.me/919958677005"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold"
              color="#d9ff70"
              trailColor="#9ede3f"
              backgroundColor="#9ede3f"
              textColor="#063a1d"
              borderColor="rgba(244, 248, 241, 0.3)"
              radius={999}
              sparkle
            >
              Get a Free Quote
            </StarBorder>
            <Link
              href="/services"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-lime hover:text-lime"
            >
              Explore our work
            </Link>
          </div>
        </motion.div>

        {/* floating spec card */}
        {/* <motion.div
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
        </motion.div> */}
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
