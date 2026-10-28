import { cn } from "@/utils/cn";
import { experience } from "@/data/portfolio";
import { Icon, Reveal, SectionHeading } from "@/components/ui";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Internship experience"
          index="03"
          title={
            <>
              Where I&apos;ve been <span className="text-gradient">building</span>
            </>
          }
          description="Hands-on industry experience building real applications alongside professional teams."
        />

        <div className="relative mt-14">
          {/* timeline line */}
          <div className="absolute top-2 bottom-2 left-[19px] w-px bg-gradient-to-b from-cyan-400 via-violet-500 to-fuchsia-500/0 sm:left-[23px]" />

          <ol className="space-y-8">
            {experience.map((job, i) => (
              <li key={job.company} className="relative pl-14 sm:pl-20">
                <Reveal delay={i * 100}>
                  <span
                    className={cn(
                      "absolute top-6 left-0 flex h-10 w-10 items-center justify-center rounded-2xl border sm:h-12 sm:w-12",
                      job.current
                        ? "bg-brand border-transparent text-white shadow-[0_0_30px_-4px_rgba(139,92,246,0.9)]"
                        : "border-white/15 bg-night-800 text-haze-300",
                    )}
                  >
                    <Icon name="briefcase" className="h-[18px] w-[18px]" />
                  </span>

                  <div className="gradient-border group relative overflow-hidden rounded-3xl bg-night-900/70 p-6 transition-all duration-500 hover:bg-night-900 sm:p-8">
                    <div className="absolute -top-24 -right-24 h-60 w-60 rounded-full bg-violet-600/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="font-display text-2xl font-bold text-haze-100">{job.company}</h3>
                          {job.current && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/12 px-2.5 py-0.5 font-mono text-[10.5px] text-emerald-300">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Current
                            </span>
                          )}
                        </div>
                        <p className="mt-1 font-medium text-cyan-300">{job.role}</p>
                      </div>
                      <span className="hairline inline-flex items-center gap-1.5 rounded-full bg-white/[0.03] px-3.5 py-1.5 font-mono text-[12px] text-haze-300">
                        <Icon name="calendar" className="h-3.5 w-3.5 text-fuchsia-400" />
                        {job.period}
                      </span>
                    </div>

                    <ul className="relative mt-6 space-y-3.5">
                      {job.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-[14.5px] leading-relaxed text-haze-300">
                          <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-300">
                            <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3} />
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="relative mt-6 flex flex-wrap gap-2 border-t border-white/8 pt-5">
                      {job.stack.map((s) => (
                        <span key={s} className="rounded-lg bg-white/[0.05] px-2.5 py-1 font-mono text-[11px] text-haze-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
