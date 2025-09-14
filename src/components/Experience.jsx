import { Calendar, MapPin, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "./ui/TiltCard.jsx";
import Magnetic from "./ui/Magnetic.jsx";

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineering Intern",
      company: "Infosys Springboard",
      location: "Remote",
      period: "May'24 - July'24",
      type: "Internship",
      description: "Automating Bank Check Extraction from Scanned PDFs",
      achievements: [
        "Developed a Python-based software for automated check extraction using Tesseract OCR and Microsoft TrOCR",
        "Automated validation and data extraction processes to reduce manual errors and improve system reliability",
        "Deployed and monitored application performance on Azure ensuring availability and scalability",
        "Collaborated in an Agile team to design, develop, test, and deploy software covering all phases of the SDLC"
      ],
      technologies: ["Python", "AI/ML", "Azure", "Tesseract OCR", "Microsoft TrOCR"]
    },
    {
      title: "Open-Source Contributor",
      company: "Code Peak",
      location: "Remote",
      period: "Dec'23 - Jan'24",
      type: "Open Source",
      description: "Leading open-source development and community engagement",
      achievements: [
        "Led the creating and merging of 20 Pull Requests, resolving 15+ issues in open-source projects during the program",
        "Enhanced proficiency in Git version control and GitHub workflows through active Open-Source participation",
        "Ranked 15th out of 300+ contributors, showcasing dedication to open source and outstanding software development"
      ],
      technologies: ["Python", "JavaScript", "ReactJS", "Git", "GitHub"]
    }
  ];

  return (
    <section className="pt-16 pb-8 relative">
      <span aria-hidden className="section-blob blob-exp" />
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 pt-2">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent section-heading">
            Work Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building impactful solutions through hands-on experience and collaborative development
          </p>
        </div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.12 }}
        >
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className="relative mb-10 last:mb-0"
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            >
              {/* Glowing timeline line */}
              {index !== experiences.length - 1 && (
                <div className="timeline-connector absolute left-6 top-20 w-0.5 h-full"></div>
              )}
              
              <div className="flex flex-col md:flex-row gap-6">
                {/* Enhanced timeline dot */}
                <div className="flex-shrink-0">
                  <motion.div 
                    className="timeline-icon w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-primary relative"
                    whileHover={{ scale: 1.1, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <Briefcase className="w-6 h-6 text-white" />
                    {/* Pulsing ring */}
                    <span className="pulse-ring absolute inset-0 rounded-full border-2 border-primary opacity-75" />
                  </motion.div>
                </div>

                {/* Enhanced experience card */}
                <div className="flex-1">
                  <Magnetic className="block w-full">
                    <TiltCard className="experience-card glass glow-border rounded-xl p-6 hover:shadow-glow transition-all duration-500 relative overflow-hidden group w-full max-w-full">
                      {/* Aurora overlays */}
                      <span aria-hidden className="aurora aurora-exp-a" />
                      <span aria-hidden className="aurora aurora-exp-b" />
                      {/* Additional graphics */}
                      <span aria-hidden className="exp-diag-lines" />
                      <span aria-hidden className="exp-particles" />
                      {/* Shine + spotlight */}
                      <span aria-hidden className="shine-rect" />
                      <span aria-hidden className="spotlight-overlay" />
                      {/* Company logo placeholder glow */}
                      <span aria-hidden className="company-glow" />
                      
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 relative z-[2]">
                        <div>
                          <h3 className="text-xl font-bold text-primary mb-1">{exp.title}</h3>
                          <h4 className="text-lg font-semibold mb-2">{exp.company}</h4>
                          <p className="text-muted-foreground mb-2">{exp.description}</p>
                        </div>
                        <div className="text-right">
                          <motion.div 
                            className="flex items-center text-sm text-muted-foreground mb-1"
                            whileHover={{ scale: 1.05, x: -4 }}
                          >
                            <Calendar className="w-4 h-4 mr-1" />
                            {exp.period}
                          </motion.div>
                          <motion.div 
                            className="flex items-center text-sm text-muted-foreground mb-1"
                            whileHover={{ scale: 1.05, x: -4 }}
                          >
                            <MapPin className="w-4 h-4 mr-1" />
                            {exp.location}
                          </motion.div>
                          <motion.span 
                            className="experience-badge inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/20 text-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {exp.type}
                          </motion.span>
                        </div>
                      </div>

                      <ul className="space-y-2 mb-4 relative z-[2]">
                        {exp.achievements.map((achievement, achIndex) => (
                          <motion.li 
                            key={achIndex} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: achIndex * 0.08 }}
                          >
                            <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 relative z-[2]">
                        {exp.technologies.map((tech, techIndex) => (
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
                    </TiltCard>
                  </Magnetic>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;