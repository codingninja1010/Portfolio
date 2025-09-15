import { render, screen } from '@/test/test-utils';
import Index from '@/pages/Index';

// Mock framer-motion to render children without animations for deterministic tests
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    // motion.div / motion.span / etc -> forwardRef passthrough
    motion: new Proxy({}, {
      get: () => React.forwardRef((props, ref) => props?.children ?? null),
    }),
    // Presence component -> passthrough
    AnimatePresence: ({ children }) => children ?? null,
    // Hooks used in components
    useReducedMotion: () => false,
    useMotionValue: (initial = 0) => {
      let _v = initial;
      return {
        get: () => _v,
        set: (nv) => { _v = nv; },
        onChange: () => () => {},
        // compatibility for some consumers
        on: () => () => {},
      };
    },
    useSpring: (mv) => mv,
    useScroll: () => ({ scrollYProgress: { get: () => 0, onChange: () => () => {}, on: () => () => {} } }),
    useTransform: () => 0,
  };
});

// Mock lazy components to avoid dynamic imports in test
jest.mock('@/components/Projects', () => () => <div>Projects Section</div>);
jest.mock('@/components/Achievements', () => () => <div>Achievements Section</div>);

describe('Index page', () => {
  it('renders core sections and footer tagline', () => {
    render(<Index />);
    // Header and key sections should render
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText(/Loading projects|Projects Section/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading achievements|Achievements Section/i)).toBeInTheDocument();
    expect(screen.getByText(/Inventing Tomorrow, One Line of Code at a Time/i)).toBeInTheDocument();
  });
});
