import { achievements, education } from "@/data/portfolio";
import { Icon, Reveal, SectionHeading } from "@/components/ui";

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Education & achievements"
          index="05"
          title={
            <>
              Learning, leading & <span className="text-gradient">competing</span>
            </>
          }
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 100}>
              <div className="gradient-border group relative h-full overflow-hidden rounded-3xl bg-night-900/70 p-7">
                <div className="absolute -right-6 -bottom-10 font-display text-[9rem] leading-none font-bold text-white/[0.03] transition-transform duration-700 group-hover:-translate-y-2">
                  {e.score}
                </div>
                <div className="relative flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 text-amber-300">
                    <Icon name="grad" className="h-6 w-6" />
                  </span>
                  <div className="text-right">
                    <div className="text-gradient font-display text-4xl font-bold">{e.score}</div>
                    <div className="font-mono text-[10.5px] tracking-[0.2em] text-haze-500 uppercase">{e.scoreLabel}</div>
                  </div>
                </div>
                <h3 className="relative mt-6 font-display text-xl leading-snug font-bold text-haze-100">{e.school}</h3>
                <p className="relative mt-2 font-medium text-cyan-300">{e.degree}</p>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  <span className="hairline inline-flex items-center gap-1.5 rounded-full bg-white/[0.03] px-3 py-1.5 font-mono text-[11.5px] text-haze-300">
                    <Icon name="calendar" className="h-3.5 w-3.5 text-violet-400" />
                    {e.period}
                  </span>
                  <span className="hairline inline-flex items-center gap-1.5 rounded-full bg-white/[0.03] px-3 py-1.5 font-mono text-[11.5px] text-haze-300">
                    <Icon name="pin" className="h-3.5 w-3.5 text-fuchsia-400" />
                    {e.place}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={150 + i * 100}>
              <div className="hairline group flex h-full items-start gap-5 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition-all duration-500 hover:-translate-y-1 hover:border-amber-400/30">
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 text-night-950 shadow-[0_10px_30px_-8px_rgba(251,191,36,0.6)] transition-transform duration-500 group-hover:rotate-[-8deg]">
                  <Icon name={a.icon} className="h-7 w-7" strokeWidth={2} />
                </span>
                <div>
                  <p className="font-mono text-[10.5px] tracking-[0.2em] text-amber-300/80 uppercase">Achievement</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-haze-100">{a.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-haze-400">{a.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
