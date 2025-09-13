// Using a dedicated ProfileAvatar component (Framer Motion powered)
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { SiLeetcode, SiCodechef } from "react-icons/si";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import rakeshPhoto from "@/assets/rakesh-photo.jpg";
import ProfileAvatar from "@/components/ProfileAvatar.react.jsx";

const Hero = () => {
  // No local state required; ProfileAvatar handles animation/tilt.

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden mt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Big circular profile photo aligned to the right on desktop */}
      <div className="hidden md:block absolute right-6 lg:right-12 top-28 lg:top-32 z-20">
        <ProfileAvatar src={rakeshPhoto} alt="Rakesh Vajrapu" size={256} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center animate-fadeInUp">
          <div className="mb-8">
            {/* Name with image on the right */}
            <div className="flex items-center justify-center gap-4 mb-4 flex-wrap sm:flex-nowrap">
              <h1 className="text-5xl md:text-7xl font-bold text-primary">
                Rakesh Vajrapu
              </h1>
              {/* Smaller avatar on mobile next to the name */}
              <ProfileAvatar
                src={rakeshPhoto}
                alt="Rakesh Vajrapu"
                size={80}
                className="md:hidden"
              />
            </div>
            {/* On mobile, allow wrapping to avoid clipping. Apply typing animation only on sm+ */}
            <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground tracking-wide italic mb-2 whitespace-normal break-words sm:whitespace-nowrap sm:animate-typing">
              Full-Stack Developer & AI Enthusiast
            </div>
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

          <TooltipProvider>
            <div className="flex justify-center space-x-6">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="mailto:rakeshrb1411@gmail.com" className="p-3 glass rounded-lg hover:shadow-glow transition-all duration-300 hover:scale-110">
                    <Mail className="w-6 h-6 text-primary" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Mail</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="https://www.linkedin.com/in/rakeshvajrapu/" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-lg hover:shadow-glow transition-all duration-300 hover:scale-110">
                    <Linkedin className="w-6 h-6 text-primary" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>LinkedIn</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="https://github.com/rakesh-vajrapu" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-lg hover:shadow-glow transition-all duration-300 hover:scale-110">
                    <Github className="w-6 h-6 text-primary" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>GitHub</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="https://leetcode.com/u/rakeshvajrapu/" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-lg hover:shadow-glow transition-all duration-300 hover:scale-110">
                    <SiLeetcode className="w-6 h-6 text-primary" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>LeetCode</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="https://www.codechef.com/users/rakeshvajrapu" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-lg hover:shadow-glow transition-all duration-300 hover:scale-110">
                    <SiCodechef className="w-6 h-6 text-primary" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>CodeChef</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
};

export default Hero;