import { FaArrowDown } from "react-icons/fa";

const ScrollDown = () => {
  const onClick = () => {
    const target = document.getElementById("about");
    if (target && target.scrollIntoView) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    // Fallback: scroll by one viewport height if #about is missing
    const pad = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--app-scroll-padding")) || 80;
    window.scrollTo({ top: window.innerHeight - pad, behavior: "smooth" });
  };

  return (
    <div className="fixed left-5 bottom-6 z-[60]">
      <button
        onClick={onClick}
        aria-label="Scroll down to About"
        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[hsl(var(--background)/0.6)] border border-white/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_40px_rgba(59,130,246,0.35)] transition-all group hover:-translate-y-0.5 hover:scale-[1.03]"
      >
        {/* Gradient ring */}
        <span className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-cyan-400 via-violet-500 to-indigo-500">
          <span className="block w-full h-full rounded-full bg-[hsl(var(--background))]" />
        </span>
        {/* Icon */}
        <FaArrowDown className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 text-primary transition-transform duration-200 group-hover:translate-y-0.5 mx-auto" />
      </button>
    </div>
  );
};

export default ScrollDown;
