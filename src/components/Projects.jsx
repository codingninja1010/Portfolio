import { ExternalLink, Github, Heart, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      title: "ShopSmart - React E-Commerce Platform",
      description: "Built a responsive shopping platform allowing users to explore products, manage carts, and simulate purchases.",
      icon: Heart,
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
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions that combine cutting-edge technology with real-world impact
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div 
                key={project.title}
                className="glass rounded-xl p-8 hover:shadow-glow transition-all duration-500 animate-fadeInUp group hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-gradient-primary rounded-xl mr-4 group-hover:animate-glow">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <span className="text-sm text-primary font-medium">{project.category}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-secondary">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-secondary">Technologies Used:</span>
                    <span className="text-sm font-bold text-accent">{project.impact}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-muted/20 rounded-full text-xs hover:bg-primary/20 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1 border-primary/20 hover:bg-primary/10">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-primary hover:shadow-primary">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;