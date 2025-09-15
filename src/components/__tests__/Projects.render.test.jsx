import { render, screen } from '@/test/test-utils';
import Projects from '@/components/Projects';

// Inert framer-motion mock for deterministic rendering
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: new Proxy({}, {
      get: () => React.forwardRef((props, ref) => props?.children ?? null),
    }),
    AnimatePresence: ({ children }) => children ?? null,
    useReducedMotion: () => false,
    useMotionValue: (initial = 0) => {
      let _v = initial;
      return { get: () => _v, set: (nv) => { _v = nv; }, onChange: () => () => {}, on: () => () => {} };
    },
    useSpring: (mv) => mv,
    useScroll: () => ({ scrollYProgress: { get: () => 0, onChange: () => () => {}, on: () => () => {} } }),
    useTransform: () => 0,
  };
});

describe('Projects section', () => {
  it('renders heading, projects, tech chips, and action links', () => {
    render(<Projects />);

    // Section heading
    expect(screen.getByRole('heading', { name: /Featured Projects/i })).toBeInTheDocument();

    // Project titles
    expect(screen.getByText(/ShopSmart - React E-Commerce Platform/i)).toBeInTheDocument();
    expect(screen.getByText(/Gesture Based Volume Controller/i)).toBeInTheDocument();

    // Key Features label present
    expect(screen.getAllByText(/Key Features:/i)[0]).toBeInTheDocument();

    // Representative technology chips from both projects
    expect(screen.getByText(/React JS/i)).toBeInTheDocument();
    expect(screen.getByText(/Python/i)).toBeInTheDocument();

    // Action links should be present for each project
    const viewCodeLinks = screen.getAllByRole('link', { name: /View Code/i });
    const liveDemoLinks = screen.getAllByRole('link', { name: /Live Demo/i });
    expect(viewCodeLinks.length).toBeGreaterThanOrEqual(2);
    expect(liveDemoLinks.length).toBeGreaterThanOrEqual(2);
  });
});
