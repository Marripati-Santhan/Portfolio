import { useEffect, useState, type ReactNode } from "react";
import { resume } from "@/data/portfolio";
import { downloadResume } from "@/lib/resume";
import { Icon } from "@/components/ui";

function H({ children }: { children: ReactNode }) {
  return <h3 className="mt-4 border-b border-black pb-0.5 text-[15px] font-bold">{children}</h3>;
}
function Row({ l, r, bold = true }: { l: ReactNode; r: ReactNode; bold?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span className={bold ? "font-bold" : ""}>{l}</span>
      <span className="shrink-0">{r}</span>
    </div>
  );
}
function UL({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-1 list-disc space-y-0.5 pl-5">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

export default function ResumeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("open-resume", show);
    return () => window.removeEventListener("open-resume", show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex flex-col bg-night-950/90 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="bg-brand flex h-9 w-9 items-center justify-center rounded-xl text-white">
            <Icon name="file" className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold text-haze-100">Marripati_Santhan_Resume.pdf</p>
            <p className="font-mono text-[10.5px] text-haze-500">Preview</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={downloadResume}
            className="bg-brand inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-white sm:px-5"
          >
            <Icon name="download" className="h-4 w-4" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close résumé"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <Icon name="close" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 sm:p-8" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
        <article className="resume-paper animate-pop mx-auto w-full max-w-[820px] bg-white px-6 py-8 text-[12.5px] leading-[1.45] text-black shadow-2xl sm:px-12 sm:py-10 sm:text-[13.5px]">
          <header className="text-center">
            <h2 className="text-[26px] font-bold tracking-wide sm:text-[30px]">{resume.name}</h2>
            <p>{resume.location}</p>
            <p className="mt-0.5 flex flex-wrap justify-center gap-x-2 text-[12px] sm:text-[13px]">
              <a href={`mailto:${resume.email}`} className="text-blue-700">{resume.email}</a>
              <span>|</span>
              <span>{resume.phone}</span>
              <span>|</span>
              <a href={resume.linkedin} target="_blank" rel="noreferrer" className="text-blue-700">LinkedIn</a>
              <span>|</span>
              <a href={resume.github} target="_blank" rel="noreferrer" className="text-blue-700">GitHub</a>
            </p>
          </header>

          <H>Professional Summary</H>
          <p className="mt-1">{resume.summary}</p>

          <H>Education</H>
          {resume.education.map((e) => (
            <div key={e.left} className="mt-1.5">
              <Row l={e.left} r={e.right} />
              <Row l={e.sub} r={e.subRight} bold={false} />
              <p>{e.place}</p>
            </div>
          ))}

          <H>Internship Experience</H>
          {resume.internships.map((it) => (
            <div key={it.title} className="mt-1.5">
              <Row l={<>{it.title} <span className="font-normal italic">– {it.role}</span></>} r={it.period} />
              <UL items={it.bullets} />
            </div>
          ))}

          <H>Projects</H>
          {resume.projects.map((p) => (
            <div key={p.title} className="mt-1.5">
              <Row l={p.title} r={p.period} />
              <UL items={p.bullets} />
            </div>
          ))}

          <H>Technical Skills</H>
          <UL items={resume.skills.map((s) => <><b>{s.label}:</b> {s.value}</>)} />

          <H>Achievements &amp; Responsibilities</H>
          <UL
            items={[
              <>Served as <b>Class Representative (CR)</b> during B.Tech.</>,
              <>Best Cricketer of the University (2024) represented SKU in AIU Inter-University Cricket.</>,
            ]}
          />
        </article>
      </div>
    </div>
  );
}
