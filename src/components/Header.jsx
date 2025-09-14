import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { RESUME_URL } from "@/config/site";
import { Menu, X, Download } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // (Removed active section observer to restore previous simple behavior)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keep a CSS variable updated with the header height so CSS scroll-padding/scroll-margin can use it
  useEffect(() => {
    const updateScrollPaddingVar = () => {
      const headerEl = document.querySelector('header');
      const headerHeight = headerEl ? headerEl.offsetHeight : 72;
      const offset = headerHeight + 32; // generous breathing room
      document.documentElement.style.setProperty('--app-scroll-padding', `${offset}px`);
    };
    updateScrollPaddingVar();
    window.addEventListener('resize', updateScrollPaddingVar);
    window.addEventListener('scroll', updateScrollPaddingVar, { passive: true });
    return () => {
      window.removeEventListener('resize', updateScrollPaddingVar);
      window.removeEventListener('scroll', updateScrollPaddingVar);
    };
  }, []);

  // When the page loads with a hash or when the hash changes, adjust scroll to account for header height
  useEffect(() => {
    const adjustForHash = () => {
      if (window.location.hash) {
        const id = window.location.hash;
        // Reuse our offset scrolling
        const el = document.querySelector(id);
          if (el) {
            const headerEl = document.querySelector('header');
            const headerHeight = headerEl ? headerEl.offsetHeight : 72;
            const offset = headerHeight + 20; // extra breathing room
          const y = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: y });
        }
      }
    };
    // run after first paint
    setTimeout(adjustForHash, 0);
    window.addEventListener('hashchange', adjustForHash);
    return () => window.removeEventListener('hashchange', adjustForHash);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Volunteering", href: "#volunteering" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      // Offset scroll for fixed header so headings aren't hidden
      const headerEl = document.querySelector('header');
      const headerHeight = headerEl ? headerEl.offsetHeight : 72; // fallback
          const offset = headerHeight + 20; // extra breathing room
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-[1000] transition-all duration-300 ${
        isScrolled ? "glass backdrop-blur-lg border-b border-border/50" : "bg-transparent"
      }`}
      style={{paddingTop: '4px'}}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo (text only) */}
          <div className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent mr-8">
            Rakesh Vajrapu
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground rounded-lg border border-transparent hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            {RESUME_URL ? (
              <motion.div className="inline-block" whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button asChild variant="outline" size="sm" className="relative overflow-hidden border-primary/25 hover:bg-primary/10">
                  <motion.a
                    href={RESUME_URL}
                    target={RESUME_URL.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label="Download Resume"
                    className="group"
                    whileHover={{}}
                  >
                    <Download className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-[-12deg]" />
                    Resume
                  </motion.a>
                </Button>
              </motion.div>
            ) : (
              <motion.div className="inline-block" whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="relative overflow-hidden border-primary/25 hover:bg-primary/10"
                  onClick={() => toast("Resume unavailable", { description: "Set RESUME_URL in src/config/site.js" })}
                >
                  <Download className="w-4 h-4 mr-2 transition-transform duration-300" />
                  Resume
                </Button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-muted/20 rounded-lg transition-colors duration-300"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu - full screen overlay for clarity */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 z-40 animate-fadeInUp">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
            {/* Sheet */}
            <div id="mobile-menu" className="relative z-10 bg-[hsl(var(--background))] border-t border-border/50 shadow-xl h-[calc(100vh-4rem)] overflow-y-auto">
              <nav className="py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-6 py-4 text-base font-medium text-foreground/90 hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="px-6 py-4">
                  {RESUME_URL ? (
                    <motion.div whileHover={{ y: -1, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button asChild variant="outline" size="sm" className="w-full relative overflow-hidden border-primary/25 hover:bg-primary/10">
                        <motion.a href={RESUME_URL} target={RESUME_URL.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" aria-label="Download Resume" className="group">
                          <Download className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-[-12deg]" />
                          Download Resume
                        </motion.a>
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div whileHover={{ y: -1, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full relative overflow-hidden border-primary/25 hover:bg-primary/10"
                        onClick={() => toast("Resume unavailable", { description: "Set RESUME_URL in src/config/site.js" })}
                      >
                        <Download className="w-4 h-4 mr-2 transition-transform duration-300" />
                        Download Resume
                      </Button>
                    </motion.div>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;