import { render, screen } from '@/test/test-utils';
import Education from '@/components/Education';

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

describe('Education section', () => {
  it('renders section title and institutions', () => {
    render(<Education />);
    expect(screen.getByRole('heading', { name: /education/i })).toBeInTheDocument();
    expect(screen.getByText(/Vignan's Institute of Information Technology/i)).toBeInTheDocument();
    expect(screen.getByText(/Indian Institute of Technology, Madras/i)).toBeInTheDocument();
    expect(screen.getByText(/Udacity/)).toBeInTheDocument();
  });
});
