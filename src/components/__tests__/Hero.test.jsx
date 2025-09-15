import { render, screen } from '@/test/test-utils';
import Hero from '@/components/Hero';

jest.mock('@/components/ui/AnimatedDownloadButton', () => (props) => (
  <button data-testid="animated-download">{props.children}</button>
));

// Mock framer-motion hooks that depend on layout
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    useScroll: () => ({ scrollYProgress: { on: () => {}, get: () => 0 } }),
    useTransform: () => 0,
  };
});

describe('Hero', () => {
  it('renders social links', () => {
    render(<Hero />);
    // Social link buttons use aria-labels
    expect(screen.getByRole('link', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
  });

  it('renders a mobile resume button component when RESUME_URL is defined', () => {
    render(<Hero />);
    expect(screen.getByTestId('animated-download')).toBeInTheDocument();
  });
});
