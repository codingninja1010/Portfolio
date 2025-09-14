# Rakesh Vajrapu – Portfolio

Modern, fast, and accessible personal portfolio built with React, Vite, Tailwind CSS, and Framer Motion.

- Live Site: [your-portfolio.example.com](https://your-portfolio.example.com)
- Website/Blog: [your-website.example.com](https://your-website.example.com)
- Portfolio: [your-portfolio.example.com](https://your-portfolio.example.com)
- Contact: [your.email@example.com](mailto:your.email@example.com)

## Overview

This repository contains the source code for my portfolio website. It showcases my skills, experience, projects, achievements, education, and contact information. The site is a single-page app with smooth section navigation, subtle animations, and a strong focus on performance and accessibility.

## Features

- Responsive, mobile‑first layout with polished UI
- Smooth in‑page navigation with header offset handling
- Page transition animations and a scroll progress indicator
- Accessible components (tooltips, toasts, buttons, inputs)
- Error boundary for graceful runtime error handling
- Optimized, cached static assets via Vite build
- Dark‑friendly palette and tasteful glassmorphism accents

## Tech Stack

- React 18 + Vite 5
- Tailwind CSS 3 + tailwindcss-animate
- Framer Motion 10/12 for animations
- Radix UI primitives via custom components
- React Router v6 (client‑side routing)
- @tanstack/react-query (ready for data fetching/caching)
- ESLint 9 (strict, modern config)

## Installation & Setup

Prerequisites:

- Node.js 18+ and npm

Steps:

```powershell
# Install dependencies (uses package-lock.json)
npm ci

# Start dev server (auto-open)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

Optional installs (if not already installed):

- react-icons – icons used in various components
- framer-motion – animation library (already declared in package.json)

## Usage

Update content in these files/components:

- Hero section: `src/components/Hero.jsx`
- Projects: `src/components/Projects.jsx`
- Achievements & Certifications: `src/components/Achievements.jsx`
- Experience: `src/components/Experience.jsx`
- Education: `src/components/Education.jsx`
- Volunteering: `src/components/Volunteering.jsx`
- Contact: `src/components/Contact.jsx`

Global config:

- `src/config/site.js` – set `RESUME_URL` and other site constants

Styling:

- Global theme and utilities live in `src/index.css` (Tailwind + custom CSS)

## Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes with clear messages
4. Open a Pull Request describing your changes and motivation

## License

This project is licensed under the MIT License. If `LICENSE` is not present, feel free to add one.

## Links

- LinkedIn: [linkedin.com/in/your-handle](https://www.linkedin.com/in/rakeshvajrapu/)
- GitHub: [github.com/your-handle](https://github.com/rakesh-vajrapu)
