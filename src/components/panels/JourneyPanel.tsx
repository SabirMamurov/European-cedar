"use client";

import PanelShell from "./PanelShell";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const icons = [
  // Wild Harvest — tree
  (
    <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9" aria-hidden="true">
      <path
        d="M24 6 L14 22 L19 22 L11 34 L19 34 L14 42 L34 42 L29 34 L37 34 L29 22 L34 22 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <rect x="22" y="38" width="4" height="6" fill="currentColor" />
    </svg>
  ),
  // Eco Processing — leaf in circle
  (
    <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9" aria-hidden="true">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M16 30 C 18 20, 28 16, 34 16 C 34 24, 30 32, 20 32 C 18 32, 16 32, 16 30 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M17 31 L 30 18" stroke="currentColor" strokeWidth="1.15" />
    </svg>
  ),
  // Delivery across Europe — map pin globe
  (
    <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9" aria-hidden="true">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.6" />
      <ellipse cx="24" cy="24" rx="9" ry="18" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 24h36" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 14c4 4 24 4 28 0M10 34c4-4 24-4 28 0" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  ),
];

export default function JourneyPanel({ dict }: { dict: Dictionary }) {
  return (
    <PanelShell id="story" variant="light" width="wide">
      {/* H2: О производстве + lead about the factory */}
      {dict.journey.productionLabel && (
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-5xl text-cedar-900 mb-5 md:mb-6">
            {dict.journey.productionLabel}
          </h2>
          {dict.journey.productionText && (
            <p className="text-cedar-800/85 text-base md:text-lg leading-relaxed">
              {dict.journey.productionText}
            </p>
          )}
        </div>
      )}

      {/* Sub-heading: Путь от тайги до вас */}
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
        <h3 className="font-display text-2xl md:text-3xl text-cedar-900 mb-3">
          {dict.journey.title}
        </h3>
        <p className="text-cedar-800/75 text-sm md:text-base">
          {dict.journey.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 md:gap-10">
        {dict.journey.steps.map((step, i) => (
          <div key={i} className="text-center px-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cedar-600/10 border border-cedar-600/25 text-cedar-700 mb-4">
              {icons[i]}
            </div>
            <h3 className="font-display text-xl md:text-2xl text-cedar-900 mb-2">
              {step.title}
            </h3>
            <p className="text-cedar-800/80 leading-relaxed text-sm md:text-base">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}
