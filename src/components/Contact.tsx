import { useState, type FormEvent } from "react";
import { cn } from "@/utils/cn";
import { profile } from "@/data/portfolio";
import { downloadResume, openResume } from "@/lib/resume";
import { Icon, Reveal, SectionHeading } from "@/components/ui";

type Fields = { name: string; email: string; subject: string; message: string };
const empty: Fields = { name: "", email: "", subject: "", message: "" };

const channels = [
  { icon: "mail", label: "Email", value: profile.email, href: `mailto:${profile.email}`, tone: "from-cyan-400 to-blue-500" },
  { icon: "phone", label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, tone: "from-violet-400 to-indigo-500" },
  { icon: "linkedin", label: "LinkedIn", value: "Connect with me", href: profile.linkedin, tone: "from-sky-400 to-blue-600" },
  { icon: "github", label: "GitHub", value: "See my code", href: profile.github, tone: "from-fuchsia-400 to-pink-500" },
];

export default function Contact() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Fields, v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof Fields, string>> = {};
    if (f.name.trim().length < 2) next.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) next.email = "Please enter a valid email";
    if (f.message.trim().length < 10) next.message = "Message should be at least 10 characters";
    setErrors(next);
    if (Object.keys(next).length) return;

    const subject = encodeURIComponent(f.subject || `Opportunity for ${profile.name}`);
    const body = encodeURIComponent(`Hi Santhan,\n\n${f.message}\n\n— ${f.name}\n${f.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setF(empty);
    window.setTimeout(() => setSent(false), 6000);
  };

  const field = (err?: string) =>
    cn(
      "w-full rounded-2xl border bg-night-950/60 px-4 py-3.5 text-[14.5px] text-haze-100 outline-none transition-all placeholder:text-haze-500",
      err ? "border-rose-400/60" : "border-white/10 focus:border-violet-400/70 focus:shadow-[0_0_0_4px_rgba(139,92,246,0.15)]",
    );

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Get in touch"
          index="06"
          align="center"
          title={
            <>
              Let&apos;s build something <span className="text-gradient">together</span>
            </>
          }
          description="I'm actively looking for Java Developer / Full Stack roles. Whether you have an opportunity, a question or just want to say hi — my inbox is open."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 80}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="hairline group flex items-center gap-4 rounded-2xl bg-night-900/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-night-900"
                >
                  <span className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110", c.tone)}>
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] tracking-[0.16em] text-haze-500 uppercase">{c.label}</span>
                    <span className="block truncate text-[14.5px] font-medium text-haze-100">{c.value}</span>
                  </span>
                  <Icon name="arrowUpRight" className="ml-auto h-4 w-4 shrink-0 text-haze-500 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                </a>
              </Reveal>
            ))}

            <Reveal delay={340}>
              <div className="gradient-border relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/25 via-night-900 to-cyan-600/15 p-6">
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-fuchsia-500/25 blur-3xl" />
                <div className="relative flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <Icon name="file" className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">My Résumé</h3>
                    <p className="text-[12.5px] text-haze-300">PDF · 1 page · updated 2026</p>
                  </div>
                </div>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={downloadResume}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-night-950 transition-transform hover:-translate-y-0.5"
                  >
                    <Icon name="download" className="h-4 w-4" /> Download PDF
                  </button>
                  <button
                    type="button"
                    onClick={openResume}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-white/10"
                  >
                    <Icon name="eye" className="h-4 w-4" /> Preview
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <form onSubmit={submit} noValidate className="gradient-border glass relative h-full rounded-3xl p-7 sm:p-9">
              <h3 className="font-display text-2xl font-bold text-haze-100">Send a message</h3>
              <p className="mt-1 text-[13.5px] text-haze-400">Opens your email app with everything pre-filled.</p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-[12.5px] font-medium text-haze-300">Your name</label>
                  <input id="name" value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="John Recruiter" className={field(errors.name)} />
                  {errors.name && <p className="mt-1.5 text-[11.5px] text-rose-400">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-[12.5px] font-medium text-haze-300">Your email</label>
                  <input id="email" type="email" value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" className={field(errors.email)} />
                  {errors.email && <p className="mt-1.5 text-[11.5px] text-rose-400">{errors.email}</p>}
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="subject" className="mb-2 block text-[12.5px] font-medium text-haze-300">Subject</label>
                <input id="subject" value={f.subject} onChange={(e) => set("subject", e.target.value)} placeholder="Java Developer opportunity" className={field()} />
              </div>
              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block text-[12.5px] font-medium text-haze-300">Message</label>
                <textarea id="message" rows={5} value={f.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell me about the role or project…" className={cn(field(errors.message), "resize-none")} />
                {errors.message && <p className="mt-1.5 text-[11.5px] text-rose-400">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className={cn(
                  "group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5",
                  sent ? "bg-emerald-500" : "bg-brand animate-gradient shadow-[0_12px_40px_-12px_rgba(139,92,246,0.9)]",
                )}
              >
                {sent ? (
                  <>
                    <Icon name="check" className="h-4 w-4" strokeWidth={2.6} /> Opening your mail app…
                  </>
                ) : (
                  <>
                    Send message <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
