"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

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
 * PanelShell — scroll-anchored slot that hosts a floating glass card.
 * - Outer motion layer: scroll-driven opacity / y / scale (enter/hold/exit).
 * - Inner motion layer: cursor parallax (rotateX/Y + small translate) — much subtler
 *   than the HeroBackdrop so panels feel "closer" to the viewer than the forest behind.
 *
 * variant="light" — frosted cream on dark backdrop
 * variant="dark"  — dark tinted frosted panel
 * variant="bare"  — no card background (Intro)
 */
export default function PanelShell({
  id,
  children,
  variant = "light",
  width = "wide",
  keepVisible = false,
}: {
  id?: string;
  children: React.ReactNode;
  variant?: "light" | "dark" | "bare";
  width?: "narrow" | "wide";
  keepVisible?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const finePointer = useHasFinePointer();

  // Scroll progress 0→1 as the panel scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.4,
  });

  const opacity = useTransform(
    smooth,
    keepVisible ? [0, 0.18, 1] : [0, 0.18, 0.82, 1],
    keepVisible ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const yScroll = useTransform(
    smooth,
    keepVisible ? [0, 0.2, 1] : [0, 0.2, 0.8, 1],
    keepVisible ? [60, 0, 0] : [60, 0, 0, -50],
  );
  const scaleScroll = useTransform(
    smooth,
    keepVisible ? [0, 0.2, 1] : [0, 0.2, 0.8, 1],
    keepVisible ? [0.96, 1, 1] : [0.96, 1, 1, 0.98],
  );

  // Cursor parallax — subtler than the backdrop (±1.5°, ±3 px) so panels feel
  // a layer closer to the viewer than the forest imagery behind.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorSpring = { stiffness: 120, damping: 22, mass: 0.4 };
  const rotateY = useSpring(
    useTransform(mouseX, [-1, 1], [-1.5, 1.5]),
    cursorSpring,
  );
  const rotateX = useSpring(
    useTransform(mouseY, [-1, 1], [1, -1]),
    cursorSpring,
  );
  const xCursor = useSpring(
    useTransform(mouseX, [-1, 1], [-3, 3]),
    cursorSpring,
  );
  const yCursor = useSpring(
    useTransform(mouseY, [-1, 1], [-2, 2]),
    cursorSpring,
  );

  useEffect(() => {
    if (!finePointer || reduced) {
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
  }, [finePointer, reduced, mouseX, mouseY]);

  const cardClass =
    variant === "dark"
      ? "glass-panel-dark text-white"
      : variant === "light"
        ? "glass-panel text-cedar-900"
        : "";

  const maxW = width === "narrow" ? "max-w-3xl" : "max-w-6xl";

  const sectionHeight = keepVisible
    ? "py-24 md:py-32"
    : "min-h-screen py-20";

  const outerStyle = reduced
    ? undefined
    : { opacity, y: yScroll, scale: scaleScroll };

  const cursorStyle =
    reduced || !finePointer
      ? undefined
      : {
          rotateX,
          rotateY,
          x: xCursor,
          y: yCursor,
          transformPerspective: 1800,
          transformStyle: "preserve-3d" as const,
        };

  return (
    <section
      id={id}
      ref={ref}
      className={`relative flex items-center justify-center px-6 ${sectionHeight}`}
    >
      <motion.div
        style={outerStyle}
        className={`relative w-full ${maxW} will-change-transform`}
      >
        <motion.div
          style={cursorStyle}
          className={`${cardClass} ${variant !== "bare" ? "px-6 md:px-10 lg:px-14 py-10 md:py-14" : ""}`}
        >
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}
