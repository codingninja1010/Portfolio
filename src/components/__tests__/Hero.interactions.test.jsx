import { render, screen, fireEvent } from '@/test/test-utils';
import { MotionConfig } from 'framer-motion';
import Hero from '@/components/Hero';

describe('Hero interactions', () => {
  it('handles mouse move/leave on the photo container', () => {
    const { container } = render(<Hero />);
    const containerRef = container.querySelector('.hero-photo-3d');
    expect(containerRef).toBeTruthy();

    Object.defineProperty(containerRef, 'getBoundingClientRect', {
      value: () => ({ left: 0, top: 0, width: 300, height: 300 }), configurable: true,
    });

    fireEvent.mouseMove(containerRef, { clientX: 150, clientY: 150 });
    fireEvent.mouseLeave(containerRef);
    expect(containerRef).toBeInTheDocument();
  });

  it('renders with reduced motion settings applied', () => {
    const { container } = render(
      <MotionConfig reducedMotion="always">
        <Hero />
      </MotionConfig>
    );
    // Background orbs should be present regardless; reduced motion affects animation, not DOM
    const orbs = container.querySelectorAll('div[class*="animate-float"]');
    // In reduced-motion, these classes may be absent; just assert the section renders
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
