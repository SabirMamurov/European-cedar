"use client";

import Image from "next/image";
import PanelShell from "./PanelShell";
import type { Dictionary } from "@/app/[lang]/dictionaries";

/**
 * Each cert card shows:
 *  - official logo (top badge)
 *  - full scanned certificate document (portrait image)
 *  - title + description
 *
 * Item order (in dict.certificates.items):
 *   0 → EU Organic (Euroleaf / DAkkS / ECOGLOBE document)
 *   1 → Roskachestvo (Russian national system of quality)
 */
const certAssets = [
  {
    document: "/images/certificates/eu-ecoglobe-document.jpg",
    logo: "/images/certificates/eu-bio-label.jpg",
  },
  {
    document: "/images/certificates/ru-roskachestvo-document.jpg",
    logo: "/images/certificates/organic-ru.jpg",
  },
];

export default function CertificatesPanel({ dict }: { dict: Dictionary }) {
  return (
    <PanelShell id="certificates" variant="light" width="wide">
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
        <h2 className="font-display text-3xl md:text-5xl text-cedar-900 mb-4">
          {dict.certificates.title}
        </h2>
        <p className="text-cedar-800/80 text-base md:text-lg leading-relaxed">
          {dict.certificates.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-10">
        {dict.certificates.items.map((item, i) => {
          const asset = certAssets[i] ?? certAssets[0];
          return (
            <article
              key={i}
              className="group rounded-2xl overflow-hidden bg-white/75 border border-cedar-600/15 p-5 md:p-6 flex flex-col shadow-xl transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.025] hover:shadow-2xl hover:border-cedar-500/40 hover:bg-white/85"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0 w-16 h-16 rounded-xl bg-white ring-1 ring-black/5 flex items-center justify-center overflow-hidden">
                  <Image
                    src={asset.logo}
                    alt={item.imageAlt}
                    width={128}
                    height={128}
                    className="w-full h-full object-contain p-1.5"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg md:text-xl text-cedar-900 leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden ring-1 ring-black/10 bg-white aspect-[1/1.35] mb-4">
                <Image
                  src={asset.document}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-contain"
                />
              </div>

              <p className="text-cedar-800/80 text-sm md:text-[15px] leading-relaxed">
                {item.text}
              </p>
            </article>
          );
        })}
      </div>

      <p className="mt-8 md:mt-10 text-center text-xs md:text-sm text-cedar-800/65 max-w-3xl mx-auto">
        {dict.certificates.footnote}
      </p>
    </PanelShell>
  );
}
