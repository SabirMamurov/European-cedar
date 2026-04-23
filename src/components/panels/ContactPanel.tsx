"use client";

import { useState, type FormEvent } from "react";
import PanelShell from "./PanelShell";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactPanel({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<Status>("idle");
  const [notBot, setNotBot] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!notBot) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, notBot: true }),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("success");
      setNotBot(false);
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full px-6 py-4 rounded-full bg-white/[0.06] border border-white/10 text-white placeholder:text-white/35 hover:border-white/25 hover:bg-white/[0.08] focus:outline-none focus:border-cedar-400 focus:bg-white/[0.09] transition-colors duration-300";

  return (
    <PanelShell id="contact" variant="dark" width="wide" keepVisible>
      <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-start">
        {/* LEFT column — hero copy + direct contacts */}
        <div className="flex flex-col gap-8 md:gap-10">
          <div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-white mb-6 md:mb-8">
              {dict.contact.title}
            </h2>
            <p className="text-white/75 text-base md:text-lg max-w-md leading-relaxed">
              {dict.contact.subtitle}
            </p>
          </div>

          <div className="space-y-4 md:space-y-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-cedar-300">
              {dict.contact.salesLabel} — {siteConfig.sales.name}
            </div>
            <a
              href={`mailto:${siteConfig.sales.email}`}
              className="flex items-center gap-4 text-white/90 hover:text-white group transition-transform duration-300 ease-out origin-left hover:scale-[1.04]"
            >
              <span className="inline-block w-8 md:w-10 h-px bg-white/40 group-hover:bg-cedar-400 group-hover:w-12 md:group-hover:w-14 transition-all duration-300" />
              <span className="font-sans text-sm md:text-base uppercase tracking-[0.12em]">
                {siteConfig.sales.email}
              </span>
            </a>
            <a
              href={`tel:${siteConfig.sales.phoneTel}`}
              className="flex items-center gap-4 text-white/90 hover:text-white group tabular-nums transition-transform duration-300 ease-out origin-left hover:scale-[1.04]"
            >
              <span className="inline-block w-8 md:w-10 h-px bg-white/40 group-hover:bg-cedar-400 group-hover:w-12 md:group-hover:w-14 transition-all duration-300" />
              <span className="font-sans text-sm md:text-base uppercase tracking-[0.12em]">
                {siteConfig.sales.phone}
              </span>
            </a>
          </div>
        </div>

        {/* RIGHT column — form */}
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="c-name"
              className="block text-[11px] uppercase tracking-[0.22em] text-cedar-300 mb-2.5 pl-6"
            >
              {dict.contact.name}
            </label>
            <input
              id="c-name"
              name="name"
              required
              placeholder={dict.contact.namePlaceholder}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="c-email"
              className="block text-[11px] uppercase tracking-[0.22em] text-cedar-300 mb-2.5 pl-6"
            >
              {dict.contact.email}
            </label>
            <input
              id="c-email"
              name="email"
              type="email"
              required
              placeholder={dict.contact.emailPlaceholder}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="c-message"
              className="block text-[11px] uppercase tracking-[0.22em] text-cedar-300 mb-2.5 pl-6"
            >
              {dict.contact.message}
            </label>
            <textarea
              id="c-message"
              name="message"
              rows={5}
              required
              placeholder={dict.contact.messagePlaceholder}
              className="w-full px-6 py-4 rounded-3xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/35 hover:border-white/25 hover:bg-white/[0.08] focus:outline-none focus:border-cedar-400 focus:bg-white/[0.09] transition-colors duration-300 resize-none"
            />
          </div>

          {/* Honeypot: invisible to humans, tempting to bots. If filled → reject on server. */}
          <div
            aria-hidden="true"
            className="absolute left-[-9999px] top-[-9999px] w-0 h-0 overflow-hidden"
          >
            <label htmlFor="c-company">Company</label>
            <input
              id="c-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Visible «I'm not a robot» checkbox */}
          <label
            htmlFor="c-not-bot"
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <span className="relative inline-flex items-center justify-center w-6 h-6 rounded-md border-2 border-white/30 bg-white/[0.06] group-hover:border-cedar-400 transition-colors">
              <input
                id="c-not-bot"
                type="checkbox"
                checked={notBot}
                onChange={(e) => {
                  setNotBot(e.target.checked);
                  if (status === "error") setStatus("idle");
                }}
                className="peer absolute inset-0 opacity-0 cursor-pointer"
              />
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className={`pointer-events-none transition-all duration-200 ${notBot ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
              >
                <path
                  d="M3 8.5l3 3 7-7"
                  stroke="#4BAE6F"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-sm text-white/80 group-hover:text-white transition-colors">
              {dict.contact.notBot}
            </span>
          </label>

          <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-3 sm:gap-5 pt-2">
            {status === "success" && (
              <span className="text-cedar-300 text-sm">
                {dict.contact.success}
              </span>
            )}
            {status === "error" && (
              <span className="text-red-300 text-sm">
                {notBot ? dict.contact.error : dict.contact.botError}
              </span>
            )}
            <button
              type="submit"
              disabled={status === "sending" || !notBot}
              className="inline-flex items-center justify-center gap-2 px-10 md:px-14 py-4 rounded-full bg-white hover:bg-cream text-cedar-900 font-semibold text-sm uppercase tracking-[0.2em] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 ease-out shadow-xl hover:shadow-2xl hover:scale-[1.04] w-full sm:w-auto"
            >
              {status === "sending" ? dict.contact.sending : dict.contact.submit}
            </button>
          </div>
        </form>
      </div>
    </PanelShell>
  );
}
