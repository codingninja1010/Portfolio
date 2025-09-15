import { render, screen } from '@/test/test-utils';
import Experience from '@/components/Experience';

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

describe('Experience section', () => {
  it('renders section title and experience items', () => {
    render(<Experience />);
    expect(screen.getByRole('heading', { name: /work experience/i })).toBeInTheDocument();
    // Check a couple of known company or title strings
    expect(screen.getByText(/Infosys Springboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Open-Source Contributor/i)).toBeInTheDocument();
    // Spot-check an achievement bullet
    expect(screen.getByText(/Automated validation and data extraction/i)).toBeInTheDocument();
  });
});
