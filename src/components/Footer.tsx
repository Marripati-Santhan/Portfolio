import { cn } from "@/utils/cn";
import { navLinks, profile, socials } from "@/data/portfolio";
import { useScrollProgress } from "@/lib/hooks";
import { downloadResume } from "@/lib/resume";
import { Icon } from "@/components/ui";

export default function Footer() {
  const { progress, scrolled } = useScrollProgress();
  const C = 2 * Math.PI * 22;

  return (
    <>
      <footer className="relative mt-10 overflow-hidden border-t border-white/10">
        <div className="pointer-events-none absolute inset-x-0 -bottom-40 mx-auto h-72 max-w-3xl rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-8 sm:px-8">
          <div className="text-center">
            <p className="font-mono text-[12px] tracking-[0.25em] text-haze-500 uppercase">Thanks for scrolling</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-haze-100 sm:text-6xl">
              Marripati <span className="text-gradient">Santhan</span>
            </h2>
            <p className="mt-3 text-haze-400">{profile.headline} · {profile.location}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="bg-brand animate-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
              >
                <Icon name="mail" className="h-4 w-4" /> {profile.email}
              </a>
              <button
                type="button"
                onClick={downloadResume}
                className="glass hairline inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-haze-100"
              >
                <Icon name="download" className="h-4 w-4" /> Résumé
              </button>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
            <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {navLinks.map((l) => (
                <a key={l.id} href={`#${l.id}`} className="text-[13px] text-haze-400 transition-colors hover:text-white">
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.icon === "mail" ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="hairline flex h-10 w-10 items-center justify-center rounded-xl text-haze-400 transition-all hover:-translate-y-0.5 hover:border-violet-400/50 hover:text-white"
                >
                  <Icon name={s.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <p className="mt-8 text-center text-[12.5px] text-haze-500">
            © {new Date().getFullYear()} {profile.name}. Designed & built with <span className="text-fuchsia-400">♥</span> using React & Tailwind CSS.
          </p>
        </div>
      </footer>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={cn(
          "glass hairline fixed right-5 bottom-5 z-50 flex h-12 w-12 items-center justify-center rounded-full text-haze-100 transition-all duration-500 hover:text-cyan-300",
          scrolled && progress > 0.06 ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <Icon name="arrow" className="h-4 w-4 -rotate-90" strokeWidth={2.2} />
        <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90">
          <defs>
            <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#e879f9" />
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="22" fill="none" stroke="url(#ring)" strokeWidth="2" strokeDasharray={C} strokeDashoffset={C * (1 - progress)} strokeLinecap="round" />
        </svg>
      </button>
    </>
  );
}
