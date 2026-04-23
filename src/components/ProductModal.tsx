"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type PackagingItem = Dictionary["packaging"]["items"][number];
type PackagingModal = Dictionary["packaging"]["modal"];

export default function ProductModal({
  open,
  onClose,
  item,
  image,
  modal,
  requestLabel,
}: {
  open: boolean;
  onClose: () => void;
  item: PackagingItem | null;
  image: string | null;
  modal: PackagingModal;
  requestLabel: string;
}) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !item || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
    >
      <button
        type="button"
        aria-label={modal.closeLabel}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fadeIn_.25s_ease-out]"
      />

      <div className="relative w-full md:max-w-5xl max-h-[92vh] md:max-h-[92vh] overflow-y-auto md:overflow-visible rounded-t-3xl md:rounded-3xl bg-cedar-900 border border-white/10 shadow-2xl animate-[slideUp_.3s_cubic-bezier(.2,.8,.2,1)]">
        <button
          type="button"
          onClick={onClose}
          aria-label={modal.closeLabel}
          className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div className="grid md:grid-cols-[260px_1fr] gap-0">
          <div className="flex flex-col gap-4 p-6 md:p-8 md:pr-0">
            <div className="relative w-full max-w-[240px] md:max-w-none md:w-[240px] aspect-square rounded-2xl bg-white/95 flex items-center justify-center overflow-hidden border border-white/10">
              {image && (
                <Image
                  src={image}
                  alt={`${item.size} ${item.label}`}
                  width={260}
                  height={260}
                  sizes="260px"
                  className="block w-[220px] h-[220px] object-contain"
                />
              )}
              <div className="absolute top-3 left-3 inline-flex items-center bg-cedar-900/85 backdrop-blur-sm rounded-md px-2.5 py-1 border border-white/15">
                <span className="font-sans text-xs font-semibold tracking-wide tabular-nums text-white/95 leading-none">
                  {item.size}
                </span>
              </div>
            </div>

            <div className="w-full max-w-[240px] md:max-w-none md:w-[240px] rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-cedar-300 mb-3">
                {modal.nutritionLabel}
              </div>
              <ul className="space-y-2">
                {modal.nutritionItems.map((n, i) => (
                  <li
                    key={i}
                    className="flex items-baseline justify-between gap-3 border-b border-white/5 pb-1.5 last:border-b-0 last:pb-0"
                  >
                    <span className="text-white/70 text-xs">{n.label}</span>
                    <span className="text-white font-semibold text-xs tabular-nums">
                      {n.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-6 md:p-8 md:pl-8 text-white">
            <h3
              id="product-modal-title"
              className="font-display text-2xl md:text-3xl leading-tight mb-1.5"
            >
              {item.label}
            </h3>
            <div className="text-[11px] uppercase tracking-[0.22em] text-cedar-300 mb-4">
              {modal.weightLabel} — {item.size}
            </div>

            <p className="text-white/80 text-sm leading-relaxed mb-5">
              {modal.overviewText}
            </p>

            <dl className="grid grid-cols-2 gap-x-5 gap-y-4 mb-5">
              <Section label={modal.compositionLabel} text={modal.compositionText} />
              <Section label={modal.originLabel} text={modal.originText} />
              <Section label={modal.shelfLifeLabel} text={modal.shelfLifeText} />
              <Section label={modal.storageLabel} text={modal.storageText} />
              <Section
                label={modal.packagingLabel}
                text={modal.packagingText}
                className="col-span-2"
              />
            </dl>

            <div className="mb-5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-cedar-300 mb-1.5">
                {modal.benefitsLabel}
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {modal.benefitsText}
              </p>
            </div>

            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 rounded-full bg-cedar-400 hover:bg-cedar-300 text-cedar-900 text-sm font-semibold uppercase tracking-[0.18em] transition-colors"
            >
              {modal.cta || requestLabel}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M3 6h6m0 0L6.5 3.5M9 6L6.5 8.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>,
    document.body,
  );
}

function Section({
  label,
  text,
  className = "",
}: {
  label: string;
  text: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-[11px] uppercase tracking-[0.22em] text-cedar-300 mb-1.5">
        {label}
      </dt>
      <dd className="text-white/80 text-sm leading-relaxed">{text}</dd>
    </div>
  );
}
