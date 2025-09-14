import { Code, Database, Cloud, Cpu, Globe, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "./ui/TiltCard.jsx";
import Magnetic from "./ui/Magnetic.jsx";

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: ["Python", "Java", "C", "C++", "JavaScript", "SQL"],
      color: "text-primary"
    },
    {
      title: "Web Development",
      icon: Globe,
      skills: ["HTML", "CSS", "JavaScript", "React JS", "Node JS", "Bootstrap", "Tailwind CSS", "Flask", "REST APIs"],
      color: "text-secondary"
    },
    {
      title: "Tools & Platforms",
      icon: GitBranch,
      skills: ["Git", "GitHub", "Microsoft Azure", "MySQL", "PostgreSQL", "Vite", "Linux"],
      color: "text-accent"
    },
    {
      title: "Core CS Concepts",
      icon: Database,
      skills: ["Data Structures", "Object-Oriented Programming", "OOP", "Computer Networks", "Databases", "Operating Systems"],
      color: "text-primary"
    },
    {
      title: "AI & Machine Learning",
      icon: Cpu,
      skills: ["Machine Learning", "Deep Learning", "OpenCV", "MediaPipe", "NumPy"],
      color: "text-secondary"
    },
    {
      title: "Other Skills",
      icon: Cloud,
      skills: ["Agile & Scrum", "SDLC", "Debugging", "Problem-Solving", "Collaboration", "Communication", "Time Management"],
      color: "text-accent"
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 140, damping: 18 } },
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
  <div className="text-center mb-16 pt-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit spanning full-stack development, cloud technologies, and AI/ML
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.08 }}
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div key={category.title} variants={cardVariants}>
                <Magnetic className="block">
                  <TiltCard className="skill-card glass group rounded-xl p-6 hover:shadow-glow transition-all duration-300 relative overflow-hidden">
                    {/* Decorative drifting grid background */}
                    <span aria-hidden className="card-grid" />
                    {/* Ambient soft dots */}
                    <span aria-hidden className="ambient-dot top-3 right-4" />
                    <span aria-hidden className="ambient-dot bottom-4 left-5" />
                    {/* Aurora beams */}
                    <span aria-hidden className="aurora aurora-a" />
                    <span aria-hidden className="aurora aurora-b" />
                    {/* Floating blurry orbs */}
                    <span aria-hidden className="orb orb-1" />
                    <span aria-hidden className="orb orb-2" />
                    {/* Shine sweep */}
                    <span aria-hidden className="shine-rect" />

                    {/* Category count badge */}
                    <div className="skill-count absolute top-3 right-3 z-[2] select-none">
                      {category.skills.length} skills
                    </div>

                    <div className="flex items-center mb-5 relative z-[2]">
                      <div className="p-3 rounded-lg bg-gradient-primary mr-4 shadow-primary/40 shadow-inner">
                        <motion.span
                          whileHover={{ rotate: 8, scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 220, damping: 16 }}
                          className="inline-block"
                        >
                          <Icon className="w-6 h-6 text-white drop-shadow" />
                        </motion.span>
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight">
                        {category.title}
                      </h3>
                    </div>

                    {/* Large faint watermark icon */}
                    <div className="card-watermark" aria-hidden>
                      <Icon className="w-full h-full" />
                    </div>

                    <div className="flex flex-wrap gap-2 relative z-[2]">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.05 * skillIndex, type: "spring", stiffness: 260, damping: 20 }}
                          whileHover={{ y: -2, scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="skill-chip px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </motion.span>
                      ))}
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

export default Skills;