"use client";

import { motion } from "motion/react";
import PanelShell from "./PanelShell";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function IntroPanel({ dict }: { dict: Dictionary }) {
  return (
    <PanelShell variant="bare" width="wide">
      <div className="relative max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-cedar-100 text-xs md:text-sm font-medium tracking-[0.28em] uppercase mb-6 drop-shadow"
        >
          {dict.hero.eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.02] text-white mb-8"
          style={{ textShadow: "0 2px 40px rgba(0,0,0,0.6)" }}
        >
          {dict.hero.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="text-white/85 text-lg md:text-xl max-w-2xl mb-10"
          style={{ textShadow: "0 1px 14px rgba(0,0,0,0.55)" }}
        >
          {dict.hero.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cedar-400 hover:bg-cedar-300 text-cedar-900 font-semibold shadow-lg"
          >
            {dict.hero.cta}
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path
                d="M3 6h6m0 0L6.5 3.5M9 6L6.5 8.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#story"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/35 text-white hover:bg-white/10 backdrop-blur-sm"
          >
            {dict.hero.scroll}
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute -bottom-24 left-0 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/55"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            ↓
          </motion.span>
          <span>Scroll</span>
        </motion.div>
      </div>
    </PanelShell>
  );
}
