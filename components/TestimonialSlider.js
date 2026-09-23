"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials as sample } from "@/lib/site";

/** `items` comes from the API; it falls back to the sample set when empty. */
export default function TestimonialSlider({ items, interval = 7000, tone = "light" }) {
  const testimonials = items?.length ? items : sample;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (next) => {
      setDir(next > index ? 1 : -1);
      setIndex((next + testimonials.length) % testimonials.length);
    },
    [index, testimonials.length]
  );

  useEffect(() => {
    const id = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval, index, testimonials.length]);

  const t = testimonials[Math.min(index, testimonials.length - 1)];
  const avatar =
    t.avatar || `https://picsum.photos/seed/${encodeURIComponent(t.name)}/200/200`;
  const heading = tone === "dark" ? "text-chalk" : "text-ink";
  const muted = tone === "dark" ? "text-chalk/60" : "text-stone";
  const border = tone === "dark" ? "border-chalk/25" : "border-line";

  return (
    <div className="relative">
      <div className="min-h-[340px] sm:min-h-[280px]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.blockquote
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={`font-display text-2xl font-semibold leading-snug sm:text-3xl ${heading}`}>
              {t.quote}
            </p>
            <footer className="mt-8 flex items-center gap-4">
              <Image
                src={avatar}
                alt={t.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <span className="block font-semibold text-turf">{t.name}</span>
                <span className={`block text-sm ${muted}`}>{t.role}</span>
              </div>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={() => go(index - 1)}
          aria-label="Previous testimonial"
          className={`grid h-11 w-11 place-items-center rounded-full border ${border} ${heading} transition hover:border-turf hover:text-turf`}
        >
          ‹
        </button>
        <button
          onClick={() => go(index + 1)}
          aria-label="Next testimonial"
          className={`grid h-11 w-11 place-items-center rounded-full border ${border} ${heading} transition hover:border-turf hover:text-turf`}
        >
          ›
        </button>
        <div className="ml-2 flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-8 bg-turf"
                  : tone === "dark"
                    ? "w-3 bg-chalk/30"
                    : "w-3 bg-line"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
