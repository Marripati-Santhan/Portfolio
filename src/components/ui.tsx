import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useInView } from "@/lib/hooks";

/* ────────────────────────── Reveal on scroll ────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal", inView && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ────────────────────────── Section heading ────────────────────────── */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  index,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  index?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <Reveal>
        <div
          className={cn(
            "inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1 pr-3.5 pl-1 font-mono text-[11px] tracking-[0.2em] text-haze-300 uppercase",
          )}
        >
          {index && (
            <span className="bg-brand rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-normal text-white">
              {index}
            </span>
          )}
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={90}>
        <h2 className="mt-5 font-display text-[2rem] leading-[1.08] font-bold tracking-[-0.03em] text-haze-100 sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={170}>
          <p className="mt-5 text-[15.5px] leading-relaxed text-haze-400">{description}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ────────────────────────── Buttons ────────────────────────── */
export function Button({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  type,
  target,
}: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  target?: string;
}) {
  const base = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300",
    variant === "primary"
      ? "bg-brand animate-gradient text-white shadow-[0_10px_40px_-10px_rgba(139,92,246,0.7)] hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-10px_rgba(139,92,246,0.9)]"
      : "hairline glass text-haze-100 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/[0.07]",
    className,
  );
  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      )}
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        className={base}
        onClick={onClick}
        target={target}
        rel={target ? "noreferrer noopener" : undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} className={base} onClick={onClick}>
      {inner}
    </button>
  );
}

/* ────────────────────────── Icons ────────────────────────── */
const paths: Record<string, ReactNode> = {
  code: (
    <>
      <path d="m8 6-6 6 6 6" />
      <path d="m16 6 6 6-6 6" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20Z" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" />
      <path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3" />
    </>
  ),
  tool: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9l-3.8 3.8Z" />
  ),
  java: (
    <>
      <path d="M8 18c2 1 6 1 8 0" />
      <path d="M6 21c3 1.3 9 1.3 12 0" />
      <path d="M10 14c-1-1.5 3-2.5 1-5s2-4 2-6" />
      <path d="M14 14c-.6-1 1.5-1.8.6-3.5" />
      <path d="M17 15.5c2.5 0 2.5-3-.5-2.5" />
    </>
  ),
  star: (
    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9L12 2.5Z" />
  ),
  lotus: (
    <>
      <path d="M12 20c-4 0-8-2-9-6 3-.5 6 .5 9 3 3-2.5 6-3.5 9-3-1 4-5 6-9 6Z" />
      <path d="M12 17c-2-2-3-5-2-9 1 0 1.5.5 2 1.5.5-1 1-1.5 2-1.5 1 4 0 7-2 9Z" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M2 13h20" />
    </>
  ),
  form: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 7h8" />
      <circle cx="8.5" cy="12" r="1" />
      <path d="M11 12h5" />
      <circle cx="8.5" cy="16.5" r="1" />
      <path d="M11 16.5h5" />
    </>
  ),
  grad: (
    <>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5" />
      <path d="M22 10v6" />
    </>
  ),
  trophy: (
    <>
      <path d="M6 9H4a2 2 0 0 1 0-4h2" />
      <path d="M18 9h2a2 2 0 0 0 0-4h-2" />
      <path d="M6 3h12v6a6 6 0 0 1-12 0V3Z" />
      <path d="M12 15v3" />
      <path d="M8 21h8" />
      <path d="M9 18h6v3H9z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21v-1a6 6 0 0 1 12 0v1" />
      <path d="M16 3.5a4 4 0 0 1 0 9" />
      <path d="M22 21v-1a6 6 0 0 0-4-5.6" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  github: (
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.4 6.4-1.6 6.4-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 19.9 1s-1.2-.4-4 1.5a13.4 13.4 0 0 0-7 0C6.1.6 4.9 1 4.9 1a5 5 0 0 0-.1 3.8A5.4 5.4 0 0 0 2.7 8.5c0 5.4 3.3 6.6 6.4 7a3.4 3.4 0 0 0-.9 2.6V22" />
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" />
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 21h14" />
    </>
  ),
  file: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  check: <path d="m4 12 5 5L20 6" />,
  spark: (
    <path d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18m0-12-2.5 2.5m-7 7L6 18" />
  ),
  menu: (
    <>
      <path d="M3 6h18" />
      <path d="M3 12h18" />
      <path d="M3 18h18" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  heart: (
    <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
  ),
};

export function Icon({
  name,
  className,
  strokeWidth = 1.8,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      aria-hidden="true"
    >
      {paths[name] ?? null}
    </svg>
  );
}
