import { Award, Trophy, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "./ui/TiltCard.jsx";
import Magnetic from "./ui/Magnetic.jsx";
import pythonLogo from "@/assets/python-logo.png";
// Import as URL with a version query to bust browser cache
import azureLogo from "@/assets/azure-logo.png";
import metaLogo from "@/assets/meta-logo.png";
import udacityLogo from "@/assets/udacity-logo.png";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import AnimatedNumber from "@/components/ui/AnimatedNumber.jsx";

const Achievements = ({ items, certs }) => {
  const achievements = items || [
    {
      title: "AWS AI/ML Scholarship",
      description: "Awarded the prestigious AWS AI/ML Scholarship sponsored by AWS from a competitive pool of over 50,000+ applicants",
      icon: Award,
      highlight: "50,000+ Applicants",
      category: "Scholarship",
      link: "https://drive.google.com/file/d/1mSjMikdPMRcrMcFCgaHMZp8vAkqSlsgw/view?usp=sharing"
    },
    {
      title: "2nd Place - Worthy Hack Hackathon",
      description: "Led a team of 4 to achieve 2nd place in the Worthy Hack Hackathon, competing against 170+ teams",
      icon: Trophy,
      highlight: "170+ Teams",
      category: "Competition",
      link: "https://drive.google.com/file/d/1XTI_DkEu0twcidwsoLWyglfnaLvILwYo/view?usp=sharing"
    },
    {
      title: "Top 15th Contributor",
      description: "Secured the 15th position out of 300+ contributors in a prominent open-source project, showcasing unwavering dedication and passion for collaborative development",
      icon: Star,
      highlight: "300+ Contributors",
      category: "Open Source",
      link: "https://drive.google.com/file/d/1wJyy3Snd7iITz8sO-Ww3hVryPxi4kJhS/view?usp=sharing"
    }
  ];

  const certifications = certs || [
    {
      title: "Python Certification by Infosys Springboard",
      logo: pythonLogo,
      link: "https://drive.google.com/file/d/1Dx1uCPlyv7S8L3InKHp-H1ut5MuddUWI/view?usp=sharing"
    },
    {
      title: "Microsoft Azure AI Certification",
      logo: azureLogo,
      link: "https://drive.google.com/file/d/1devW-Oj_GC2I1cA0zgLsGXSCHIXZ_Pkn/view?usp=sharing"
    },
    {
      title: "Meta Full-Stack Developer Professional Certification",
      logo: metaLogo,
      link: "https://drive.google.com/file/d/1rQTleqrpYAfZFEZQhII0D2xpABe0mzZK/view?usp=sharing"
    },
    {
      title: "Udacity AI Programming with Python",
      logo: udacityLogo,
      link: "https://drive.google.com/file/d/1mSjMikdPMRcrMcFCgaHMZp8vAkqSlsgw/view?usp=sharing"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
  <div className="text-center mb-16 pt-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent section-heading">
            Achievements & Recognition
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognition for excellence in technology, innovation, and collaborative development
          </p>
        </div>

        {/* Major Achievements */}
        {(() => {
          const { ref, motionProps } = useScrollReveal({ amount: 0.3, duration: 0.6, y: 20 });
          return (
            <motion.div 
              ref={ref}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
              {...motionProps}
              transition={{ staggerChildren: 0.1 }}
            >
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            const achievementCard = (
              <Magnetic className="block h-full">
                <TiltCard className="achievement-card glass rounded-xl p-6 text-center hover:shadow-glow transition-all duration-500 group h-full relative overflow-hidden">
                  {/* Aurora beams */}
                  <span aria-hidden className="aurora aurora-ach-a" />
                  <span aria-hidden className="aurora aurora-ach-b" />
                  {/* Medal shine effect */}
                  <span aria-hidden className="medal-shine" />
                  
                  <div className="mb-6 relative z-[2]">
                    <div className="trophy-container w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-glow relative">
                      <motion.span
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="inline-block"
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.span>
                      {/* Rotating halo ring */}
                      <span aria-hidden className="ring-spin" />
                    </div>
                    <motion.span 
                      className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      {achievement.category}
                    </motion.span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 relative z-[2]">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed relative z-[2]">
                    {achievement.description}
                  </p>
                  
                  <div className="text-2xl font-bold bg-gradient-secondary bg-clip-text text-transparent relative z-[2]">
                    {(() => {
                      // Extract first number in highlight if present, else show as text
                      const match = String(achievement.highlight).match(/([0-9][0-9,]*)/);
                      if (!match) return achievement.highlight;
                      const numeric = Number(match[1].replaceAll(',', ''));
                      const suffix = String(achievement.highlight).slice(match.index + match[1].length);
                      return (
                        <>
                          <AnimatedNumber value={numeric} />{suffix}
                        </>
                      );
                    })()}
                  </div>
                </TiltCard>
              </Magnetic>
            );

            return (
              <motion.div 
                key={achievement.title}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                {achievement.link ? (
                  <a 
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:no-underline h-full"
                  >
                    {achievementCard}
                  </a>
                ) : (
                  <div className="h-full">
                    {achievementCard}
                  </div>
                )}
              </motion.div>
            );
          })}
            </motion.div>
          );
        })()}

        {/* Certifications Section */}
        {(() => {
          const { ref, motionProps } = useScrollReveal({ amount: 0.2, duration: 0.6, y: 18 });
          return (
            <motion.div 
              ref={ref}
              className="max-w-4xl mx-auto"
              {...motionProps}
              transition={{ delay: 0.2 }}
            >
          <Magnetic className="block">
            <TiltCard className="certification-card glass rounded-xl p-8 relative overflow-hidden">
              {/* Aurora beams */}
              <span aria-hidden className="aurora aurora-cert-a" />
              <span aria-hidden className="aurora aurora-cert-b" />
              
              <motion.div 
                className="flex items-center mb-6 relative z-[2]"
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
              >
                <div className="icon-ring p-3 bg-gradient-secondary rounded-lg mr-4">
                  <motion.span
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="inline-block"
                  >
                    <Users className="w-6 h-6 text-white" />
                  </motion.span>
                  {/* Rotating halo ring */}
                  <span aria-hidden className="ring-spin" />
                </div>
                <h3 className="text-2xl font-bold">Professional Certifications</h3>
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-[2]"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
              >
                {certifications.map((cert) => (
                  <motion.div
                    key={cert.title}
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <Magnetic>
                      <a 
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:no-underline"
                      >
                        <motion.div 
                          className="cert-item flex items-center p-4 bg-muted/10 rounded-lg hover:bg-primary/10 transition-all duration-300"
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.img 
                            src={cert.logo} 
                            alt={`${cert.title} logo`}
                            width="32"
                            height="32"
                            loading="lazy"
                            className="w-8 h-8 object-contain mr-4 flex-shrink-0"
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          />
                          <span className="text-sm font-medium">{cert.title}</span>
                        </motion.div>
                      </a>
                    </Magnetic>
                  </motion.div>
                ))}
              </motion.div>
            </TiltCard>
          </Magnetic>
            </motion.div>
          );
        })()}
      </div>
    </section>
  );
};

export default Achievements;