"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Small round X used by every dismissible surface in the site. */
export function CloseButton({ onClick, label = "Close", tone = "light", className = "" }) {
  const styles =
    tone === "dark"
      ? "border-chalk/30 text-chalk hover:border-lime hover:text-lime"
      : "border-line text-ink hover:border-turf hover:text-turf";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border bg-transparent transition ${styles} ${className}`}
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
        <path
          d="M5 5l10 10M15 5L5 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

export default function Modal({ open, onClose, title, children, footer, size = "md" }) {
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("body-lock");
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("body-lock");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const width =
    size === "lg" ? "max-w-3xl" : size === "sm" ? "max-w-md" : "max-w-xl";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-pitch/60 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`relative flex max-h-[92svh] w-full ${width} flex-col overflow-hidden rounded-t-2xl bg-white sm:rounded-2xl`}
          >
            <header className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
              <h2 className="text-xl">{title}</h2>
              <CloseButton onClick={onClose} label="Close dialog" />
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>

            {footer && (
              <footer className="flex flex-wrap items-center justify-end gap-3 border-t border-line bg-chalk px-6 py-4">
                {footer}
              </footer>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
