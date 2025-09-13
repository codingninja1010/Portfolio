import { Award, Trophy, Star, Users } from "lucide-react";
import pythonLogo from "@/assets/python-logo.png";
// Import as URL with a version query to bust browser cache
import azureLogo from "@/assets/azure-logo.png?url&v=2";
import metaLogo from "@/assets/meta-logo.png";
import udacityLogo from "@/assets/udacity-logo.png";

const Achievements = () => {
  const achievements = [
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

  const certifications = [
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Achievements & Recognition
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognition for excellence in technology, innovation, and collaborative development
          </p>
        </div>

        {/* Major Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            const achievementCard = (
              <div 
                className="glass rounded-xl p-6 text-center hover:shadow-glow transition-all duration-500 animate-fadeInUp group hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {achievement.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{achievement.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {achievement.description}
                </p>
                
                <div className="text-2xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
                  {achievement.highlight}
                </div>
              </div>
            );

            return achievement.link ? (
              <a 
                key={achievement.title}
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:no-underline"
              >
                {achievementCard}
              </a>
            ) : (
              <div key={achievement.title}>
                {achievementCard}
              </div>
            );
          })}
        </div>

        {/* Certifications Section */}
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-xl p-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-secondary rounded-lg mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Professional Certifications</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <a 
                  key={cert.title}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:no-underline"
                >
                  <div 
                    className="flex items-center p-4 bg-muted/10 rounded-lg hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${0.5 + (index * 0.1)}s` }}
                  >
                    <img 
                      src={cert.logo} 
                      alt={`${cert.title} logo`}
                      className="w-8 h-8 object-contain mr-4 flex-shrink-0"
                    />
                    <span className="text-sm font-medium">{cert.title}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;