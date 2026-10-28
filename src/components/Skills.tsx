import type { MouseEvent } from "react";
import { cn } from "@/utils/cn";
import { coreStrengths, skillGroups, type SkillGroup } from "@/data/portfolio";
import { useInView } from "@/lib/hooks";
import { Icon, Reveal, SectionHeading } from "@/components/ui";

const accents: Record<SkillGroup["accent"], { icon: string; chip: string; line: string }> = {
  cyan: { icon: "bg-cyan-400/15 text-cyan-300", chip: "hover:border-cyan-400/50 hover:text-cyan-200", line: "from-cyan-400" },
  violet: { icon: "bg-violet-400/15 text-violet-300", chip: "hover:border-violet-400/50 hover:text-violet-200", line: "from-violet-400" },
  fuchsia: { icon: "bg-fuchsia-400/15 text-fuchsia-300", chip: "hover:border-fuchsia-400/50 hover:text-fuchsia-200", line: "from-fuchsia-400" },
  amber: { icon: "bg-amber-400/15 text-amber-300", chip: "hover:border-amber-400/50 hover:text-amber-200", line: "from-amber-400" },
  emerald: { icon: "bg-emerald-400/15 text-emerald-300", chip: "hover:border-emerald-400/50 hover:text-emerald-200", line: "from-emerald-400" },
};

const track = (e: MouseEvent<HTMLDivElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

function GroupCard({ group, className, delay }: { group: SkillGroup; className?: string; delay: number }) {
  const a = accents[group.accent];
  return (
    <Reveal delay={delay} className={className}>
      <div
        onMouseMove={track}
        className="hairline group relative h-full overflow-hidden rounded-3xl bg-night-900/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
      >
        <div className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className={cn("absolute inset-x-0 top-0 h-px bg-gradient-to-r to-transparent", a.line)} />
        <div className="relative flex items-center gap-3">
          <span className={cn("flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6", a.icon)}>
            <Icon name={group.icon} className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-[17px] font-semibold text-haze-100">{group.title}</h3>
            <p className="font-mono text-[10.5px] text-haze-500">{group.items.length} technologies</p>
          </div>
        </div>
        <div className="relative mt-5 flex flex-wrap gap-2">
          {group.items.map((item) => (
            <span
              key={item}
              className={cn(
                "rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[13px] font-medium text-haze-200 transition-all duration-300 hover:-translate-y-0.5",
                a.chip,
              )}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function Skills() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section id="skills" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Technical skills"
          index="02"
          align="center"
          title={
            <>
              My <span className="text-gradient">tech arsenal</span>
            </>
          }
          description="From Core Java fundamentals to full-stack frameworks — the tools I use to design, build and ship web applications."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* core strengths */}
          <Reveal className="lg:row-span-2">
            <div ref={ref} className="gradient-border relative h-full overflow-hidden rounded-3xl bg-gradient-to-b from-violet-950/50 to-night-900/80 p-7">
              <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-java/20 blur-3xl" />
              <div className="relative">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-java/15 text-java">
                  <Icon name="java" className="h-8 w-8" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-haze-100">Core Strengths</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-haze-400">
                  Java is my home turf — OOP, collections, exception handling, JDBC and the Spring ecosystem.
                </p>
                <div className="mt-8 space-y-6">
                  {coreStrengths.map((s, i) => (
                    <div key={s.label}>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[13.5px] font-medium text-haze-200">{s.label}</span>
                        <span className="font-mono text-[11px] text-haze-500">{s.value}%</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="relative h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-400 transition-[width] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                          style={{ width: inView ? `${s.value}%` : "0%", transitionDelay: `${i * 120}ms` }}
                        >
                          <span className="absolute top-1/2 right-0 h-3.5 w-3.5 -translate-y-1/2 translate-x-1/2 rounded-full border-2 border-white bg-fuchsia-400 shadow-[0_0_12px_rgba(232,121,249,0.9)]" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {skillGroups.slice(0, 4).map((g, i) => (
            <GroupCard key={g.title} group={g} delay={100 + i * 80} />
          ))}
          <GroupCard group={skillGroups[4]} className="lg:col-span-3" delay={200} />
        </div>
      </div>
    </section>
  );
}
