import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Volunteering from "@/components/Volunteering";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
  <section id="home" className="scroll-mt-32 md:scroll-mt-40 section-anchor">
          <Hero />
        </section>
        
  <section id="about" className="scroll-mt-32 md:scroll-mt-40 section-anchor">
          <Education />
        </section>
        
  <section id="skills" className="scroll-mt-32 md:scroll-mt-40 section-anchor">
          <Skills />
        </section>
        
  <section id="experience" className="scroll-mt-32 md:scroll-mt-40 section-anchor">
          <Experience />
        </section>
        
  <section id="volunteering" className="scroll-mt-32 md:scroll-mt-40 section-anchor">
          <Volunteering />
        </section>

  <section id="projects" className="scroll-mt-32 md:scroll-mt-40 section-anchor">
          <Projects />
        </section>
        
  <section id="achievements" className="scroll-mt-32 md:scroll-mt-40 section-anchor">
          <Achievements />
        </section>
        
  <section id="contact" className="scroll-mt-32 md:scroll-mt-40 section-anchor">
          <Contact />
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 Rakesh Vajrapu. Built with React, JavaScript, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;