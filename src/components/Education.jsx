import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "./ui/TiltCard.jsx";
import Magnetic from "./ui/Magnetic.jsx";

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Vignan's Institute of Information Technology",
      period: "Nov'22 - Apr'26",
      location: "Visakhapatnam, India",
      description: "Focused on Software Engineering, Data Structures, Algorithms, and Modern Web Technologies"
    },
    {
      degree: "Bachelor of Science in Programming and Data Science",
      institution: "Indian Institute of Technology, Madras",
      period: "June'23 - April'27",
      location: "Chennai, India",
      description: "Advanced coursework in Programming Methodologies, Data Science, and Machine Learning"
    },
    {
      degree: "AI Programming with Python Nanodegree",
      institution: "Udacity (Sponsored by AWS)",
      period: "Jun'24 - Oct'24",
      location: "Online",
      description: "Python, NumPy, Pandas, Neural Networks, and Deep Learning foundations"
    }
  ];

  return (
    <section className="pt-16 pb-8 relative">
      <span aria-hidden className="section-blob blob-edu" />
      <div className="container mx-auto px-6">
  <div className="text-center mb-10 pt-2">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent section-heading">
            Education
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Strong academic foundation in computer science and data science from premier institutions
          </p>
        </div>

        <motion.div 
          className="max-w-4xl mx-auto space-y-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="h-full"
            >
              <Magnetic className="block h-full">
                <TiltCard className="education-card glass rounded-xl p-6 hover:shadow-glow transition-all duration-500 relative overflow-hidden group h-full w-full min-h-[180px]">
                  {/* Decorative aurora beams */}
                  <span aria-hidden className="aurora aurora-edu-a" />
                  <span aria-hidden className="aurora aurora-edu-b" />
                  {/* Chalk grid + sparkles */}
                  <span aria-hidden className="edu-grid" />
                  <span aria-hidden className="edu-sparkles" />
                  {/* Timeline dot */}
                  <span aria-hidden className="timeline-dot" />
                  
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between relative z-[2] h-full">
                    <div className="flex items-start mb-4 lg:mb-0">
                      <div className="icon-ring p-3 bg-gradient-primary rounded-lg mr-4 flex-shrink-0">
                        <motion.span
                          whileHover={{ rotate: 12, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className="inline-block"
                        >
                          <GraduationCap className="w-6 h-6 text-white" />
                        </motion.span>
                        {/* Rotating halo ring around icon */}
                        <span aria-hidden className="ring-spin" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                        <h4 className="text-lg font-semibold text-primary mb-2 edu-underline">{edu.institution}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{edu.description}</p>
                      </div>
                    </div>

                    <div className="lg:text-right lg:ml-6">
                      <motion.div 
                        className="flex items-center text-sm text-muted-foreground mb-2 lg:justify-end"
                        whileHover={{ scale: 1.05, x: -4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        {edu.period}
                      </motion.div>
                      <motion.div 
                        className="flex items-center text-sm text-muted-foreground mb-2 lg:justify-end"
                        whileHover={{ scale: 1.05, x: -4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        {edu.location}
                      </motion.div>
                    </div>
                  </div>
                </TiltCard>
              </Magnetic>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;