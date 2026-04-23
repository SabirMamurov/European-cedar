"use client";

import { useState } from "react";
import Image from "next/image";
import PanelShell from "./PanelShell";
import ProductModal from "@/components/ProductModal";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const packImages = [
  "/images/packs/pack-100g.png",
  "/images/packs/pack-500g.png",
  "/images/packs/pack-1kg.png",
  "/images/packs/pack-5kg.png",
];

export default function PackagingPanel({ dict }: { dict: Dictionary }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const activeItem =
    openIndex !== null ? dict.packaging.items[openIndex] ?? null : null;
  const activeImage =
    openIndex !== null
      ? packImages[openIndex] ?? packImages[packImages.length - 1]
      : null;

  return (
    <PanelShell id="products" variant="dark" width="wide">
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
        <h2 className="font-display text-3xl md:text-5xl mb-4">
          {dict.packaging.title}
        </h2>
        <p className="text-white/75 text-base md:text-lg">
          {dict.packaging.subtitle}
        </p>
      </div>

      {dict.packaging.highlights && (
        <div className="mx-auto max-w-4xl mb-10 md:mb-14 rounded-full border border-white/10 bg-white/[0.04] px-5 md:px-8 py-3 text-center">
          <p className="text-[11px] md:text-xs uppercase tracking-[0.18em] text-cedar-200">
            {dict.packaging.highlights}
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {dict.packaging.items.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] hover:border-cedar-400/50 focus:outline-none focus:border-cedar-400 focus:ring-2 focus:ring-cedar-400/40 transition-colors flex flex-col text-left cursor-pointer"
            aria-label={`${item.size} ${item.label} — ${dict.packaging.modal.overviewLabel}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-white/95">
              <Image
                src={packImages[i] ?? packImages[packImages.length - 1]}
                alt={`${item.size} ${item.label}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute top-3 left-3 inline-flex items-center bg-cedar-900/85 backdrop-blur-sm rounded-md px-2.5 py-1 border border-white/15">
                <span className="font-sans text-xs font-semibold tracking-wide tabular-nums text-white/95 leading-none">
                  {item.size}
                </span>
              </div>
            </div>

            <div className="flex-1 p-5 md:p-6 flex flex-col">
              <h3 className="font-display text-lg md:text-xl text-white leading-snug mb-3">
                {item.label}
              </h3>

              <p className="text-white/75 text-sm leading-relaxed mb-5">
                {item.text}
              </p>

              <span className="mt-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-cedar-400 group-hover:bg-cedar-300 text-cedar-900 text-sm font-semibold transition-colors">
                {dict.packaging.requestInfo}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 6h6m0 0L6.5 3.5M9 6L6.5 8.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      <ProductModal
        open={openIndex !== null}
        onClose={() => setOpenIndex(null)}
        item={activeItem}
        image={activeImage}
        modal={dict.packaging.modal}
        requestLabel={dict.packaging.requestInfo}
      />
    </PanelShell>
  );
}
