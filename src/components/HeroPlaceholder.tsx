"use client";

import Image from "next/image";
import { motion, useSpring, useTransform, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useHasFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return fine;
}

/**
 * Temporary static placeholder while the hero video is being produced.
 * Keeps the same overlay/parallax feel as HeroBackdrop so the rest of
 * the page doesn't need to change. Swap the import in page.tsx back
 * to HeroBackdrop once the video/frames are ready.
 */
export default function HeroPlaceholder() {
  const reduced = usePrefersReducedMotion();
  const fine = useHasFinePointer();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cfg = { stiffness: 120, damping: 20, mass: 0.4 };
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-2, 2]), cfg);
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [1.5, -1.5]), cfg);
  const x = useSpring(useTransform(mouseX, [-1, 1], [-8, 8]), cfg);
  const y = useSpring(useTransform(mouseY, [-1, 1], [-6, 6]), cfg);
  const scale = useSpring(1.06, cfg);

  useEffect(() => {
    if (!fine || reduced) {
      mouseX.set(0);
      mouseY.set(0);
      return;
    }
    function onMove(e: MouseEvent) {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    }
    function onLeave() {
      mouseX.set(0);
      mouseY.set(0);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [fine, reduced, mouseX, mouseY]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden bg-cedar-900 pointer-events-none"
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={
          reduced
            ? undefined
            : {
                rotateX,
                rotateY,
                x,
                y,
                scale,
                transformPerspective: 1500,
                transformStyle: "preserve-3d",
              }
        }
      >
        <Image
          src="/hero-placeholder.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{
            filter:
              "brightness(0.72) saturate(1.08) contrast(1.04)",
          }}
        />
      </motion.div>

      {/* Cedar tint — blends photo into the site palette */}
      <div className="pointer-events-none absolute inset-0 bg-cedar-900/30 mix-blend-multiply" />
      {/* Dark gradient vignette for text legibility (same as HeroBackdrop) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cedar-900/45 via-cedar-900/10 to-cedar-900/70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cedar-900/45 via-transparent to-transparent" />
    </div>
  );
}
