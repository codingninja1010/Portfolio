import { render, screen } from '@/test/test-utils';
import PageTransition from '@/components/PageTransition';

jest.mock('framer-motion', () => {
  const React = require('react');
  return { motion: { div: React.forwardRef((p, r) => <div {...p} ref={r} />) } };
});

describe('PageTransition', () => {
  it('renders children', () => {
    render(<PageTransition><span>content</span></PageTransition>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
