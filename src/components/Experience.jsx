import { Calendar, MapPin, Briefcase } from "lucide-react";

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
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Work Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building impactful solutions through hands-on experience and collaborative development
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="relative mb-12 last:mb-0 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Timeline line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-6 top-20 w-0.5 h-full bg-gradient-primary opacity-20"></div>
              )}
              
              <div className="flex flex-col md:flex-row gap-6">
                {/* Timeline dot */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-primary">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Experience card */}
                <div className="flex-1 glass rounded-xl p-6 hover:shadow-glow transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-1">{exp.title}</h3>
                      <h4 className="text-lg font-semibold mb-2">{exp.company}</h4>
                      <p className="text-muted-foreground mb-2">{exp.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.period}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {exp.location}
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-muted/20 rounded-full text-xs hover:bg-primary/20 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;