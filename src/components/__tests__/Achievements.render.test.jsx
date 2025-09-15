import { render, screen } from '@/test/test-utils';
import Achievements from '@/components/Achievements';

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

describe('Achievements section', () => {
  it('renders heading, achievement cards, and certifications list', () => {
    render(<Achievements />);

    // Section heading
    expect(screen.getByRole('heading', { name: /Achievements & Recognition/i })).toBeInTheDocument();

  // Achievement titles and highlights (use heading role to avoid matching descriptions)
  expect(screen.getByRole('heading', { name: /AWS AI\/ML Scholarship/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /2nd Place - Worthy Hack Hackathon/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Top 15th Contributor/i })).toBeInTheDocument();
  expect(screen.getByText('50,000+ Applicants')).toBeInTheDocument();
  expect(screen.getByText('170+ Teams')).toBeInTheDocument();
  expect(screen.getByText('300+ Contributors')).toBeInTheDocument();

    // Certifications block title
    expect(screen.getByRole('heading', { name: /Professional Certifications/i })).toBeInTheDocument();

    // Sample certification titles
    expect(screen.getByText(/Python Certification by Infosys Springboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Microsoft Azure AI Certification/i)).toBeInTheDocument();
  });
});
