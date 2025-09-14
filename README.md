# Rakesh Vajrapu – Portfolio

Modern, fast, and accessible personal portfolio built with React, Vite, and Tailwind CSS.

Live Site: [your-portfolio.example.com](https://your-portfolio.example.com)

Website: [your-website.example.com](https://your-website.example.com)

Contact: [your.email@example.com](mailto:your.email@example.com)

## Overview

This is the source code for my portfolio website. It showcases my skills, experience, projects, achievements, education, and ways to get in touch. The site is a single-page app with smooth section navigation, subtle animations, and a strong focus on performance and accessibility.

## Features

- Responsive, mobile-first layout with polished UI
- Smooth in-page navigation with scroll offset handling
- Page transition animations and scroll progress bar
- Accessible components (tooltips, toasts, buttons, inputs)
- Error boundary for graceful runtime error handling
- Optimized, cached static assets (Vite build)
- Dark-friendly palette and glassmorphism accents

## Tech Stack

- React 18 + Vite 5
- Tailwind CSS 3 (+ tailwindcss-animate)
- Framer Motion 10/12 for animations
- Radix UI primitives via custom components
- React Router v6 (client-side routing)
- @tanstack/react-query for data fetching primitives
- ESLint 9 for code quality

## Getting Started

Prerequisites:

- Node.js 18+ and npm (this repo uses npm + package-lock.json)

Install and run:

```powershell
# install dependencies
npm ci

# start dev server (auto-open)
npm run dev

# build for production
npm run build

# preview production build locally
npm run preview
```

## Usage

- Edit content in the React components under `src/components` and `src/pages`.
- Update profile links and images in:
  - `src/components/Hero.jsx`
  - `src/components/Projects.jsx`
  - `src/components/Contact.jsx`
  - `src/components/Achievements.jsx`
- Replace placeholder URLs in this README with your actual website and portfolio links.

## Contributing

Contributions, suggestions, and bug reports are welcome. Please:

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes with clear messages
4. Open a Pull Request describing your changes

## License

This project is licensed under the MIT License. See `LICENSE` (add if not present) for details.

## Links

- Portfolio: [your-portfolio.example.com](https://your-portfolio.example.com)
- Website/Blog: [your-website.example.com](https://your-website.example.com)
- LinkedIn: [linkedin.com/in/your-handle](https://www.linkedin.com/in/your-handle)
- GitHub: [github.com/your-handle](https://github.com/your-handle)
