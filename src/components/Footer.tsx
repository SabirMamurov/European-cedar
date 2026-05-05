import Link from "next/link";
import { siteConfig } from "@/config/site";
import Logo from "./Logo";
import type { Locale } from "@/config/i18n";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function Footer({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const base = `/${lang}`;
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-cedar-900 text-white/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 md:py-12 grid md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10">
        <div>
          <Link
            href={base}
            className="inline-flex mb-3 text-white"
            aria-label={dict.brand.name}
          >
            <Logo dict={dict} size="lg" />
          </Link>
          <p className="text-sm text-white/60 max-w-xs mb-5">
            {dict.footer.tagline}
          </p>
          <p className="text-xs text-white/40 max-w-xs leading-relaxed">
            © {year} {dict.footer.legalName}. {dict.footer.rights}
          </p>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">
            {dict.footer.sections.nav}
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`${base}#story`} className="hover:text-white">
                {dict.nav.story}
              </a>
            </li>
            <li>
              <a href={`${base}#products`} className="hover:text-white">
                {dict.nav.products}
              </a>
            </li>
            <li>
              <a href={`${base}#quality`} className="hover:text-white">
                {dict.nav.quality}
              </a>
            </li>
            <li>
              <a href={`${base}#certificates`} className="hover:text-white">
                {dict.nav.documents}
              </a>
            </li>
            <li>
              <a href={`${base}#contact`} className="hover:text-white">
                {dict.nav.contact}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">
            {dict.footer.sections.contacts}
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="text-white/55 text-xs uppercase tracking-wider">
              EU sales — {siteConfig.sales.name}
            </li>
            <li>
              <a
                href={`tel:${siteConfig.sales.phoneTel}`}
                className="hover:text-white"
              >
                {siteConfig.sales.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.sales.email}`}
                className="hover:text-white"
              >
                {siteConfig.sales.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">
            {dict.footer.sections.social}
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={siteConfig.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Telegram
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>

    </footer>
  );
}
