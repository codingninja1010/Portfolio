import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Volunteering from "@/components/Volunteering";
import ScrollToTop from "@/components/ScrollToTop";
import SectionDivider from "@/components/SectionDivider";
import { motion } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic.jsx";
import { Suspense, lazy, useEffect } from "react";
import { staggerContainer, revealVariant } from "@/lib/motion";
import ParallaxAccent from "@/components/ParallaxAccent";

const Projects = lazy(() => import("@/components/Projects"));
const Achievements = lazy(() => import("@/components/Achievements"));

const Index = () => {
  const sectionVariants = revealVariant(24, 0.6);

  return (
    <div className="min-h-screen">
  <Header />
  <ScrollToTop />
      {/** Prefetch below-the-fold lazy sections shortly after mount to avoid showing fallbacks */}
      {/** This runs only on the client and won't block the first paint. */}
      <PrefetchLazyChunks />
      
      <main className="relative">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.section id="home" className="relative scroll-mt-32 md:scroll-mt-40 section-anchor cv-auto" variants={sectionVariants}>
            <ParallaxAccent className="-z-10" />
            <Hero />
          </motion.section>
        
          <motion.section id="about" className="relative scroll-mt-32 md:scroll-mt-40 section-anchor cv-auto" variants={sectionVariants}>
            <ParallaxAccent className="-z-10" offsetX={120} offsetY={40} />
            <Education />
          </motion.section>
        <SectionDivider />
        
          <motion.section id="skills" className="relative scroll-mt-32 md:scroll-mt-40 section-anchor cv-auto" variants={sectionVariants}>
            <ParallaxAccent className="-z-10" offsetX={-60} offsetY={-20} intensity={30} />
            <Skills />
          </motion.section>
        <SectionDivider />
        
          <motion.section id="experience" className="relative scroll-mt-32 md:scroll-mt-40 section-anchor cv-auto" variants={sectionVariants}>
            <ParallaxAccent className="-z-10" offsetX={140} offsetY={-30} intensity={36} />
            <Experience />
          </motion.section>
        <SectionDivider />
        
          <motion.section id="volunteering" className="relative scroll-mt-32 md:scroll-mt-40 section-anchor cv-auto" variants={sectionVariants}>
            <ParallaxAccent className="-z-10" offsetX={-100} offsetY={20} intensity={32} />
            <Volunteering />
          </motion.section>
        <SectionDivider />

          <motion.section id="projects" className="relative scroll-mt-32 md:scroll-mt-40 section-anchor cv-auto" variants={sectionVariants}>
            <ParallaxAccent className="-z-10" offsetX={60} offsetY={-10} intensity={28} />
            <Suspense fallback={<div className="container mx-auto px-6 py-8">Loading projects…</div>}>
              <Projects />
            </Suspense>
          </motion.section>
        <SectionDivider />
        
          <motion.section id="achievements" className="relative scroll-mt-32 md:scroll-mt-40 section-anchor cv-auto" variants={sectionVariants}>
            <ParallaxAccent className="-z-10" offsetX={-40} offsetY={-40} intensity={34} />
            <Suspense fallback={<div className="container mx-auto px-6 py-8">Loading achievements…</div>}>
              <Achievements />
            </Suspense>
          </motion.section>
        <SectionDivider />
        
          <motion.section id="contact" className="relative scroll-mt-32 md:scroll-mt-40 section-anchor cv-auto" variants={sectionVariants}>
            <ParallaxAccent className="-z-10" offsetX={100} offsetY={10} intensity={30} />
            <Contact />
          </motion.section>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Rakesh Vajrapu.
          </p>
          <Magnetic className="mt-2 inline-block">
            <motion.div
              className="relative inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 btn-border-animate btn-shine group overflow-hidden"
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Cursor-following spotlight */}
              <span aria-hidden className="spotlight-overlay" />
              <span className="font-tagline gradient-text-enhanced text-sm sm:text-base">
                Inventing Tomorrow, One Line of Code at a Time
              </span>
            </motion.div>
          </Magnetic>
        </div>
      </footer>
    </div>
  );
};

export default Index;

// Tiny helper component to avoid re-running effects on React StrictMode double render in dev
function PrefetchLazyChunks() {
  useEffect(() => {
    const id = setTimeout(() => {
      import("@/components/Projects");
      import("@/components/Achievements");
    }, 100);
    return () => clearTimeout(id);
  }, []);
  return null;
}