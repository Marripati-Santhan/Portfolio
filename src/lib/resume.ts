import { jsPDF } from "jspdf";
import { resume } from "@/data/portfolio";

/**
 * Generates Marripati Santhan's résumé as a real, selectable-text A4 PDF
 * (mirrors the LaTeX-style résumé layout) and triggers a download.
 */
export function downloadResume() {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 44;
  const CW = W - M * 2;
  const LH = 12.2;
  let y = 50;

  const ensure = (h: number) => {
    if (y + h > H - 40) {
      doc.addPage();
      y = 50;
    }
  };

  const font = (style: "normal" | "bold" | "italic", size: number) => {
    doc.setFont("times", style);
    doc.setFontSize(size);
  };

  /* ── Header ── */
  font("bold", 21);
  doc.setTextColor(0, 0, 0);
  doc.text(resume.name, W / 2, y, { align: "center" });
  y += 16;
  font("normal", 10);
  doc.text(resume.location, W / 2, y, { align: "center" });
  y += 14;

  const pieces: { t: string; url?: string }[] = [
    { t: resume.email, url: `mailto:${resume.email}` },
    { t: resume.phone },
    { t: "LinkedIn", url: resume.linkedin },
    { t: "GitHub", url: resume.github },
  ];
  const sep = "  |  ";
  const total =
    pieces.reduce((acc, p) => acc + doc.getTextWidth(p.t), 0) +
    doc.getTextWidth(sep) * (pieces.length - 1);
  let x = (W - total) / 2;
  pieces.forEach((p, i) => {
    if (p.url) {
      doc.setTextColor(20, 40, 200);
      doc.textWithLink(p.t, x, y, { url: p.url });
    } else {
      doc.setTextColor(0, 0, 0);
      doc.text(p.t, x, y);
    }
    x += doc.getTextWidth(p.t);
    if (i < pieces.length - 1) {
      doc.setTextColor(0, 0, 0);
      doc.text(sep, x, y);
      x += doc.getTextWidth(sep);
    }
  });
  doc.setTextColor(0, 0, 0);
  y += 8;

  /* ── Helpers ── */
  const section = (title: string) => {
    ensure(34);
    y += 12;
    font("bold", 12.5);
    doc.text(title, M, y);
    y += 4;
    doc.setLineWidth(0.6);
    doc.line(M, y, W - M, y);
    y += 12;
  };

  const row = (left: string, right: string, leftStyle: "bold" | "normal" = "bold") => {
    ensure(LH);
    font(leftStyle, 10);
    doc.text(left, M, y);
    font("normal", 10);
    doc.text(right, W - M, y, { align: "right" });
    y += LH;
  };

  const paragraph = (text: string) => {
    font("normal", 10);
    const lines = doc.splitTextToSize(text, CW) as string[];
    lines.forEach((l) => {
      ensure(LH);
      doc.text(l, M, y);
      y += LH;
    });
  };

  const bullet = (text: string, label?: string) => {
    font("normal", 10);
    const indent = 14;
    ensure(LH);
    doc.text("•", M + 3, y);
    if (label) {
      font("bold", 10);
      const lw = doc.getTextWidth(label + " ");
      doc.text(label, M + indent, y);
      font("normal", 10);
      const first = doc.splitTextToSize(text, CW - indent - lw) as string[];
      doc.text(first[0] ?? "", M + indent + lw, y);
      y += LH;
      const rest = first.slice(1).join(" ");
      if (rest) {
        (doc.splitTextToSize(rest, CW - indent) as string[]).forEach((l) => {
          ensure(LH);
          doc.text(l, M + indent, y);
          y += LH;
        });
      }
    } else {
      const lines = doc.splitTextToSize(text, CW - indent) as string[];
      lines.forEach((l, i) => {
        if (i > 0) ensure(LH);
        doc.text(l, M + indent, y);
        y += LH;
      });
    }
    y += 2;
  };

  /* ── Sections ── */
  section("Professional Summary");
  paragraph(resume.summary);

  section("Education");
  resume.education.forEach((e, i) => {
    row(e.left, e.right);
    row(e.sub, e.subRight, "normal");
    font("normal", 10);
    doc.text(e.place, M, y);
    y += LH + (i < resume.education.length - 1 ? 4 : 0);
  });

  section("Internship Experience");
  resume.internships.forEach((it) => {
    ensure(LH * 2);
    font("bold", 10);
    doc.text(it.title, M, y);
    const tw = doc.getTextWidth(it.title);
    font("italic", 10);
    doc.text(` – ${it.role}`, M + tw, y);
    font("normal", 10);
    doc.text(it.period, W - M, y, { align: "right" });
    y += LH + 2;
    it.bullets.forEach((b) => bullet(b));
    y += 2;
  });

  section("Projects");
  resume.projects.forEach((p) => {
    ensure(LH * 2);
    row(p.title, p.period);
    y += 2;
    p.bullets.forEach((b) => bullet(b));
    y += 2;
  });

  section("Technical Skills");
  resume.skills.forEach((s) => bullet(s.value, `${s.label}:`));

  section("Achievements & Responsibilities");
  resume.achievements.forEach((a) => bullet(a));

  doc.setProperties({
    title: "Marripati Santhan — Résumé",
    author: "Marripati Santhan",
    subject: "Java Full Stack Developer Résumé",
  });
  doc.save("Marripati_Santhan_Resume.pdf");
}

/** Open the résumé preview modal from anywhere. */
export const openResume = () => window.dispatchEvent(new CustomEvent("open-resume"));
