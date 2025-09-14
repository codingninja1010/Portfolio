import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const observerRef = useRef(null);

  // Highlight the active section in the navbar based on scroll position
  useEffect(() => {
    const ids = [
      "home",
      "about",
      "skills",
      "experience",
      "volunteering",
      "projects",
      "contact",
    ];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (observerRef.current) observerRef.current.disconnect();
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { root: null, rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    elements.forEach((el) => observer.observe(el));
    observerRef.current = observer;
    return () => observer.disconnect();
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
      className={`fixed top-0 w-full z-50 transition-colors duration-300`}
      style={{ paddingTop: "4px" }}
    >
      {/* Glassy transparent bar with subtle radial highlights */}
      <div className={`absolute inset-0 -z-10 ${
        isScrolled ? "bg-black/40" : "bg-black/30"
      } backdrop-blur-xl border-b border-white/10`}>
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(280px 120px at 10% 50%, rgba(255,255,255,0.08), transparent 60%)," +
              "radial-gradient(280px 120px at 50% 50%, rgba(255,255,255,0.08), transparent 60%)," +
              "radial-gradient(280px 120px at 90% 50%, rgba(255,255,255,0.08), transparent 60%)",
          }}
        />
      </div>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo (text only) */}
          <div className="text-base md:text-xl font-semibold text-white/90 tracking-wide uppercase mr-8">
            Rakesh Vajrapu
            <div className="h-[2px] w-full bg-white/80 mt-1" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-xs md:text-sm font-semibold tracking-wide uppercase transition-colors duration-300 relative group ${
                  activeId === item.href.slice(1)
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                    activeId === item.href.slice(1)
                      ? "w-full bg-white"
                      : "w-full bg-white/60 group-hover:bg-white"
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button variant="outline" size="sm" className="border-white/30 text-white/90 hover:bg-white/10">
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
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
                  <Button variant="outline" size="sm" className="w-full border-primary/20 hover:bg-primary/10">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
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