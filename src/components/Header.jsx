import { useState, useEffect } from "react";
import { RESUME_URL } from "@/config/site";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedDownloadButton from "@/components/ui/AnimatedDownloadButton";
import { useActiveSection } from "@/hooks/use-active-section";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // (Active section observer intentionally omitted for simple behavior)
  const [isDownloading, setIsDownloading] = useState(false);

  // Listen for global download events emitted by AnimatedDownloadButton
  useEffect(() => {
    const onStart = () => setIsDownloading(true);
    const onEnd = () => setIsDownloading(false);
    window.addEventListener("resume-download:start", onStart);
    window.addEventListener("resume-download:end", onEnd);
    return () => {
      window.removeEventListener("resume-download:start", onStart);
      window.removeEventListener("resume-download:end", onEnd);
    };
  }, []);

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
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" }
  ];

  const activeId = useActiveSection([
    "home",
    "about",
    "skills",
    "experience",
    "volunteering",
    "projects",
    "achievements",
    "contact",
  ]);

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

  // Resume button content handled by AnimatedDownloadButton

  return (
    <header 
      className={`fixed top-0 w-full z-[1000] transition-all duration-300 ${
        isScrolled ? "glass backdrop-blur-lg border-b border-border/50" : "bg-transparent"
      }`}
      style={{paddingTop: '4px'}}
    >
      {/* Global top progress bar while downloading local resume */}
      {isDownloading && (
        <div className="absolute left-0 right-0 top-0 h-[2px] overflow-hidden" data-testid="resume-download-progress">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0.15, 0.7, 1] }}
            transition={{ duration: 0.9, ease: "easeInOut", repeat: Infinity }}
            style={{ transformOrigin: '0% 50%' }}
          />
        </div>
      )}
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
                className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 ${
                  activeId === item.href.replace("#", "")
                    ? "text-primary border-primary/30 bg-primary/5"
                    : "text-foreground/80 border-transparent hover:text-primary hover:border-primary/30 hover:bg-primary/5"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Section mini-map removed per request */}

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {RESUME_URL && (
              <motion.div className="inline-block" whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <AnimatedDownloadButton
                  href={RESUME_URL}
                  filename="Rakesh_Bhagavan_Vajrapu_Resume.pdf"
                  size="md"
                  className="relative overflow-hidden border-primary/25 hover:bg-primary/10 btn-border-animate btn-shine"
                >
                  Resume
                </AnimatedDownloadButton>
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
                    className={`block w-full text-left px-6 py-4 text-base font-medium transition-colors ${
                      activeId === item.href.replace("#", "")
                        ? "text-primary bg-primary/10"
                        : "text-foreground/90 hover:text-primary hover:bg-primary/10"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                <div className="px-6 py-4">
                  {RESUME_URL && (
                    <motion.div whileHover={{ y: -1, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <AnimatedDownloadButton
                        href={RESUME_URL}
                        filename="Rakesh_Bhagavan_Vajrapu_Resume.pdf"
                        size="md"
                        className="w-full relative overflow-hidden border-primary/25 hover:bg-primary/10 btn-border-animate btn-shine"
                      >
                        Download Resume
                      </AnimatedDownloadButton>
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