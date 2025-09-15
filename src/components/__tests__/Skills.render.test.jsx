import { render, screen } from '@/test/test-utils';
import Skills from '@/components/Skills';

// Keep animations inert for deterministic tests
jest.mock('framer-motion', () => {
  const React = require('react');
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: new Proxy({}, {
      get: () => React.forwardRef((props, ref) => props?.children ?? null),
    }),
    useReducedMotion: () => true,
  };
});

describe('Skills section', () => {
  it('renders heading and some skill chips', () => {
    render(<Skills />);
    expect(screen.getByRole('heading', { name: /technical skills/i })).toBeInTheDocument();
    // Spot check a few known skills
    expect(screen.getByText(/Python/i)).toBeInTheDocument();
    expect(screen.getByText(/React JS/i)).toBeInTheDocument();
    expect(screen.getByText(/Azure/i)).toBeInTheDocument();
  });
});
