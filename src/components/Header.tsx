"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "@/config/i18n";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function Header({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base = `/${lang}`;
  const nav = [
    { href: `${base}#story`, label: dict.nav.story },
    { href: `${base}#products`, label: dict.nav.products },
    { href: `${base}#quality`, label: dict.nav.quality },
    { href: `${base}#certificates`, label: dict.nav.documents },
    { href: `${base}#contact`, label: dict.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "bg-cedar-900/55 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <Link
          href={base}
          className="flex items-center"
          aria-label="Сибирский кедр"
        >
          <Image
            src="/images/logo.png"
            alt="Сибирский кедр"
            width={180}
            height={52}
            priority
            className="h-9 w-auto brightness-0 invert"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-white/85">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher current={lang} />
          </div>
          <a
            href={`${base}#contact`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cedar-400 text-cedar-900 text-sm font-semibold hover:bg-cedar-300"
          >
            {dict.nav.cta}
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
          <div className="md:hidden">
            <LanguageSwitcher current={lang} />
          </div>
        </div>
      </div>
    </header>
  );
}
