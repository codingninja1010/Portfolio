import { Code, Database, Cloud, Cpu, Globe, GitBranch } from "lucide-react";

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={category.title}
                className="glass rounded-xl p-6 hover:shadow-glow transition-all duration-500 animate-fadeInUp hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-primary mr-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-muted/30 rounded-full text-sm transition-all duration-300 hover:bg-primary/20 hover:scale-105"
                      style={{ animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;