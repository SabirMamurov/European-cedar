"use client";

import Image from "next/image";
import PanelShell from "./PanelShell";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const pillarImages = [
  "/images/quality/harvest-control.jpg",
  "/images/quality/kernel-closeup.jpg",
  "/images/quality/modern-equipment.jpg",
  "/images/quality/careful-storage.jpg",
  "/images/quality/vacuum-pack.jpg",
];

const pillarImageAlt = [
  "Pine cones harvested in the Siberian taiga",
  "Close-up of a pine nut kernel",
  "Modern processing equipment at the factory",
  "Vacuum-packed pine nut kernels on shelves",
  "Vacuum packaging line",
];

export default function AboutPanel({ dict }: { dict: Dictionary }) {
  return (
    <PanelShell id="quality" variant="light" width="wide">
      <div className="mb-10 md:mb-14 text-center max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl text-cedar-900 mb-4">
          {dict.about.title}
        </h2>
        <p className="text-cedar-800/80 text-base md:text-lg leading-relaxed">
          {dict.about.lead}
        </p>
      </div>

      <ol className="relative space-y-8 md:space-y-10">
        {dict.about.pillars.map((p, i) => {
          const badgeDark = i % 2 === 1;
          return (
            <li
              key={i}
              className="group grid grid-cols-[auto_auto_1fr] items-center gap-4 md:gap-6"
            >
              {/* step number badge — right next to the photo */}
              <div
                className={`flex items-center justify-center w-10 h-7 md:w-12 md:h-8 rounded text-white text-sm md:text-base font-semibold tabular-nums shrink-0 ${
                  badgeDark ? "bg-cedar-900" : "bg-cedar-600"
                }`}
                aria-hidden="true"
              >
                {i + 1}
              </div>

              {/* circular photo — hover: gentle scale */}
              <div className="relative w-20 h-20 md:w-36 md:h-36 rounded-full overflow-hidden shrink-0 ring-1 ring-black/10 shadow-lg">
                <Image
                  src={pillarImages[i] ?? pillarImages[0]}
                  alt={pillarImageAlt[i] ?? ""}
                  fill
                  sizes="(max-width: 768px) 80px, 144px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>

              {/* title + text */}
              <div className="min-w-0 md:pl-2">
                <h3 className="font-display text-base md:text-2xl uppercase tracking-wide text-cedar-900 mb-1 md:mb-2 leading-tight">
                  {p.title}
                </h3>
                <p className="text-cedar-800/80 text-xs md:text-[15px] leading-relaxed max-w-xl">
                  {p.text}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {dict.about.aside && (
        <p className="mt-10 md:mt-14 text-sm text-cedar-700/80 italic border-l-2 border-cedar-400 pl-4 max-w-3xl mx-auto">
          {dict.about.aside}
        </p>
      )}
    </PanelShell>
  );
}
