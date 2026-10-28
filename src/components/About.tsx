import type { ReactNode } from "react";
import { profile } from "@/data/portfolio";
import { Icon, Reveal, SectionHeading } from "@/components/ui";

const K = ({ children }: { children: ReactNode }) => <span className="text-fuchsia-400">{children}</span>;
const T = ({ children }: { children: ReactNode }) => <span className="text-cyan-300">{children}</span>;
const S = ({ children }: { children: ReactNode }) => <span className="text-emerald-300">{children}</span>;
const F = ({ children }: { children: ReactNode }) => <span className="text-amber-300">{children}</span>;
const C = ({ children }: { children: ReactNode }) => <span className="text-haze-500 italic">{children}</span>;

const lines: ReactNode[] = [
  <C>{"/** Hello! Thanks for stopping by. */"}</C>,
  <><K>public class</K> <T>Developer</T> {"{"}</>,
  <>&nbsp;&nbsp;<K>private</K> <T>String</T> name = <S>"Marripati Santhan"</S>;</>,
  <>&nbsp;&nbsp;<K>private</K> <T>String</T> role = <S>"Java Full Stack Developer"</S>;</>,
  <>&nbsp;&nbsp;<K>private</K> <T>String</T> base = <S>"Madanapalle, AP"</S>;</>,
  <>&nbsp;&nbsp;<K>private double</K> cgpa = <F>8.2</F>;</>,
  <>&nbsp;</>,
  <>&nbsp;&nbsp;<K>private</K> <T>List</T>&lt;<T>String</T>&gt; stack = <T>List</T>.<F>of</F>(</>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;<S>"Java"</S>, <S>"Spring Boot"</S>, <S>"Hibernate"</S>,</>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;<S>"React.js"</S>, <S>"MySQL"</S>, <S>"MongoDB"</S></>,
  <>&nbsp;&nbsp;);</>,
  <>&nbsp;</>,
  <>&nbsp;&nbsp;<K>public</K> <T>String</T> <F>mission</F>() {"{"}</>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;<K>return</K> <S>"Build efficient, scalable apps"</S>;</>,
  <>&nbsp;&nbsp;{"}"}</>,
  <>{"}"}</>,
];

const facts = [
  { icon: "grad", label: "Education", value: "B.Tech CSE · SKUCET", tone: "text-amber-300 bg-amber-400/12" },
  { icon: "briefcase", label: "Currently", value: "Java FS Intern @ Jspiders", tone: "text-emerald-300 bg-emerald-400/12" },
  { icon: "pin", label: "Based in", value: "Madanapalle, AP", tone: "text-fuchsia-300 bg-fuchsia-400/12" },
  { icon: "trophy", label: "Off the keyboard", value: "University cricketer", tone: "text-cyan-300 bg-cyan-400/12" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="About me"
              index="01"
              title={
                <>
                  Turning logic into <span className="text-gradient">real-world</span> applications.
                </>
              }
            />
            <Reveal delay={150}>
              <p className="mt-6 text-[15.5px] leading-[1.8] text-haze-400">
                I&apos;m <span className="font-semibold text-haze-100">{profile.name}</span>, a Computer Science
                engineering student at Sri Krishnadevaraya University College of Engineering and Technology and an
                aspiring <span className="text-amber-300">Java Full Stack Developer</span>. I love building complete
                products — from Spring Boot REST APIs and MySQL schemas to responsive React.js interfaces.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-4 text-[15.5px] leading-[1.8] text-haze-400">
                Through internships at <span className="text-haze-100">Jspiders</span> and{" "}
                <span className="text-haze-100">Amdox Technologies</span>, I&apos;ve shipped CRUD apps, single-page
                applications and a LinkedIn-style job portal. My strengths are strong Core Java fundamentals, data
                structures and a problem-solving mindset.
              </p>
            </Reveal>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {facts.map((f, i) => (
                <Reveal key={f.label} delay={280 + i * 70}>
                  <div className="hairline group flex items-center gap-3 rounded-2xl bg-white/[0.025] p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05]">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${f.tone}`}>
                      <Icon name={f.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10.5px] tracking-[0.16em] text-haze-500 uppercase">{f.label}</span>
                      <span className="block truncate text-[13.5px] font-medium text-haze-100">{f.value}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* IDE window */}
          <Reveal delay={150}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 via-violet-600/20 to-fuchsia-500/20 blur-2xl" />
              <div className="gradient-border relative overflow-hidden rounded-3xl bg-night-900/90 shadow-2xl">
                <div className="flex items-center gap-2 border-b border-white/8 bg-night-850 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  <div className="ml-3 flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1 font-mono text-[11px] text-haze-300">
                    <Icon name="java" className="h-3.5 w-3.5 text-java" />
                    Developer.java
                  </div>
                  <span className="ml-auto font-mono text-[10px] text-haze-500">UTF-8 · Java 17</span>
                </div>
                <div className="overflow-x-auto p-5 font-mono text-[12px] leading-[1.85] sm:text-[13px]">
                  {lines.map((line, i) => (
                    <div key={i} className="flex gap-4 whitespace-nowrap">
                      <span className="w-5 shrink-0 text-right text-haze-600 select-none">{i + 1}</span>
                      <span className="text-haze-200">{line}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-white/8 bg-night-850 px-4 py-2 font-mono text-[10.5px]">
                  <span className="flex items-center gap-1.5 text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> BUILD SUCCESSFUL
                  </span>
                  <span className="text-haze-500">Ln 16, Col 2</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
