"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const FRAME_COUNT = 100;
const FRAME_PATH = (i: number) =>
  `/hero-frames/frame-${String(i).padStart(3, "0")}.jpg`;

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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

export default function HeroBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);
  const [loaded, setLoaded] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const currentFrameRef = useRef(-1);

  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useHasFinePointer();

  // Global page scroll progress.
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 18,
    mass: 0.5,
  });
  const frameMV = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Cursor parallax — normalized -1..1
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { stiffness: 120, damping: 20, mass: 0.4 };
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-3, 3]), springCfg);
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [2, -2]), springCfg);
  const translateX = useSpring(useTransform(mouseX, [-1, 1], [-8, 8]), springCfg);
  const translateY = useSpring(useTransform(mouseY, [-1, 1], [-6, 6]), springCfg);
  // Very subtle zoom-in to give depth cue.
  const scale = useSpring(1.04, springCfg);

  // Preload frames
  useIsoLayoutEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let cancelled = false;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = FRAME_PATH(i + 1);
      img.onload = () => {
        if (cancelled) return;
        loadedCountRef.current += 1;
        setLoaded(loadedCountRef.current);
        if (loadedCountRef.current === FRAME_COUNT) setAllLoaded(true);
        if (i === 0) drawFrame(0);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(window.innerWidth * dpr);
    const h = Math.round(window.innerHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cover fit
    const s = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const dw = img.naturalWidth * s;
    const dh = img.naturalHeight * s;
    const dx = (canvas.width - dw) / 2;
    const dy = (canvas.height - dh) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  // Redraw on frame index change
  useEffect(() => {
    const unsub = frameMV.on("change", (value) => {
      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(value)));
      if (idx !== currentFrameRef.current) {
        currentFrameRef.current = idx;
        drawFrame(idx);
      }
    });
    return () => unsub();
  }, [frameMV]);

  // Redraw on resize (DPR / size changes)
  useEffect(() => {
    const onResize = () => {
      const idx = currentFrameRef.current >= 0 ? currentFrameRef.current : 0;
      drawFrame(idx);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Global mouse tracking
  useEffect(() => {
    if (!finePointer || reducedMotion) {
      mouseX.set(0);
      mouseY.set(0);
      return;
    }
    function onMove(e: MouseEvent) {
      const cx = e.clientX / window.innerWidth;
      const cy = e.clientY / window.innerHeight;
      mouseX.set(cx * 2 - 1);
      mouseY.set(cy * 2 - 1);
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
  }, [finePointer, reducedMotion, mouseX, mouseY]);

  const loadProgress = Math.round((loaded / FRAME_COUNT) * 100);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden bg-cedar-900 pointer-events-none"
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={
          reducedMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
                scale,
                transformPerspective: 1500,
                transformStyle: "preserve-3d",
              }
        }
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
        />
      </motion.div>

      {/* Dark gradient vignette for text legibility over imagery */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cedar-900/40 via-transparent to-cedar-900/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cedar-900/35 via-transparent to-transparent" />

      {!allLoaded && (
        <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50">
          <span className="inline-block h-1 w-24 rounded-full bg-white/10 overflow-hidden">
            <span
              className="block h-full bg-cedar-400 transition-[width] duration-200"
              style={{ width: `${loadProgress}%` }}
            />
          </span>
          <span>{loadProgress}%</span>
        </div>
      )}
    </div>
  );
}
