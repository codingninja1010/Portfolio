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

function DummyIcon() { return null; }

describe('Projects code/demo link branches', () => {
  it('renders links when urls present and disabled buttons when absent', () => {
    const projects = [
      {
        title: 'Has Links',
        description: 'd',
        icon: DummyIcon,
        codeUrl: 'https://code.example',
        demoUrl: 'https://demo.example',
        technologies: ['A'],
        features: ['F'],
        impact: 'I',
        category: 'C',
      },
      {
        title: 'No Links',
        description: 'd',
        icon: DummyIcon,
        // no codeUrl, demoUrl
        technologies: ['B'],
        features: ['F2'],
        impact: 'I2',
        category: 'C2',
      },
    ];

    render(<Projects items={projects} />);

    // Assertions for first project (links present)
    expect(screen.getByRole('link', { name: /View Code/i })).toHaveAttribute('href', 'https://code.example');
    expect(screen.getByRole('link', { name: /Live Demo/i })).toHaveAttribute('href', 'https://demo.example');

    // Assertions for second project (disabled buttons exist and are not links)
  const disabledButtons = screen.getAllByRole('button', { name: /View Code|Live Demo/i });
    // At least one disabled button should be present
    expect(disabledButtons.some((btn) => btn.hasAttribute('disabled'))).toBe(true);
  });
});
