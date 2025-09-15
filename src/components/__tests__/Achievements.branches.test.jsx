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

describe('Achievements link vs non-link branches', () => {
  it('renders anchor when link is present, and div wrapper when link is absent', () => {
    const items = [
      { title: 'Linked Achievement', description: 'desc', icon: () => null, highlight: 'H1', category: 'Cat', link: 'https://example.com' },
      { title: 'No Link Achievement', description: 'desc', icon: () => null, highlight: 'H2', category: 'Cat' },
    ];

    render(<Achievements items={items} certs={[]} />);

    // Linked card should be wrapped in an anchor with href
    const linked = screen.getByRole('heading', { name: /Linked Achievement/i }).closest('a');
    expect(linked).toBeTruthy();
    expect(linked).toHaveAttribute('href', 'https://example.com');

    // Non-linked card should not be within an anchor; closest link should be null
    const unlinkedHeading = screen.getByRole('heading', { name: /No Link Achievement/i });
    const unlinkedAnchor = unlinkedHeading.closest('a');
    expect(unlinkedAnchor).toBeNull();
  });
});
