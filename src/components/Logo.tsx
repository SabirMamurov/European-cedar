import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function Logo({
  dict,
  size = "md",
  className = "",
}: {
  dict: Dictionary;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dims = {
    sm: { svg: 24, text: "text-sm" },
    md: { svg: 30, text: "text-base md:text-lg" },
    lg: { svg: 38, text: "text-lg md:text-xl" },
  }[size];

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={dims.svg}
        height={dims.svg}
        viewBox="0 0 32 32"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16 3 L23 13 L19.5 13 L25 21 L21.5 21 L27 29 L5 29 L10.5 21 L7 21 L12.5 13 L9 13 Z M14.5 29 H17.5 V31.5 H14.5 Z" />
      </svg>
      <span
        className={`font-display font-medium tracking-wide whitespace-nowrap ${dims.text}`}
      >
        {dict.brand.name}
      </span>
    </span>
  );
}
