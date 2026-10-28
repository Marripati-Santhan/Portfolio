import { marqueeItems, profile, socials, stats } from "@/data/portfolio";
import { useCountUp, useInView, useTypewriter } from "@/lib/hooks";
import { downloadResume, openResume } from "@/lib/resume";
import { Button, Icon, Reveal } from "@/components/ui";

function Stat({ value, decimals, suffix, label, delay }: (typeof stats)[number] & { delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const factor = Math.pow(10, decimals);
  const count = useCountUp(Math.round(value * factor), inView, 1500) / factor;
  return (
    <Reveal delay={delay}>
      <div ref={ref} className="text-center sm:text-left">
        <div className="text-gradient font-display text-3xl font-bold tabular-nums">
          {count.toFixed(decimals)}
          {suffix}
        </div>
        <div className="mt-1 text-[12px] text-haze-400">{label}</div>
      </div>
    </Reveal>
  );
}

const outer = [
  { label: "Java", color: "#f89820", angle: 0 },
  { label: "Spring Boot", color: "#6db33f", angle: 72 },
  { label: "React", color: "#61dafb", angle: 144 },
  { label: "MySQL", color: "#4479a1", angle: 216 },
  { label: "Hibernate", color: "#bcae79", angle: 288 },
];
const inner = [
  { label: "Node.js", color: "#68a063", angle: 40 },
  { label: "MongoDB", color: "#47a248", angle: 160 },
  { label: "JDBC", color: "#e879f9", angle: 280 },
];

function Orbit() {
  return (
    <div className="relative mx-auto aspect-square w-[320px] [--r1:150px] [--r2:92px] sm:w-[440px] sm:[--r1:205px] sm:[--r2:128px]">
      {/* glow */}
      <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-cyan-500/40 via-violet-600/40 to-fuchsia-500/40 blur-3xl" />

      {/* outer ring */}
      <div className="animate-orbit absolute inset-0 rounded-full border border-white/10">
        <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/15" />
        {outer.map((t) => (
          <div
            key={t.label}
            className="absolute top-1/2 left-1/2"
            style={{ transform: `translate(-50%,-50%) rotate(${t.angle}deg) translateX(var(--r1)) rotate(${-t.angle}deg)` }}
          >
            <div className="animate-orbit-rev">
              <span className="glass hairline flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] font-medium whitespace-nowrap text-haze-100 shadow-lg">
                <span className="h-2 w-2 rounded-full" style={{ background: t.color, boxShadow: `0 0 10px ${t.color}` }} />
                {t.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* inner ring (reverse) */}
      <div className="animate-orbit-rev absolute inset-[20%] rounded-full border border-white/10">
        {inner.map((t) => (
          <div
            key={t.label}
            className="absolute top-1/2 left-1/2"
            style={{ transform: `translate(-50%,-50%) rotate(${t.angle}deg) translateX(var(--r2)) rotate(${-t.angle}deg)` }}
          >
            <div className="animate-orbit">
              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-night-800/90 px-2.5 py-1 font-mono text-[10px] whitespace-nowrap text-haze-200">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: t.color }} />
                {t.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* core */}
      <div className="absolute inset-[33%] flex items-center justify-center">
        <div className="animate-spin-slow absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#22d3ee,#8b5cf6,#e879f9,#22d3ee)] p-[2px]">
          <div className="h-full w-full rounded-full bg-night-900" />
        </div>
        <div className="relative flex flex-col items-center">
          <span className="text-gradient font-display text-5xl font-bold sm:text-6xl">{profile.initials}</span>
          <span className="mt-1 flex items-center gap-1 font-mono text-[9px] tracking-[0.2em] text-java uppercase sm:text-[10px]">
            <Icon name="java" className="h-3 w-3" /> Java Dev
          </span>
        </div>
      </div>

      {/* floating chips */}
      <div className="animate-float glass hairline absolute -top-2 -left-2 rounded-2xl px-3.5 py-2.5 sm:top-4 sm:-left-8">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
            <Icon name="grad" className="h-4 w-4" />
          </span>
          <div>
            <div className="font-display text-sm font-bold text-haze-100">8.2 CGPA</div>
            <div className="text-[10px] text-haze-400">B.Tech CSE</div>
          </div>
        </div>
      </div>
      <div className="animate-float-slow glass hairline absolute right-0 -bottom-2 rounded-2xl px-3.5 py-2.5 sm:right-[-1rem] sm:bottom-6">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
            <Icon name="briefcase" className="h-4 w-4" />
          </span>
          <div>
            <div className="font-display text-sm font-bold text-haze-100">Intern @ Jspiders</div>
            <div className="text-[10px] text-haze-400">Java Full Stack</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="dot-grid absolute inset-0" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <Reveal>
            <div className="gradient-border inline-flex items-center gap-2.5 rounded-full bg-night-900/60 py-1.5 pr-4 pl-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[12.5px] font-medium text-haze-200">{profile.availability}</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-7 font-mono text-sm text-cyan-300">
              <span className="text-haze-500">{"// "}</span>Hello World, I&apos;m
            </p>
            <h1 className="mt-2 font-display text-[2.9rem] leading-[0.95] font-bold tracking-[-0.04em] text-haze-100 sm:text-7xl lg:text-[5.2rem]">
              Marripati
              <br />
              <span className="text-gradient">Santhan</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl border border-java/30 bg-java/10 px-3.5 py-2 font-display text-base font-semibold text-amber-200 sm:text-lg">
                <Icon name="java" className="h-5 w-5 text-java" />
                {profile.headline}
              </span>
            </div>
            <p className="mt-5 font-mono text-[15px] text-haze-300 sm:text-base">
              I build <span className="font-semibold text-cyan-300">{typed}</span>
              <span className="animate-blink ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] bg-cyan-300" />
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-haze-400">{profile.summary}</p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button onClick={downloadResume}>
                <Icon name="download" className="h-4 w-4" />
                Download Résumé
              </Button>
              <Button href="#projects" variant="ghost">
                View Projects
                <Icon name="arrow" className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <button
                type="button"
                onClick={openResume}
                className="inline-flex items-center gap-1.5 px-2 text-[13px] font-medium text-haze-400 underline-offset-4 transition-colors hover:text-cyan-300 hover:underline"
              >
                <Icon name="eye" className="h-4 w-4" /> Preview
              </button>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.icon === "mail" ? undefined : "_blank"}
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className="glass hairline flex h-11 w-11 items-center justify-center rounded-2xl text-haze-300 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:text-white hover:shadow-[0_10px_30px_-10px_rgba(139,92,246,0.9)]"
                  >
                    <Icon name={s.icon} className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
              <span className="flex items-center gap-1.5 font-mono text-[12px] text-haze-400">
                <Icon name="pin" className="h-3.5 w-3.5 text-fuchsia-400" />
                {profile.location}
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <Orbit />
        </Reveal>
      </div>

      {/* stats */}
      <div className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
        <div className="gradient-border glass grid grid-cols-2 gap-8 rounded-3xl p-7 sm:grid-cols-4 sm:p-8">
          {stats.map((s, i) => (
            <Stat key={s.label} {...s} delay={i * 90} />
          ))}
        </div>
      </div>

      {/* marquee */}
      <div className="pause-on-hover mask-fade-x relative mt-16 flex -rotate-1 overflow-hidden border-y border-white/10 bg-gradient-to-r from-cyan-500/[0.06] via-violet-500/[0.08] to-fuchsia-500/[0.06] py-4">
        <div className="marquee-track animate-marquee flex w-max shrink-0 items-center gap-8 pr-8">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-8 font-display text-lg font-medium whitespace-nowrap text-haze-300">
              {item}
              <Icon name="spark" className="h-4 w-4 text-violet-400/70" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
