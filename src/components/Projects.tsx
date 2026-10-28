import { useEffect, useRef, useState, type MouseEvent } from "react";
import { cn } from "@/utils/cn";
import { projects, type Project } from "@/data/portfolio";
import { Icon, Reveal, SectionHeading } from "@/components/ui";
import PoseFinder from "@/components/PoseFinder";

/* ───────────── VMM mini rating demo ───────────── */
const workers = ["Ravi — Billing", "Priya — Customer Help", "Arjun — Floor Staff"];
const areas = ["Cleanliness", "Billing speed", "Staff behaviour", "Product availability"];

function RatingDemo() {
  const [worker, setWorker] = useState(workers[0]);
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const labels = ["", "Poor", "Fair", "Good", "Great", "Excellent!"];
  const toggle = (t: string) => setTags((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.07] to-transparent">
      <div className="flex items-center gap-2 border-b border-cyan-400/15 px-5 py-3">
        <Icon name="star" className="h-4 w-4 text-cyan-300" />
        <span className="font-display text-sm font-semibold text-cyan-200">Live demo · Rate a worker</span>
        <span className="ml-auto font-mono text-[10px] text-haze-500">VMM Feedback</span>
      </div>
      {done ? (
        <div className="animate-pop flex flex-col items-center p-8 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
            <Icon name="check" className="h-7 w-7" strokeWidth={2.6} />
          </span>
          <p className="mt-4 font-display text-lg font-semibold text-haze-100">Thanks for your feedback!</p>
          <p className="mt-1 text-[13px] text-haze-400">
            {stars}★ for {worker.split(" — ")[0]} recorded — management will see it on the dashboard.
          </p>
          <button
            type="button"
            onClick={() => {
              setDone(false);
              setStars(0);
              setTags([]);
            }}
            className="mt-5 rounded-full border border-white/15 px-4 py-2 text-[12.5px] text-haze-200 hover:border-cyan-400/50"
          >
            Rate again
          </button>
        </div>
      ) : (
        <div className="p-5">
          <div className="flex flex-wrap gap-2">
            {workers.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setWorker(w)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-[12px] transition-all",
                  worker === w ? "border-cyan-400/60 bg-cyan-400/15 text-cyan-100" : "border-white/10 text-haze-400 hover:text-haze-100",
                )}
              >
                {w}
              </button>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-1" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`${n} stars`}
                onMouseEnter={() => setHover(n)}
                onClick={() => setStars(n)}
                className="transition-transform hover:scale-125"
              >
                <svg viewBox="0 0 24 24" className={cn("h-8 w-8 transition-colors", (hover || stars) >= n ? "fill-amber-400 text-amber-400" : "fill-transparent text-haze-600")} stroke="currentColor" strokeWidth={1.5}>
                  <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9L12 2.5Z" />
                </svg>
              </button>
            ))}
            <span className="ml-3 font-display text-sm font-medium text-amber-300">{labels[hover || stars]}</span>
          </div>
          <p className="mt-5 text-[12px] text-haze-500">Feedback on management & services</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {areas.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => toggle(a)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-[12px] transition-all",
                  tags.includes(a) ? "border-violet-400/60 bg-violet-400/15 text-violet-100" : "border-white/10 text-haze-400 hover:text-haze-100",
                )}
              >
                {tags.includes(a) ? "✓ " : "+ "}
                {a}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={!stars}
            onClick={() => setDone(true)}
            className="mt-5 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 py-3 text-sm font-semibold text-night-950 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            {stars ? "Submit feedback" : "Select a rating to submit"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ───────────── Tilt image ───────────── */
function TiltImage({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const move = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2.5rem] opacity-60 blur-3xl" style={{ background: project.glow }} />
      <button
        ref={ref}
        type="button"
        onClick={onOpen}
        onMouseMove={move}
        onMouseLeave={leave}
        className="group relative block w-full overflow-hidden rounded-3xl border border-white/10 bg-night-900 text-left transition-transform duration-300 ease-out"
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="aspect-[16/11] w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/30 to-transparent" />
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-25 mix-blend-overlay", project.accent)} />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg", project.accent)}>
            <Icon name={project.icon} className="h-5 w-5" />
          </span>
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
          <span className="glass hairline rounded-full px-3 py-1.5 font-mono text-[11px] text-haze-100">{project.client}</span>
          <span className="flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-night-950 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <Icon name="arrowUpRight" className="h-5 w-5" strokeWidth={2.2} />
          </span>
        </div>
      </button>
    </div>
  );
}

/* ───────────── Modal ───────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-night-950/80 backdrop-blur-md" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="gradient-border animate-pop relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-night-900 sm:rounded-3xl"
      >
        <div className="relative">
          <img src={project.image} alt={project.title} className="aspect-[16/7] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/40 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="glass hairline absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full text-white"
          >
            <Icon name="close" />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <div className="flex flex-wrap gap-2">
              <span className={cn("rounded-full bg-gradient-to-r px-3 py-1 font-mono text-[11px] font-semibold text-white", project.accent)}>
                {project.client}
              </span>
              <span className="glass hairline rounded-full px-3 py-1 font-mono text-[11px] text-haze-200">{project.period}</span>
            </div>
            <h3 className="mt-3 font-display text-3xl font-bold text-white">{project.title}</h3>
          </div>
        </div>

        <div className="space-y-7 p-6 sm:p-8">
          <p className="text-[15px] leading-relaxed text-haze-300">{project.description}</p>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.2em] text-haze-500 uppercase">Key features</h4>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2.5 rounded-xl border border-white/8 bg-white/[0.02] p-3 text-[13px] leading-snug text-haze-200">
                  <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" strokeWidth={2.6} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {project.id === "yoga" && <PoseFinder />}
          {project.id === "vmm" && <RatingDemo />}

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.2em] text-haze-500 uppercase">Tech stack</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="hairline rounded-full bg-white/[0.04] px-3 py-1.5 font-mono text-[11.5px] text-haze-200">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {project.links.code && (
            <a
              href={project.links.code}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-brand inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white"
            >
              <Icon name="github" className="h-4 w-4" /> View on GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Section ───────────── */
export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = projects.find((p) => p.id === openId) ?? null;

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Featured projects"
          index="04"
          align="center"
          title={
            <>
              Things I&apos;ve <span className="text-gradient">built</span>
            </>
          }
          description="Four projects across client work, internships and personal builds — click any project to explore details and try live demos."
        />

        <div className="mt-20 space-y-24 sm:space-y-28">
          {projects.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={p.id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal className={cn(flip && "lg:order-2")}>
                  <TiltImage project={p} onOpen={() => setOpenId(p.id)} />
                </Reveal>

                <div className={cn(flip && "lg:order-1")}>
                  <Reveal>
                    <div className="flex items-center gap-3">
                      <span className="text-gradient font-display text-5xl font-bold opacity-80">0{i + 1}</span>
                      <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                      <span className="flex items-center gap-1.5 font-mono text-[11.5px] text-haze-400">
                        <Icon name="calendar" className="h-3.5 w-3.5" />
                        {p.period}
                      </span>
                    </div>
                  </Reveal>
                  <Reveal delay={80}>
                    <p className="mt-5 font-mono text-[12px] tracking-[0.15em] text-cyan-300 uppercase">{p.client}</p>
                    <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-haze-100 sm:text-4xl">{p.title}</h3>
                  </Reveal>
                  <Reveal delay={140}>
                    <p className="mt-4 text-[15.5px] leading-relaxed text-haze-400">{p.tagline}</p>
                    <ul className="mt-5 space-y-2">
                      {p.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex gap-2.5 text-[14px] text-haze-300">
                          <span className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r", p.accent)} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={200}>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.stack.slice(0, 6).map((s) => (
                        <span key={s} className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-haze-300">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setOpenId(p.id)}
                        className={cn(
                          "group inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-5 py-2.5 text-[13px] font-semibold text-night-950 transition-transform hover:-translate-y-0.5",
                          p.accent,
                        )}
                      >
                        {p.id === "yoga" || p.id === "vmm" ? "Details & live demo" : "View details"}
                        <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                      {p.links.code && (
                        <a
                          href={p.links.code}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="glass hairline inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium text-haze-100 transition-colors hover:border-white/25"
                        >
                          <Icon name="github" className="h-4 w-4" /> Code
                        </a>
                      )}
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {open && <ProjectModal project={open} onClose={() => setOpenId(null)} />}
    </section>
  );
}
