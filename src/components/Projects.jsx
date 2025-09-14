import { ExternalLink, Github, Heart, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import TiltCard from "@/components/ui/TiltCard";
import Magnetic from "@/components/ui/Magnetic";

const Projects = () => {
  const projects = [
    {
      title: "ShopSmart - React E-Commerce Platform",
      description: "Built a responsive shopping platform allowing users to explore products, manage carts, and simulate purchases.",
      icon: Heart,
      codeUrl: "https://github.com/rakesh-vajrapu/ShopSmart",
      demoUrl: "https://shopsmartweb.netlify.app/",
      technologies: ["React JS", "Redux", "JavaScript", "Bootstrap", "Fake Store API"],
      features: [
        "Built a responsive shopping platform allowing users to explore products, manage carts, and simulate purchases",
        "Integrated Redux for seamless state management and dynamic cart updates", 
        "Utilized Fake Store API to fetch real-time product data with robust backend connectivity"
      ],
      impact: "E-commerce Platform",
      category: "Web Development"
    },
    {
      title: "Gesture Based Volume Controller",
      description: "Real-time hand gesture recognition system for intuitive volume control with machine learning and computer vision.",
      icon: Hand,
      codeUrl: "https://github.com/rakesh-vajrapu/Gesture-Volume-Controller",
      demoUrl: "https://github.com/rakesh-vajrapu/Gesture-Volume-Controller",
      technologies: ["Python", "OpenCV", "MediaPipe", "NumPy"],
      features: [
        "Real-time hand gesture recognition for intuitive volume control",
        "Leveraged machine learning with MediaPipe for accurate hand landmark detection",
        "Designed real-time system ensuring low-latency gesture recognition with robustness against environmental noise"
      ],
      impact: "Real-time processing",
      category: "AI/ML Project"
    }
  ];

  return (
    <section className="pt-16 pb-8 relative">
      <span aria-hidden className="section-blob blob-proj" />
      <div className="container mx-auto px-6">
  <div className="text-center mb-10 pt-2">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent section-heading">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions that combine cutting-edge technology with real-world impact
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.12 }}
        >
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <motion.div key={project.title} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <Magnetic className="block">
                  <TiltCard className="project-card glass glow-border rounded-xl p-6 hover:shadow-glow transition-all duration-300 group relative overflow-hidden">
                    {/* Aurora beams */}
                    <span aria-hidden className="aurora aurora-proj-a" />
                    <span aria-hidden className="aurora aurora-proj-b" />
                    {/* Tech scanlines + neon brackets */}
                    <span aria-hidden className="proj-scanlines" />
                    <span aria-hidden className="corner-bracket tl" />
                    <span aria-hidden className="corner-bracket br" />
                    {/* Sweep + spotlight */}
                    <span aria-hidden className="shine-rect" />
                    <span aria-hidden className="spotlight-overlay" />
                    {/* Category badge floating */}
                    <span aria-hidden className="category-badge absolute top-4 right-4 z-[1] text-xs px-2 py-1 rounded-full bg-gradient-primary/20 text-primary border border-primary/30">
                      {project.category}
                    </span>
                    
                    <div className="flex items-center mb-6 relative z-[2]">
                      <div className="icon-ring p-4 bg-gradient-primary rounded-xl mr-4 group-hover:animate-glow relative">
                        <motion.span
                          whileHover={{ rotate: 12, scale: 1.08 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className="inline-block"
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.span>
                        {/* Rotating halo ring */}
                        <span aria-hidden className="ring-spin" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed relative z-[2]">
                      {project.description}
                    </p>

                    <div className="mb-6 relative z-[2]">
                      <h4 className="font-semibold mb-3 text-secondary">Key Features:</h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, featureIndex) => (
                          <motion.li 
                            key={featureIndex} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: featureIndex * 0.08 }}
                          >
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6 relative z-[2]">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-secondary">Technologies Used:</span>
                        <span className="text-sm font-bold text-accent">{project.impact}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.span 
                            key={tech}
                            className="tech-chip px-3 py-1 bg-muted/20 rounded-full text-xs hover:bg-primary/20 transition-colors duration-300"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: techIndex * 0.05 }}
                            whileHover={{ scale: 1.05, y: -1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 relative z-[2]">
                      {project.codeUrl ? (
                        <Magnetic>
                          <Button asChild variant="outline" size="sm" className="project-button flex-1 border-primary/20 hover:bg-primary/10">
                            <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" aria-label={`View code for ${project.title}`}>
                              <Github className="w-4 h-4 mr-2" />
                              View Code
                            </a>
                          </Button>
                        </Magnetic>
                      ) : (
                        <Button variant="outline" size="sm" className="flex-1 border-primary/20" disabled>
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </Button>
                      )}
                      {project.demoUrl ? (
                        <Magnetic>
                          <Button asChild size="sm" className="project-button flex-1 bg-gradient-primary hover:shadow-primary">
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Live demo for ${project.title}`}>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                        </Magnetic>
                      ) : (
                        <Button size="sm" className="flex-1 bg-gradient-primary" disabled>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </TiltCard>
                </Magnetic>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;