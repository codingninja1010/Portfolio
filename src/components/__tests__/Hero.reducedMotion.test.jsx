import { render } from '@/test/test-utils';
import Hero from '@/components/Hero';

// Mock framer-motion hooks to force prefersReducedMotion=true
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    useReducedMotion: () => true,
    useScroll: () => ({ scrollYProgress: { on: () => {}, get: () => 0 } }),
    useTransform: () => 0,
  };
});

describe('Hero reduced motion', () => {
  it('renders without motion animations when reduced motion is preferred', () => {
    // Smoke render to cover reduced-motion code paths
    render(<Hero />);
  });
});
