import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ResumeModal from "@/components/ResumeModal";

/** Slow-moving aurora gradient blobs behind the whole page. */
function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="animate-aurora-1 absolute -top-[20%] -left-[10%] h-[60vh] w-[60vh] rounded-full bg-cyan-500/[0.13] blur-[120px]" />
      <div className="animate-aurora-2 absolute top-[20%] -right-[15%] h-[70vh] w-[70vh] rounded-full bg-violet-600/[0.16] blur-[130px]" />
      <div className="animate-aurora-3 absolute -bottom-[20%] left-[20%] h-[60vh] w-[60vh] rounded-full bg-fuchsia-500/[0.10] blur-[130px]" />
      <div className="noise absolute inset-0 opacity-[0.12] mix-blend-overlay" />
    </div>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-night-950">
      <Aurora />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <ResumeModal />
    </div>
  );
}
