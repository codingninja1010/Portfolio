import { render, screen } from '@/test/test-utils';
import ProfileAvatar from '@/components/ProfileAvatar.react';

// Minimal framer-motion mock to avoid animations and hooks side-effects
jest.mock('framer-motion', () => {
  const React = require('react');
  const passthrough = React.forwardRef((props, ref) => {
    const { children, ...rest } = props;
    return <div ref={ref} {...rest}>{children}</div>;
  });
  return {
    motion: { div: passthrough, img: passthrough },
    useReducedMotion: () => true,
    useMotionValue: (v) => ({ get: () => v, set: () => {}, onChange: () => () => {} }),
    useSpring: (mv) => mv,
  };
});

describe('ProfileAvatar', () => {
  it('renders img with alt and role', () => {
    render(<ProfileAvatar src="/avatar.jpg" alt="John Doe" ariaLabel="Profile photo" />);
    // role="img" is applied on the wrapper with aria-label
    expect(screen.getByRole('img', { name: /profile photo/i })).toBeInTheDocument();
  });
});
