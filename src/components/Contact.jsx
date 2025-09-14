import { Mail, Linkedin, Github, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Contact = () => {
  // Submit handler to open the user's email client with a prefilled message
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    const subject = encodeURIComponent(`Portfolio contact from ${name || 'Visitor'}`);
    const bodyLines = [
      name ? `Name: ${name}` : null,
      email ? `Email: ${email}` : null,
      '',
      message || ''
    ].filter(Boolean);
    const body = encodeURIComponent(bodyLines.join('\n'));
    const mailto = `mailto:rakeshrb1411@gmail.com?subject=${subject}&body=${body}`;

    // Open default mail client
    window.location.href = mailto;
  };
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "rakeshrb1411@gmail.com",
      href: "mailto:rakeshrb1411@gmail.com"
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
  <div className="text-center mb-16 pt-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent section-heading">
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
              <motion.div
                className="glass rounded-xl p-8 hover:shadow-glow"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.995 }}
              >
                <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm always interested in hearing about new opportunities, innovative projects, 
                  and ways to create meaningful impact through technology. Let's build something amazing together!
                </p>

                <div className="space-y-4">
                  {contactInfo.map((contact) => {
                    const Icon = contact.icon;
                    return (
                      <motion.a 
                        key={contact.label}
                        href={contact.href}
                        className="flex items-center p-4 bg-muted/10 rounded-lg transition-all duration-300 group/icon
                                   hover:bg-primary/10 hover:shadow-glow"
                        whileHover={{ x: 4, scale: 1.02 }}
                        whileTap={{ scale: 0.995 }}
                      >
                        <div className="p-2 bg-gradient-primary rounded-lg mr-4 group-hover/icon:animate-glow">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">{contact.label}</div>
                          <div className="font-medium">{contact.value}</div>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Quick Contact Form */}
            <motion.div
              className="glass rounded-xl p-8 hover:shadow-glow"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.997 }}
            >
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-muted/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-muted/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-muted/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or opportunity..."
                    required
                  ></textarea>
                </div>
                <Button type="submit" className="w-full bg-gradient-primary hover:shadow-primary transition-all duration-300 hover:scale-105">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </motion.div>
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
              <Button asChild size="lg" className="bg-gradient-primary hover:shadow-primary transition-all duration-300 hover:scale-105">
                <a href="https://www.linkedin.com/in/rakeshvajrapu/" target="_blank" rel="noopener noreferrer" aria-label="Start a conversation on LinkedIn">
                  <Mail className="w-4 h-4 mr-2" />
                  Start a Conversation
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/20 hover:bg-primary/10 transition-all duration-300">
                <a href="https://github.com/rakesh-vajrapu" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View My Work
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;