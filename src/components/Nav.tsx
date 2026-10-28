import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { navLinks, profile } from "@/data/portfolio";
import { useActiveSection, useScrollProgress } from "@/lib/hooks";
import { openResume } from "@/lib/resume";
import { Icon } from "@/components/ui";

const ids = navLinks.map((l) => l.id);

export default function Nav() {
  const { progress, scrolled } = useScrollProgress();
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px]">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-400 shadow-[0_0_12px_rgba(139,92,246,0.8)]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "py-3" : "py-5")}>
        <nav
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-3 transition-all duration-500 sm:px-4",
            scrolled ? "glass hairline mx-3 py-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:mx-auto" : "py-1",
          )}
          style={{ maxWidth: scrolled ? "68rem" : undefined }}
        >
          <a href="#home" className="group flex items-center gap-3">
            <span className="bg-brand animate-gradient relative flex h-10 w-10 items-center justify-center rounded-2xl font-display text-sm font-bold text-white shadow-[0_0_24px_-4px_rgba(139,92,246,0.8)] transition-transform duration-500 group-hover:rotate-[8deg]">
              {profile.initials}
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-[15px] font-semibold text-haze-100">{profile.name}</span>
              <span className="block font-mono text-[10px] tracking-[0.15em] text-cyan-300/80 uppercase">
                Java Full Stack Dev
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-0.5 xl:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300",
                  active === link.id ? "text-white" : "text-haze-400 hover:text-haze-100",
                )}
              >
                {active === link.id && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/25 via-violet-500/25 to-fuchsia-500/25 ring-1 ring-white/15" />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openResume}
              className="bg-brand animate-gradient group hidden items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_30px_-8px_rgba(139,92,246,0.8)] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
            >
              <Icon name="file" className="h-4 w-4" />
              Résumé
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="glass hairline flex h-10 w-10 items-center justify-center rounded-full text-haze-100 xl:hidden"
            >
              <Icon name="menu" className="h-[18px] w-[18px]" />
            </button>
          </div>
        </nav>
      </header>

      {/* mobile sheet */}
      <div className={cn("fixed inset-0 z-[70] transition-opacity duration-300 xl:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")}>
        <div className="absolute inset-0 bg-night-950/85 backdrop-blur-xl" onClick={() => setOpen(false)} />
        <div
          className={cn(
            "gradient-border absolute inset-x-4 top-4 rounded-3xl bg-night-900/95 p-6 transition-all duration-400",
            open ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] tracking-[0.28em] text-haze-500 uppercase">Navigate</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-haze-300"
            >
              <Icon name="close" />
            </button>
          </div>
          <ul className="mt-4">
            {navLinks.map((link, i) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-baseline justify-between border-b border-white/5 py-3 font-display text-2xl font-semibold transition-colors",
                    active === link.id ? "text-gradient" : "text-haze-100 hover:text-cyan-300",
                  )}
                >
                  {link.label}
                  <span className="font-mono text-[11px] text-haze-500">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openResume();
            }}
            className="bg-brand mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-white"
          >
            <Icon name="file" /> View & download résumé
          </button>
        </div>
      </div>
    </>
  );
}
