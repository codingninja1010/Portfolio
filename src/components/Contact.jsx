import { Mail, Phone, Linkedin, Github, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "rakeshrb1411@gmail.com",
      href: "mailto:rakeshrb1411@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9110343290",
      href: "tel:+919110343290"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/rakeshvajrapu",
      href: "https://linkedin.com/in/rakeshvajrapu"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/rakesh-vajrapu",
      href: "https://github.com/rakesh-vajrapu"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate on innovative projects or discuss exciting opportunities
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="glass rounded-xl p-8 animate-fadeInUp">
                <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm always interested in hearing about new opportunities, innovative projects, 
                  and ways to create meaningful impact through technology. Let's build something amazing together!
                </p>

                <div className="space-y-4">
                  {contactInfo.map((contact, index) => {
                    const Icon = contact.icon;
                    return (
                      <a 
                        key={contact.label}
                        href={contact.href}
                        className="flex items-center p-4 bg-muted/10 rounded-lg hover:bg-primary/10 transition-all duration-300 hover:scale-105 group"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="p-2 bg-gradient-primary rounded-lg mr-4 group-hover:animate-glow">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">{contact.label}</div>
                          <div className="font-medium">{contact.value}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="glass rounded-xl p-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name"
                    className="w-full px-4 py-3 bg-muted/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    className="w-full px-4 py-3 bg-muted/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-muted/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  ></textarea>
                </div>
                <Button className="w-full bg-gradient-primary hover:shadow-primary transition-all duration-300 hover:scale-105">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 glass rounded-xl p-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-primary mr-2" />
              <span className="text-lg font-medium">Based in India, Available Globally</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Open to remote opportunities, freelance projects, and collaborative ventures worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:shadow-primary transition-all duration-300 hover:scale-105">
                <Mail className="w-4 h-4 mr-2" />
                Start a Conversation
              </Button>
              <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/10 transition-all duration-300">
                <Github className="w-4 h-4 mr-2" />
                View My Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;