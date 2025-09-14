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
import { Suspense, lazy } from "react";

const Projects = lazy(() => import("@/components/Projects"));
const Achievements = lazy(() => import("@/components/Achievements"));

const Index = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      <Header />
      <ScrollToTop />
      
      <main>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.section id="home" className="scroll-mt-32 md:scroll-mt-40 section-anchor" variants={sectionVariants}>
            <Hero />
          </motion.section>
        
          <motion.section id="about" className="scroll-mt-32 md:scroll-mt-40 section-anchor" variants={sectionVariants}>
            <Education />
          </motion.section>
        <SectionDivider />
        
          <motion.section id="skills" className="scroll-mt-32 md:scroll-mt-40 section-anchor" variants={sectionVariants}>
            <Skills />
          </motion.section>
        <SectionDivider />
        
          <motion.section id="experience" className="scroll-mt-32 md:scroll-mt-40 section-anchor" variants={sectionVariants}>
            <Experience />
          </motion.section>
        <SectionDivider />
        
          <motion.section id="volunteering" className="scroll-mt-32 md:scroll-mt-40 section-anchor" variants={sectionVariants}>
            <Volunteering />
          </motion.section>
        <SectionDivider />

          <motion.section id="projects" className="scroll-mt-32 md:scroll-mt-40 section-anchor" variants={sectionVariants}>
            <Suspense fallback={<div className="container mx-auto px-6 py-8">Loading projects…</div>}>
              <Projects />
            </Suspense>
          </motion.section>
        <SectionDivider />
        
          <motion.section id="achievements" className="scroll-mt-32 md:scroll-mt-40 section-anchor" variants={sectionVariants}>
            <Suspense fallback={<div className="container mx-auto px-6 py-8">Loading achievements…</div>}>
              <Achievements />
            </Suspense>
          </motion.section>
        <SectionDivider />
        
          <motion.section id="contact" className="scroll-mt-32 md:scroll-mt-40 section-anchor" variants={sectionVariants}>
            <Contact />
          </motion.section>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Rakesh Vajrapu. Built with React, JavaScript, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;