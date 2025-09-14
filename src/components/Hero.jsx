import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Typewriter from "@/components/ui/Typewriter";
import { Github, Linkedin, Mail } from "lucide-react";
import { SiLeetcode, SiCodechef } from "react-icons/si";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import rakeshPhoto from "@/assets/rakesh-photo.jpg";
import Magnetic from "@/components/ui/Magnetic";

const Hero = () => {
  // state kept in case future interactions are needed
  const [imgLoaded, setImgLoaded] = useState(false);
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });

  const handleMouseMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width - 0.5) * 2; // -1 to 1
    const py = (y / rect.height - 0.5) * 2; // -1 to 1
    const maxRot = 12; // degrees
    const rx = -py * maxRot;
    const ry = px * maxRot;
    const tx = px * 12; // px translate for glow
    const ty = py * 12;
    setTilt({ rx, ry, tx, ty });
  };

  const handleMouseLeave = () => setTilt({ rx: 0, ry: 0, tx: 0, ty: 0 });

  // Scroll-based parallax for background orbs
  const { scrollYProgress } = useScroll();
  const ySmall = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yMedium = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yLarge = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28 md:pt-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y: ySmall }} className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
        <motion.div style={{ y: yMedium }} className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" />
        <motion.div style={{ y: yLarge }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
      </div>

      {/* Big circular profile photo aligned to the right on desktop */}
      <div className="hidden md:block absolute right-6 lg:right-12 top-28 lg:top-32 z-20">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="hero-photo-3d relative inline-block will-change-transform overflow-hidden rounded-full animate-photo-enter photo-float"
          style={{
            transform: `perspective(700px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            transition: "transform 220ms ease-out",
          }}
        >
          {/* Ripple rings behind the photo */}
          <div className="ripple-rings" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          {/* Rotating rainbow gradient ring */}
          <div className="glow-ring" aria-hidden="true" />
          {/* Inner subtle ring */}
          <div className="glow-ring-inner" aria-hidden="true" />

          {/* Shine sweep overlay */}
          <div className="shine-sweep" aria-hidden="true" />
          {/* Parallax glow behind the photo */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 transition-transform duration-200 ease-out"
            style={{ transform: `translate(${tilt.tx}px, ${tilt.ty}px)` }}
          >
            <div
              className="w-[120%] h-[120%] -left-[10%] -top-[10%] absolute rounded-full blur-xl opacity-30"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, rgba(59,130,246,0.45), rgba(59,130,246,0.15) 40%, rgba(59,130,246,0.0) 70%)",
              }}
            />
          </div>

          <img
            src={rakeshPhoto}
            alt="Rakesh Vajrapu"
            onLoad={() => setImgLoaded(true)}
            className={`w-40 h-40 md:w-44 md:h-44 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full object-cover ring-2 ring-primary/40 shadow-primary bg-muted/30 
              transition-transform duration-500 ease-out hover:scale-110 hover:shadow-glow motion-reduce:transform-none 
              ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8">
            {/* Greeting line with typewriter; name uses gradient like before */}
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-foreground/90">
              <Typewriter
                as="span"
                text={"Hi, I'm "}
                speed={28}
                delay={200}
                showCaret={false}
              />
              <Typewriter
                as="span"
                className="bg-gradient-primary bg-clip-text text-transparent"
                text={"Rakesh Vajrapu"}
                speed={28}
                delay={500}
              />
            </p>
            {/* Mobile-only small photo under the greeting */}
            <div className="flex items-center justify-center mb-4">
              <img
                src={rakeshPhoto}
                alt="Rakesh Vajrapu"
                className="block md:hidden w-20 h-20 rounded-full object-cover border border-primary/30 shadow-sm bg-muted/30 transition-transform duration-300 ease-out hover:scale-105 active:scale-105"
              />
            </div>
            {/* Subtitle typewriter */}
            <Typewriter
              as="div"
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground tracking-wide italic mb-2"
              text={"Full-Stack Developer & AI Enthusiast"}
              speed={22}
              delay={1600}
            />
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Passionate Software Engineer with expertise in Python, JavaScript, AI/ML, and Data Science, skilled in leveraging Cloud Technologies to build innovative solutions. I thrive on bridging the gap between complex problems and elegant code, crafting intelligent systems that combine scalability, performance, and data-driven insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-gradient-primary hover:shadow-primary transition-all duration-300 hover:scale-105">
              <a href="mailto:rakeshrb1411@gmail.com">
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/20 hover:bg-primary/10 transition-all duration-300">
              <a href="https://github.com/rakesh-vajrapu?tab=repositories" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                View Projects
              </a>
            </Button>
          </div>

          <TooltipProvider delayDuration={0} skipDelayDuration={0}>
            <div className="flex justify-center space-x-6">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Magnetic>
                    <a
                      href="mailto:rakeshrb1411@gmail.com"
                      aria-label="Email"
                      className="icon-button glass rounded-lg hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      title="Mail"
                    >
                      <Mail className="w-7 h-7 text-primary" />
                    </a>
                  </Magnetic>
                </TooltipTrigger>
                <TooltipContent>Mail</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Magnetic>
                    <a
                      href="https://www.linkedin.com/in/rakeshvajrapu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="icon-button glass rounded-lg hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-7 h-7 text-primary" />
                    </a>
                  </Magnetic>
                </TooltipTrigger>
                <TooltipContent>LinkedIn</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Magnetic>
                    <a
                      href="https://github.com/rakesh-vajrapu"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="icon-button glass rounded-lg hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      title="GitHub"
                    >
                      <Github className="w-7 h-7 text-primary" />
                    </a>
                  </Magnetic>
                </TooltipTrigger>
                <TooltipContent>GitHub</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Magnetic>
                    <a
                      href="https://leetcode.com/u/rakeshvajrapu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LeetCode"
                      className="icon-button glass rounded-lg hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      title="LeetCode"
                    >
                      <SiLeetcode className="w-7 h-7 text-primary" />
                    </a>
                  </Magnetic>
                </TooltipTrigger>
                <TooltipContent>LeetCode</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Magnetic>
                    <a
                      href="https://www.codechef.com/users/rakeshvajrapu"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="CodeChef"
                      className="icon-button glass rounded-lg hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      title="CodeChef"
                    >
                      <SiCodechef className="w-7 h-7 text-primary" />
                    </a>
                  </Magnetic>
                </TooltipTrigger>
                <TooltipContent>CodeChef</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;